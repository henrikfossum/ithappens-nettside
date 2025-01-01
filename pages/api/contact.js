import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, company, message } = req.body;

    // Create transporter using your SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',  // Correct host for business accounts
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,    // your full business email
        pass: process.env.SMTP_PASSWORD,
      },
      requireTLS: true,
      tls: {
        minVersion: 'TLSv1.2',
        ciphers: 'HIGH',
        rejectUnauthorized: true
      }
    });

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL, // Your receiving email
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
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}