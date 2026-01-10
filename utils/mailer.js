import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.PASS_MAIL,
    pass: process.env.PASS_KEY, 
  },
  connectionTimeout: 20000, // 20s
});

// send mail
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.PASS_MAIL,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  }
   catch (error) {
    throw error;
  }
};

export default sendEmail;

