// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const upload = require("../middleware/upload");
const crypto = require("crypto");
const { validateSignup } = require("../utils/validator");
const { sendEmail } = require("../utils/sendEmail");
const { email_html } = require("../utils/htmlTemplate");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

// REGISTER ROUTE
router.post("/register", upload.single("image"), async (req, res) => {
  const db = req.app.locals.db;

  const { error, value } = validateSignup(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }

  //Extract URL from cloudinary
  const imageURL = req.file ? req.file.path : "";

  //Omit 'password' and 'confirmPassword' value
  const { confirmPassword, password, ...values } = value;

  //Attach image URL
  const payload = { ...values, image: imageURL };

  try {
    //Check email's uniqueness
    const existing = await db
      .collection("users")
      .findOne({ email: values.email });
    if (existing)
      return res.status(409).json({ message: "email already exists" });

    //Add newUser to db with hashed password
    const hashed = await bcrypt.hash(password, 12);
    const newUser = await db
      .collection("users")
      .insertOne({ ...payload, password: hashed });

    // return json
    res.status(201).json({
      id: newUser.insertedId.toString(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    });
  } catch (err) {
    console.log("registration error", err);
    res.status(500).json({ error: "Server Error" });
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json();

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(403).json({ message: "Invalid credentials" });

  //Authenticate the password
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(403).json({ message: "Invalid credentials" });
  // console.log("4. User password verification success!");

  //since authenticated, let's give the user a token
  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  /* -------------------- Generate tokens -------------------- */
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN);

  //store refresh token in DB
  await db.collection("refreshTokens").insertOne({
    token: refreshToken,
    userId: user._id,
    createAt: new Date(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
  });

  /* --------------------- Generate CSRF token --------------------- */
  const csrfToken = crypto.randomBytes(32).toString("hex");

  /* ------------------ Set cookies (VERY IMPORTANT) ------------------ */
  // httpOnly refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, //Required in production(HTTPS)
    sameSite: "strict",
    path: "/auth/refresh", //cookie only sent to refresh endpoint
    maxAge: 1000 * 60 * 60 * 24 * 30, //30 days
  });

  //CSRF token cookie (non-httpOnly)
  res.cookie("XSRF-TOKEN", csrfToken, {
    httpOnly: false, //client JS must read it
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  /* ------------------ Prepare final user response ------------------ */
  // renamed "password" bc previous name variable in use already.
  const { password: pwd, confirmPassword: confirmPwd, _id, ...userInfo } = user;
  userInfo.id = _id; //got rid of trailing _id

  /* ------------------ Send response to FE ------------------ */
  res.json({ accessToken, user: userInfo, csrfToken }); //csrf is optional
});

// SECURE REFRESH TOKEN ROUTE
router.post("/refresh", async (req, res) => {
  const db = req.app.locals.db;

  try {
    /* -----------------------------------------------------------
     1. Read refresh token from httpOnly cookie
    ----------------------------------------------------------- */
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    /* -----------------------------------------------------------
     2. CSRF PROTECTION: Check the double-submit CSRF token
    ----------------------------------------------------------- */
    const csrfCookie = req.cookies["XSRF-TOKEN"];
    const csrfHeader = req.headers["x-csrf-token"];

    if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
      return res.status(403).json({ message: "CSRF token mismatch" });
    }

    /* -----------------------------------------------------------
     3. Verify refresh token exists in DB
    ----------------------------------------------------------- */
    const found = await db
      .collection("refreshTokens")
      .findOne({ token: refreshToken });

    if (!found) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    /* -----------------------------------------------------------
     4. Verify refresh token signature
    ----------------------------------------------------------- */
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN,
      async (err, payload) => {
        if (err) {
          console.log("❌ Refresh token verification failed:", err.message);
          return res.status(403).json({ message: "Invalid or expired token" });
        }

        /* -----------------------------------------------------------
       5. Generate new access token
      ----------------------------------------------------------- */
        const newAccessToken = jwt.sign(
          {
            id: payload.id,
            email: payload.email,
            role: payload.role,
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "15m" }
        );

        /* -----------------------------------------------------------
       6. (Optional but recommended) Rotate refresh token
      ----------------------------------------------------------- */
        const newRefreshToken = jwt.sign(
          {
            id: payload.id,
            email: payload.email,
            role: payload.role,
          },
          process.env.REFRESH_TOKEN,
          { expiresIn: "30d" }
        );

        // Delete the old one and store the new one
        await db.collection("refreshTokens").deleteOne({ token: refreshToken });
        await db.collection("refreshTokens").insertOne({
          token: newRefreshToken,
          userId: payload.id,
          createAt: new Date(),
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        });

        /* -----------------------------------------------------------
       7. Send back NEW httpOnly refresh cookie
      ----------------------------------------------------------- */
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/auth/refresh",
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        /* -----------------------------------------------------------
       8. Send CSRF cookie again (CSRF rotates each refresh)
      ----------------------------------------------------------- */
        const newCsrfToken = crypto.randomBytes(32).toString("hex");

        res.cookie("XSRF-TOKEN", newCsrfToken, {
          httpOnly: false,
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        /* -----------------------------------------------------------
       9. Send the new access token
      ----------------------------------------------------------- */
        return res.json({
          accessToken: newAccessToken,
          csrfToken: newCsrfToken,
        });
      }
    );
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

//PASSWORD-RESET-REQUEST ROUTE
router.post("/request-password-reset", async (req, res) => {
  const db = req.app.locals.db;
  const { email } = req.body;

  const user = await db.collection("users").findOne({ email });
  if (!user) return res.status(200).json({ message: "OK" });
  // Always return OK — prevents email enumeration attacks

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(rawToken)
    .digest("hex");

  await db.collection("users").updateOne(
    { email },
    {
      $set: {
        resetToken: hashedToken,
        resetTokenExpires: Date.now() + 15 * 60 * 1000, // 15min
      },
    }
  );

  //for development
  const resetURL = `http://localhost:5173/reset-password?token=${rawToken}`;

  //Integrate email service
  // await sendEmail({
  //   to: email,
  //   subject: "Password Reset",
  //   // html: email_html,
  //   html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
  // });

  await sgMail.send({
    to: "marehamza8@gmail.com", // must be verified
    from: "marehamza8@gmail.com", // must be verified
    subject: "Test email from TouchPoint",
    html: "<h1>Hello world</h1>",
  });

  console.log("DEV Reset URL:", resetURL);

  res.json({ message: "Password reset link sent." });
});

//RESET PASSWORD ROUTE
router.post("/reset-password", async (req, res) => {
  const db = req.app.locals.db;
  const { token, newPassword, confirmNewPassword } = req.body;

  if (!newPassword.trim()) {
    return res.status(400).json({ error: "Password too short" });
  }
  if (newPassword !== confirmNewPassword) {
    return res.status(422).json({ error: "Passwords don't match" });
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await db.collection("users").findOne({
    resetToken: hashedToken,
    resetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token." });
  }

  //If user found and token valid and hasn't expired, save new password
  const hashed = await bcrypt.hash(newPassword, 12);
  await db.collection("users").updateOne(
    { _id: user._id },
    {
      $set: { password: hashed },
      $unset: { resetToken: "", resetTokenExpires: "" },
    }
  );

  return res.status(200).json({ message: "Password reset successful" });
});

//LOGOUT ROUTE
router.post("/logout", async (req, res) => {
  const db = req.app.locals.db;

  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  // 204 even if missing → avoids leaking user existence

  try {
    await db.collection("refreshTokens").deleteOne({ token: refreshToken });

    //clear the cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
