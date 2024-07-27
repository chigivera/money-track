require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    // Create a transporter using your email service provider's credentials
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "8129459c310d50",
        pass: "d990b04d930045"
      }
    });

    // Define the email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
