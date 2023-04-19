const nodemailer = require('nodemailer');

const sendEmailToAdmin = (contactData) => {
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PW
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `New contact entry from ${contactData.name}`,
    text: `A new contact entry has been created:\n\nName: ${contactData.fullName}\nEmail: ${contactData.email}\nMessage: ${contactData.message}\nMessage: ${contactData.phone}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = { sendEmailToAdmin };