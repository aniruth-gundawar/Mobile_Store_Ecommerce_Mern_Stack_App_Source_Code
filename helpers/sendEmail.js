import nodemailer from "nodemailer";
export const mailer = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORTM,
      service: process.env.SERVICE,

      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.SMPT_MAIL, // sender address
      to: email, // list of receivers
      subject: "Hello ", // Subject line
      text: `otp for  mobile store is ${otp} .please do not share with anyone.`, // plain text body
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
