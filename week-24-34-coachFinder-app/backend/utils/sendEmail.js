//utils/Sendemail.js
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail({ to, subject, html }) {
  const msg = {
    to,
    from: process.env.FROM_EMAIL,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    return { ok: true };
  } catch (err) {
    console.error("Email error", err);
    return { ok: false, error: err };
  }
}

module.exports = { sendEmail };
