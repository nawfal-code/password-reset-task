import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// send mail
const sendEmail = async (to, subject, text) => {

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: process.env.PASS_MAIL,
    pass: process.env.PASS_KEY,
  },
});
 
  try {
    const mailOptions = {
      from: process.env.PASS_MAIL,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    
  }
   catch (error) {
    throw error;
  }
};

export default sendEmail;





