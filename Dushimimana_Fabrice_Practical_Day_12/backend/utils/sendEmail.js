import nodemailer from "nodemailer";

const sendEmail = async function (mailOptions) {
  try {
    //? 1. Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    //? 2. create mail options
    //? 3. Send an email to user
    await transporter.sendMail({
      from: `DUSHIMIMANA Fabrice <${process.env.EMAIL_USERNAME}>`,
      to: mailOptions.email,
      subject: mailOptions.subject,
      text: mailOptions.message,
    });
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export default sendEmail;
