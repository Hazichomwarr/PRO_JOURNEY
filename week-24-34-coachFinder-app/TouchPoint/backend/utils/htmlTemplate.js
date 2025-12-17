const email_html = `<!--
  TouchPoint Password Reset Email
  Replace {{reset_url}} with the real reset link.
  Replace {{user_name}} with recipient's name if available.
  Preheader: "Reset the password for your TouchPoint account"
-->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width" />
  <title>Reset your TouchPoint password</title>
  <style>
    /* General resets */
    body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; background-color: #F3F4F6; }
    table { border-collapse: collapse; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; display: block; }
    a { color: inherit; text-decoration: none; }

    /* Container */
    .email-wrap { width: 100%; background-color: #F3F4F6; padding: 24px 16px; }
    .email-body { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(18, 26, 40, 0.06); }

    /* Header */
    .brand { padding: 20px 24px; display:flex; align-items:center; gap:12px; }
    .logo { width: 44px; height: 44px; border-radius:8px; background: #0ea5a3; display:inline-block; text-align:center; color: #fff; font-weight:700; line-height:44px; font-family: Arial, sans-serif; }
    .brand-title { font-family: Arial, sans-serif; font-size:16px; color:#111827; font-weight:700; }

    /* Main content */
    .content { padding: 0 24px 28px 24px; font-family: Arial, sans-serif; color: #111827; }
    .h1 { font-size:20px; margin: 8px 0 12px 0; font-weight:700; }
    .p { font-size:15px; line-height:1.5; margin:0 0 18px 0; color:#374151; }

    /* Button */
    .btn-wrap { text-align:center; margin: 8px 0 18px 0; }
    .cta { display:inline-block; padding:12px 22px; border-radius:8px; background:#0ea5a3; color:#ffffff; font-weight:700; font-size:15px; font-family: Arial, sans-serif; text-decoration:none; }
    .small-note { font-size:13px; color:#6B7280; margin-top:8px; }

    /* Footer */
    .footer { padding: 18px 24px; border-top:1px solid #F3F4F6; font-family: Arial, sans-serif; font-size:13px; color:#6B7280; }
    .muted-link { color:#6B7280; text-decoration:underline; }

    /* Mobile adjustments */
    @media screen and (max-width:420px) {
      .brand { padding: 16px; }
      .content { padding: 0 16px 20px; }
      .email-body { border-radius: 6px; }
    }
  </style>
</head>
<body>
  <!-- Preheader: short preview text shown in inbox previews -->
  <div style="display:none; max-height:0; overflow:hidden; color:#ffffff; line-height:1px; font-size:1px;">
    Reset the password for your TouchPoint account — link expires in 15 minutes.
  </div>

  <table role="presentation" class="email-wrap" width="100%">
    <tr>
      <td align="center">
        <table role="presentation" class="email-body" width="100%">
          <!-- Header -->
          <tr>
            <td class="brand" align="left">
              <div class="logo" aria-hidden="true">TP</div>
              <div>
                <div class="brand-title">TouchPoint</div>
                <div style="font-size:12px; color:#6B7280;">Connect. Help. Grow.</div>
              </div>
            </td>
          </tr>

          <!-- Hero / Content -->
          <tr>
            <td class="content">
              <div class="h1">Reset your password</div>
              <div class="p">
                Hi {{user_name}},<br /><br />
                We received a request to reset the password for your TouchPoint account. Click the button below to set a new password. This link will expire in <strong>15 minutes</strong>.
              </div>

              <div class="btn-wrap" role="presentation">
                <!-- CTA: use full URL in href, include target and rel for safety -->
                <a href="{{reset_url}}" class="cta" target="_blank" rel="noopener noreferrer" aria-label="Reset your TouchPoint password">
                  Reset password
                </a>
              </div>

              <div style="text-align:center;">
                <div class="small-note">
                  If the button doesn't work, copy and paste this link into your browser:
                  <div style="word-break:break-all; color:#111827; margin-top:8px; font-size:13px;">
                    <a href="{{reset_url}}" class="muted-link" target="_blank" rel="noopener noreferrer">{{reset_url}}</a>
                  </div>
                </div>
              </div>

              <div style="margin-top:18px;" class="p">
                If you didn't request a password reset, you can safely ignore this email. No changes were made to your account.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="footer">
              <div>Need help? Email <a href="mailto:support@touchpoint.com" class="muted-link">support@touchpoint.com</a></div>
              <div style="margin-top:8px;">© <span id="year">2025</span> TouchPoint. All rights reserved.</div>
              <div style="margin-top:8px; color:#9CA3AF; font-size:12px;">
                This is a transactional email regarding your TouchPoint account.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

module.exports = { email_html };
