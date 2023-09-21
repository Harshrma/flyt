const auth = require("../components/auth");
const user = require("../components/user");
// const asyncErrorHandler = require("../errorHandler/asyncErrorHandler");

const register = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let rePassword = req.body.rePassword;
  let mobile = req.body.phone;

  if (
    password === undefined ||
    rePassword === undefined ||
    password.trim() !== rePassword.trim()
  ) {
    return res.send({ success: false, message: "Your Password is not Same" });
  }
  if (
    email === undefined ||
    email.trim() == "" ||
    mobile === undefined ||
    mobile.trim() == ""
  ) {
    return res.send({
      success: false,
      message: "Your check your email or phone",
    });
  }
  let validateEmailResponse = auth.validateEmail(email);
  if (!validateEmailResponse) {
    return res.send({ success: false, message: "invalid email" });
  }

  let userResponse = await user.register(req.body);
  return res.send(userResponse);

  /*   if (!userResponse.success) {
      return res.send({ success: false, message: userResponse.message });
    } else {
     
      let otpResponse = await sendSms.sendSMS(mobile, email);
     
      console.log("inside if otpResponse");
      console.log(otpResponse);
      if (otpResponse.success) {
        return res.send({ success: true, data: "OTP send successfully" });
      } else {
        return res.send({ success: false, message: otpResponse.message });
      }
    } */
};

const login = async (req, res) => {
  // let cocke=req.cookies['token'];  // code for getting cookies from frontend
  console.log("in login");
  let email = req.body.email;
  if (!auth.validateEmail(email)) {
    return res.send({ success: false, message: "invalid email" });
  }
  console.log("in user controller");
  console.log(req.body);
  let userValidateResponse = await user.validateUser(req.body);
  console.log("userValidateResponse");
  console.log(userValidateResponse);

  if (!userValidateResponse.success) {
    return res.send({ success: false, message: userValidateResponse.message });
  } else {
    console.log("userValidateResponse in controller");
    console.log(userValidateResponse);
    let userId = userValidateResponse.data.userId;
    /*     return res.send({
      success: true,
      data:userValidateResponse.data ,
    }); */
    //validate Email with DB Email Address
    if (userValidateResponse.success) {
      let Token = auth.generateAccessToken(email, userId);
      res.cookie("token", Token); //set
      return res.send({
        success: true,
        data: {
          message: userValidateResponse.data.message,
          token: Token,
        },
      });
    } else {
      return res.send({
        success: false,
        message: userValidateResponse.message,
      });
    }
  }
};

module.exports = { register, login };
