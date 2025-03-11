import nodemailer from 'nodemailer';

// Create a transporter instance outside the handler for connection reuse
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // STARTTLS will upgrade the connection
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    requireTLS: true,
    tls: {
      minVersion: 'TLSv1.2',
      ciphers: 'HIGH',
      rejectUnauthorized: true,
    },
    // Set timeouts (in milliseconds) to prevent hanging connections
    connectionTimeout: 10000, // 10 seconds
    socketTimeout: 10000,     // 10 seconds
    greetingTimeout: 5000,    // 5 seconds
    // Uncomment these during debugging (only in development)
    // debug: process.env.NODE_ENV !== 'production',
    // logger: process.env.NODE_ENV !== 'production'
  });

  return transporter;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check for required environment variables
  const requiredEnvVars = ['SMTP_USER', 'SMTP_PASSWORD', 'SMTP_FROM_EMAIL', 'CONTACT_EMAIL'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error('Missing environment variables:', missingVars);
    return res.status(500).json({
      message: 'Server configuration error',
      detail: `Missing required environment variables: ${missingVars.join(', ')}`,
    });
  }

  try {
    // Validate input
    const { name, email, company, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Missing required fields',
        detail: 'Name, email, and message are required',
      });
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format',
        detail: 'Please provide a valid email address',
      });
    }

    // Get the transporter instance
    const transport = getTransporter();

    // Prepare mail options
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `New contact request from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company: ${company || 'Not provided'}

        Message:
        ${message}
      `,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send the email
    const info = await transport.sendMail(mailOptions);

    return res.status(200).json({
      message: 'Message sent successfully!',
      id: info.messageId,
    });
  } catch (error) {
    console.error('Email error:', error);

    // Map common error codes to user-friendly messages
    const errorMap = {
      EAUTH: 'Authentication error with the email server',
      ESOCKET: 'Network error when connecting to the email server',
      ETIMEDOUT: 'Timeout when sending the email',
      ECONNECTION: 'Could not connect to the email server',
    };

    return res.status(500).json({
      message: 'Failed to send message',
      detail: errorMap[error.code] || 'An unexpected error occurred while sending the email',
    });
  }
}
