const express = require('express');
const path = require('path');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3000;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const TO_EMAIL = process.env.TO_EMAIL || 'vidhi4joshi@gmail.com';

let resend;

if (!RESEND_API_KEY) {
  console.warn('Warning: RESEND_API_KEY is not set. Contact form email delivery will not work until this is configured.');
} else {
  resend = new Resend(RESEND_API_KEY);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Please provide name, email, phone, and message.' });
  }

  if (!resend || !RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured. Please set RESEND_API_KEY.' });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New Staybee contact request from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Message:</strong></p>
             <p>${message.replace(/\n/g, '<br>')}</p>`,
    });
    return res.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Unable to send email at this time.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Staybee server listening on port ${PORT}`);
});
