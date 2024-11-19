import config from "@/config";
import { Resend } from "resend";

const resend = new Resend(config.env.RESEND_API_KEY);

export default async function sendEmail({
  to,
  subject,
}: {
  to: string;
  subject: string;
}) {
  return await resend.emails.send({
    from: "Startify 3.0 <confirmation@austartify.com>",
    to,
    subject,
    html: "Your application has been submitted successfully. We will get back to you soon.",
  });
}
