import nodemailer from 'nodemailer';

// Create a transporter instance outside the handler
// This allows connection reuse across requests
let transporter = null;

// Initialize the transporter
function getTransporter() {
  if (transporter) return transporter;
  
  transporter = nodemailer.createTransport({
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
    // Only enable these during debugging, remove for production
    // debug: process.env.NODE_ENV !== 'production', 
    // logger: process.env.NODE_ENV !== 'production' 
  });
  
  return transporter;
}

export default async function handler(req, res) {
  // Early return for non-POST requests
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
      detail: `Missing required environment variables: ${missingVars.join(', ')}`
    });
  }
  
  try {
    // Input validation
    const { name, email, company, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        detail: 'Name, email, and message are required' 
      });
    }
    
    // Email validation with a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format',
        detail: 'Please provide a valid email address'
      });
    }
    
    // Get the transporter
    const transport = getTransporter();
    
    // Skip verification in production, only do this during development
    // if (process.env.NODE_ENV !== 'production') {
    //   await transport.verify();
    // }
    
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Ny kontaktforespørsel fra ${name}`,
      text: `
        Navn: ${name}
        E-post: ${email}
        Bedrift: ${company || 'Ikke oppgitt'}
        
        Melding:
        ${message}
      `,
      html: `
        <h2>Ny kontaktforespørsel</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Bedrift:</strong> ${company || 'Ikke oppgitt'}</p>
        <p><strong>Melding:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };
    
    const info = await transport.sendMail(mailOptions);
    
    res.status(200).json({ 
      message: 'Melding sendt!',
      id: info.messageId
    });
    
  } catch (error) {
    console.error('Email error:', {
      name: error.name,
      message: error.message,
      code: error.code
    });
    
    // Map common errors to user-friendly messages
    const errorMap = {
      'EAUTH': 'Autentiseringsfeil med e-postserver',
      'ESOCKET': 'Nettverksfeil ved tilkobling til e-postserver',
      'ETIMEDOUT': 'Tidsavbrudd ved sending av e-post',
      'ECONNECTION': 'Kunne ikke koble til e-postserver'
    };
    
    res.status(500).json({
      message: 'Kunne ikke sende melding',
      detail: errorMap[error.code] || 'En uventet feil oppstod ved sending av e-post'
    });
  }
}