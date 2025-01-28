import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check if environment variables are set
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD || 
      !process.env.SMTP_FROM_EMAIL || !process.env.CONTACT_EMAIL) {
    console.error('Missing environment variables:', {
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
      SMTP_FROM_EMAIL: !!process.env.SMTP_FROM_EMAIL,
      CONTACT_EMAIL: !!process.env.CONTACT_EMAIL
    });
    return res.status(500).json({ 
      message: 'Server configuration error',
      detail: 'Missing required environment variables'
    });
  }

  try {
    const { name, email, company, message } = req.body;

    console.log('Attempting to create transport with config:', {
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: '[HIDDEN]'
      }
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      requireTLS: true,
      tls: {
        minVersion: 'TLSv1.2',
        ciphers: 'HIGH',
        rejectUnauthorized: true
      },
      debug: true, // Enable debug logs
      logger: true // Enable built-in logger
    });

    console.log('Testing transporter connection...');
    await transporter.verify();
    console.log('Transporter connection verified successfully');

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      subject: `Ny kontaktforespørsel fra ${name}`,
      text: `
        Navn: ${name}
        E-post: ${email}
        Bedrift: ${company}
        
        Melding:
        ${message}
      `,
      html: `
        <h2>Ny kontaktforespørsel</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Bedrift:</strong> ${company}</p>
        <p><strong>Melding:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    console.log('Attempting to send email with options:', {
      ...mailOptions,
      from: mailOptions.from,
      to: mailOptions.to
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Detailed error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });

    let errorMessage = 'Error sending email';
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed - check credentials';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Network connection error';
    }

    res.status(500).json({ 
      message: errorMessage,
      detail: error.message
    });
  }
}
