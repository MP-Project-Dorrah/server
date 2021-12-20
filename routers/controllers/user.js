const userModel = require("./../../db/models/user");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRETKEY = process.env.SECRETKEY;
const bcrypt = require("bcrypt");
const SALT = Number(process.env.SALT);

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signUp = async (req, res) => {
  const {
    email,
    username,
    password,
    name,
    city,
    phonNumber,
    nationalId,
    img,
    realestateAgentCommission,
    role,
  } = req.body;
  const saveEmail = email.toLowerCase();
  const saveUsername = username.toLowerCase();
  const saveCity = city.toLowerCase();
  let newUserGlopal;
  const found = await userModel.findOne({
    $or: [{ email: saveEmail }, { username: saveUsername }],
  });

  if (found) {
    return res.status(204).json("this user already have an account");
  } else {
    if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)) {
      const savePass = await bcrypt.hash(password, SALT);

      if (
        role == "61c05b020cca090670f00821" ||
        role == "61c05b490cca090670f00823"
      ) {
        // seller role id & Buyer
        const newUser = new userModel({
          email: saveEmail,
          password: savePass,
          username: saveUsername,
          city: saveCity,
          name,
          role,
          phonNumber,
          nationalId,
          img,
        });
        newUserGlopal = await newUser.save();
      } else if (role == "61c05b880cca090670f00825") {
        // RealEstateAgent role id
        const newUser = new userModel({
          email: saveEmail,
          password: savePass,
          username: saveUsername,
          city: saveCity,
          name,
          role,
          phonNumber,
          nationalId,
          img,
          realestateAgentCommission,
        });
        newUserGlopal = await newUser.save();
      }
      // console.log(newUserGlopal);
      // send a verification email
      const token = jwt.sign({ _userId: newUserGlopal._id }, SECRETKEY, {
        expiresIn: "24h",
      });
      const transporter = nodemailer.createTransport(
        sendgridTransport({
          auth: {
            api_key: process.env.ApiKey,
          },
        })
      );
      const mailOptions = {
        from: "durh1999@gmail.com",
        to: newUserGlopal.email,
        subject: "Account Verification Link",
        text:
          "Hello " +
          req.body.username +
          ",\n\n" +
          "Please verify your account by clicking the link: \nhttp://" +
          req.headers.host +
          "/user/confirmation/" +
          newUserGlopal.email +
          "/" +
          token +
          "\n\nThank You!\n",
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          return res.status(500).send({
            msg: "Technical Issue!, Please click on resend for verify your Email.",
          });
        }
        return res
          .status(200)
          .send(
            "A verification email has been sent to " +
              newUserGlopal.email +
              ". It will be expire after one day"
          );
      });
    } else {
      res.status(210).json("you need to insert a password ........");
    }
  }
};

const confirmEmail = (req, res) => {
  token = req.params.token;
  jwt.verify(token, SECRETKEY, (err, resul) => {
    if (err) {
      return res
        .status(400)
        .send(
          "Your verification link may have expired. Please click on resend for verify your Email."
        );
    } else {
      userModel.findOne(
        { _id: resul._userId, email: req.params.email },
        function (err, user) {
          // not valid user
          if (!user) {
            return res.status(401).send({
              msg: "We were unable to find a user for this verification. Please SignUp!",
            });
          }
          // user is already verified
          else if (user.isVerified) {
            return res
              .status(200)
              .send("User has been already verified. Please Login");
          }
          // verify user
          else {
            // change isVerified to true
            user.isVerified = true;
            user.save(function (err) {
              // error occur
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // account successfully verified
              else {
                return res
                  .status(200)
                  .send(
                    `Your account has been successfully verified <a href="">Back to log in page</a>`
                  );
              }
            });
          }
        }
      );
    }
  });
};

module.exports = {
  signUp,
  confirmEmail
};
