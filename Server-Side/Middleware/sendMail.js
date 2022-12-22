
var nodemailer = require("nodemailer");
import { get } from "../config";
import "dotenv/config";

var email = get(process.env.NODE_ENV).email;

export const sendmail = async (from, to, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email.user,
      pass: email.pass,
    },
  });
  var mailOptions = {
    from,
    to,
    subject,
    text:text
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
