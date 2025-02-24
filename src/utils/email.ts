import config from "@/config";
import { Resend } from "resend";

const resend = new Resend(config.env.RESEND_API_KEY);

export default async function sendEmail({
  to,
  subject,
  content,
  header,
}: {
  to: string;
  subject: string;
  content: string;
  header: string;
}) {
  return await resend.emails.send({
    from: "Startify 3.0 <confirmation@austartify.com>",
    to,
    subject,
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
        }
        .header {
            font-size: 24px;
            font-weight: bold;
            color: #0056b3;
            text-align: center;
            margin-bottom: 10px;
        }
        .content {
            font-size: 16px;
            line-height: 1.6;
            padding: 20px;
        }
        .status {
            text-align: center;
            font-size: 18px;
            color: #ff9900;
            font-weight: bold;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">${header}</div>
        <div class="content">
            ${content}
            <br><br>
            Best Regards, <br>
            The AU Startify Team
        </div>
        <div class="footer">
            © 2024 AU Startify. All rights reserved.
        </div>
    </div>
</body>
</html>`,
  });
}
