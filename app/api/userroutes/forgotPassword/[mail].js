import User from "@/models/userModel";
import connectToDataBase from "@/utils/connectToDataBase";
const nodemailer = require("nodemailer");

export default async function forgotpassword(req, res) {
  try {
    await connectToDataBase();
    const generateRandomString = () => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      const length = 30;

      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }

      return result;
    };
    const token_ = generateRandomString();
    const email = req.query.mail;
    const user_ = await User.find({ email: `${email}` });
    let data = {
      email: `${user_[0].email}`,
      password: `${user_[0].password}`,
      token: `${token_}`,
    };
    await User.findByIdAndUpdate({ _id: `${user_[0]._id}` }, data);
    if (user_) {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: "abhishekrana.unbundl@gmail.com",
          pass: "fdzncweapkupwsvo",
        },
      });
      let mailOptions = {
        from: "abhishekrana.unbundl@gmail.com",
        to: "abhishekrana.unbundl@gmail.com",
        subject: "Security Alert",
        // text: "Hello world?",
        html: `<b>Hey There,</b><br><p>Some one tries to change the password of Discovering Brands</p><p><b><a href='http://localhost:3000/reset-password/${token_}'>Click Here </a></b> to change password</p>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log("mail send" + info.response);
        }
      });
      res.status(201).json({ message: "Mail Sent" });
    }else{
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Fail to Sent Mail" });
  }
}
