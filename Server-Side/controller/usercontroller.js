import user from "../model/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { sendmail } from "../Middleware/sendMail";

//usersignup(post)
export const userSignup = async (req, res) => {
  try {
    const userdata = new user({
      fullname: req.body.fullname,
      mobile: req.body.mobile,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      address:req.body.address,
      // image: req.file.filename
    });

    const userNewdata = await userdata.save();
    await sendmail(
      "pratikshaladke56@gmail.com",
      req.body.email,
      "Welcome to shopify",
      "Welcome Here"
    );
    res.send(
      {
        status: true,
        message: "User Signup Successfully",
        result: userNewdata
      }
    )
  } catch (e) {
    throw e
  }
}
//userlogin(post)
export const userlogin = async (req, res) => {
  const { email, password } = req.body;
  const result = await user.findOne({ email });
  if (!result) {
    res.send({
      status: false,
      message: "Email is Incorrect!!!",
    });
  } else {
    const isValid = bcrypt.compareSync(password, result.password);
    if (isValid) {
      let payload = {};
      payload._id = result._id;
      jwt.sign(
        payload,
        "PRATIKSHA",
        {
          expiresIn: "24h",
        },
        (err, token) => {
          res.send({
            Token: token,
            status: true,
            statusCode: 200,
            message: "Successfully Login",
            result: result,
          });
        }
      );
    } else {
      res.send({ status: false, message: "Password is incorrect" });
    }
  }
}


export const forgetpassword = async (req, res) => {
  const { email } = req.body;

  if (email) {
      const user1 = await user.findOne({ email: email })
      if (user1) {

          const secret = user1._id + "secret"
          console.log(user1._id)

          const token = jwt.sign({ userID: user1._id }, secret, { expiresIn: '5m' })
          console.log(token)
          sendmail("pratikshaladke56@gmail.com", req.body.email,
              "subject ", "Forget Passoword",
              `<p>Click <a href="http://localhost:3000/Resetpassword/?userId=${user1._id}&token=${token}&' +  '">here</a> to reset your password</p>`
          )

          res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
      } else {
          res.send({ "status": "failed", "message": "Email doesn't exists" })
      }
  } else {
      res.send({ "status": "failed", "message": "Email Field is Required" })
  }
}

// ------------------------------reset password -----------------------------------------------------
export const userPasswordReset = async (req, res) => {
  const { password, confirm_password } = req.body
  const { id, token } = req.params
  const user1 = await user.findById(id)

  const new_secret = user1._id + "secret"
  try {
      jwt.verify(token, new_secret)
      if (password && confirm_password) {
          if (password !== confirm_password) {
              res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
          } else {

              const newHashPassword = await bcrypt.hashSync(password, 8)
              await user.findByIdAndUpdate(user1._id, { $set: { password: newHashPassword } })
              res.send({ "status": "success", "message": "Password Reset Successfully" })
          }
      } else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
      }
  } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Invalid Token" })
  }
}









