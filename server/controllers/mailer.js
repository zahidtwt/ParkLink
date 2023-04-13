// npm i nodemailer mailgen
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const ENV = require('../config');

module.exports = registerMail = async (req, res) => {
  let config = {
    service: 'gmail',
    auth: {
      user: ENV.EMAIL,
      pass: ENV.PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'ParkLink',
      link: 'zahid.live',
    },
  });

  const { username, userEmail, subject, otpCode } = req.body;

  const response = {
    body: {
      name: username,
      intro: 'Your OTP code is: ' + otpCode,
      code: otpCode,
      action: {
        instructions:
          'To verify your account, enter the code above on the verification page.',
        button: {
          color: '#22BC66',
          text: 'Verify Account',
          link: `http://localhost.com:3000/verify/${username}?code=${otpCode}`,
          logo: 'https://svgur.com/i/s56.svg',
        },
      },
      outro: 'If you have any questions, feel free to reply to this email.',
    },
  };

  const emailBody = mailGenerator.generate(response);

  const message = {
    from: ENV.EMAIL,
    to: userEmail,
    subject: 'Welcome to ParkLink',
    html: emailBody,
  };

  try {
    await transporter.sendMail(message);
    return res
      .status(200)
      .send({ msg: 'You should receive an email from us.' });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
