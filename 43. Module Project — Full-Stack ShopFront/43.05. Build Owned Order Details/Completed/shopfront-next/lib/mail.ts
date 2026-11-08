import 'server-only';
import nodemailer from 'nodemailer';
export async function sendAccountMail(to: string, subject: string, url: string) {
  const host = process.env.SMTP_HOST ?? '127.0.0.1';
  const local = ['127.0.0.1', 'localhost'].includes(host);
  if (local && !to.endsWith('@example.test')) throw new Error('Use an example.test recipient for local mail.');
  if (!local && !process.env.SMTP_USER) throw new Error('SMTP credentials are missing.');
  const transport = nodemailer.createTransport({
    host, port: Number(process.env.SMTP_PORT ?? 2525), secure: process.env.SMTP_SECURE === 'true',
    requireTLS: !local,
    auth: local ? undefined : { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 10000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  await transport.sendMail({ from: process.env.MAIL_FROM ?? 'ShopFront <demo@example.test>', to, subject, text: `Open this account link: ${url}` });
}
