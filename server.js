const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'no-reply@staybee.com';
const TO_EMAIL = process.env.TO_EMAIL || 'vidhi4joshi@gmail.com';

if (!SENDGRID_API_KEY) {
  console.warn('Warning: SENDGRID_API_KEY is not set. Contact form email delivery will not work until this is configured.');
}

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'Please provide name, email, phone, and message.' });
  }

  if (!SENDGRID_API_KEY) {
    return res.status(500).json({ error: 'Email service is not configured. Please set SENDGRID_API_KEY.' });
  }

  const emailContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;

  const msg = {
    to: TO_EMAIL,
    from: FROM_EMAIL,
    replyTo: email,
    subject: `New Staybee contact request from ${name}`,
    text: emailContent,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone}</p>
           <p><strong>Message:</strong></p>
           <p>${message.replace(/\n/g, '<br>')}</p>`,
  };

  try {
    await sgMail.send(msg);
    return res.json({ success: true });
  } catch (error) {
    console.error('SendGrid error:', error);
    return res.status(500).json({ error: 'Unable to send email at this time.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Staybee server listening on port ${PORT}`);
});
