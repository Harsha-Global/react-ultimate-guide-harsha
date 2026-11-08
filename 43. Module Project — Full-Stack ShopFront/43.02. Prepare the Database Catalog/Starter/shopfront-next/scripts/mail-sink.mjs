import { SMTPServer } from 'smtp-server';
import { simpleParser } from 'mailparser';
import { createServer } from 'node:http';
const messages = [];
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const smtp = new SMTPServer({
  disabledCommands: ['AUTH', 'STARTTLS'], size: 1024 * 1024,
  onRcptTo(address, session, done) {
    done(address.address.endsWith('@example.test') ? undefined : new Error('Only example.test recipients are accepted.'));
  },
  async onData(stream, session, done) {
    try {
      const mail = await simpleParser(stream);
      messages.unshift({ subject: mail.subject ?? '', to: mail.to?.text ?? '', text: mail.text ?? '' });
      messages.splice(50); done();
    } catch { done(new Error('Cannot read the test message.')); }
  },
});
smtp.listen(2525, '127.0.0.1');
const web = createServer((req, res) => {
  if (req.method !== 'GET') { res.writeHead(405).end(); return; }
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('Content-Type','text/html; charset=utf-8');
  const items = messages.map(mail => {
    const url = mail.text.match(/https?:\/\/\S+/)?.[0];
    const safe = url && ['localhost','127.0.0.1'].includes(new URL(url).hostname);
    return `<article><h2>${escape(mail.subject)}</h2><p>${escape(mail.to)}</p><pre>${escape(mail.text.replace(/https?:\/\/\S+/g,'[private action link]'))}</pre>${safe ? `<a href="${escape(url)}">Open local action link</a>` : ''}</article>`;
  }).join('');
  res.end(`<!doctype html><html lang="en"><meta charset="utf-8"><title>ShopFront local mailbox</title><style>body{font:18px system-ui;max-width:900px;margin:50px auto;background:#f8f5f0;color:#202c38}article{background:white;border:1px solid #ddd;padding:20px;margin:20px 0}a{color:#733ca0}pre{white-space:pre-wrap}</style><h1>ShopFront local mailbox</h1><p>Test messages stay on this computer. Refresh to check for new mail.</p>${items || '<p>No messages yet.</p>'}</html>`);
});
web.listen(3041, '127.0.0.1', () => console.log('Local mailbox: http://127.0.0.1:3041; SMTP port 2525.'));
process.on('SIGINT', () => { smtp.close(); web.close(); });
