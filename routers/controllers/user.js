const userModel = require("./../../db/models/user");
const propertyModel = require("./../../db/models/property");
const appointmentModel = require("./../../db/models/appointment");
const interestListModel = require("./../../db/models/interestList");

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
        from: "perfectviewwebsite@gmail.com",
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
      res.status(210).json("you need to insert a complix password");
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

const ForgetPassword = (req, res) => {
  const { email } = req.body;
  userModel.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(201).send("this user does not exists");
    }
    if (!user.isVerified) {
      return res.status(201).send(" verify your email first ");
    }

    const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_KEY, {
      expiresIn: "60m",
    });

    const transporter = nodemailer.createTransport(
      sendgridTransport({
        auth: {
          api_key: process.env.ApiKey,
        },
      })
    );

    const mailOptions = {
      from: "perfectviewwebsite@gmail.com",
      to: email,
      subject: "password reset Link",
      text:
        "Hello " +
        user.username +
        ",\n\n" +
        "Please reset your password by using the following code  : " +
        ",\n\n" +
        token +
        "\n\nThank You!\n",
    };

    return user.updateOne({ resetLink: token }, (err, result) => {
      if (err) {
        return res.status(400).send("rest password link error");
      } else {
        transporter.sendMail(mailOptions, function (err) {
          if (err) {
            return res.status(500).send({
              msg: "Technical Issue!",
            });
          }
          return res
            .status(200)
            .send("A rest password email has been sent to " + user.email);
        });
      }
    });
  });
};

const resetPassword = (req, res) => {
  const { resetLink, newPassword } = req.body;
  if (
    newPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/)
  ) {
    if (resetLink) {
      jwt.verify(
        resetLink,
        process.env.RESET_PASSWORD_KEY,
        async (err, result) => {
          if (err) {
            return res.status(201).json("token error");
          }
          const savePass = await bcrypt.hash(newPassword, SALT);
          userModel.findOne({ resetLink }, (err, user) => {
            if (err || !user) {
              return res
                .status(201)
                .json("user with this token does not exists");
            }

            return user.updateOne(
              { resetLink: "", password: savePass },
              (err, resultt) => {
                if (err) {
                  return res.status(400).json("error");
                }
                return res
                  .status(200)
                  .json("your password has been updated successfully");
              }
            );
          });
        }
      );
    } else {
      return res.status(201).json("authentication error");
    }
  } else {
    res.status(201).json("you need to insert a complix password");
  }
};

const logIn = (req, res) => {
  const { input, password } = req.body;
  newInput = input.toLowerCase();
  userModel
    .findOne({ $or: [{ email: newInput }, { username: newInput }] })
    .then(async (result) => {
      if (result) {
        if (result.isDeleted) {
          return res.status(203).json("your account has been deleted");
        }
        //unhash password
        const savePass = await bcrypt.compare(password, result.password);
        if (savePass) {
          if (!result.isVerified) {
            return res.status(203).json("Your Email has not been verified");
          }
          const payload = {
            role: result.role,
            id: result._id,
          };
          const token = await jwt.sign(payload, SECRETKEY);
          res.status(200).json({ result, token });
        } else {
          res.status(206).json("invalid email or password");
        }
      } else {
        res.status(206).json("invalid email or password");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteUser = async (req, res) => {
  const { _id } = req.params;
  userModel
    .findById({ _id })
    .then((result) => {
      if (result) {
        if (!result.isDeleted) {
          userModel.updateOne({ _id }, { $set: { isDeleted: true } }, (err) => {
            if (err) return res.status(400).json(err);
          });
          appointmentModel.updateMany(
            { propertyPostedBy: _id },
            { $set: { isCanceled: true } },
            function (err) {
              if (err) return res.status(400).json(err);
            }
          );
          propertyModel.updateMany(
            { postedBy: _id },
            { $set: { isCanceled: true } },
            (err) => {
              if (err) return res.status(400).json(err);
            }
          );
          interestListModel.deleteMany({ by: _id }, (err) => {
            if (err) return res.status(400).json(err);
          });

          return res.status(200).json("done");
        }
        return res.status(400).json("this user already have been deleted");
      } else {
        return res.status(404).json("user not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const allRealestateAgents = async (req, res) => {
  //all Real estate agents will show here even if the agent is not available
  userModel
    .find({ isVerified: true, isDeleted: false, role: "61c05b880cca090670f00825" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
const availableRealestateAgents = (req, res) => {
  const { city } = req.params;
   userModel
    .find({
      isDeleted: false,
      role: "61c05b880cca090670f00825",
      Availability: true,
      city
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const oneUser = async (req, res) => {
  const { _id } = req.params;
  userModel
    .find({ _id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const newRate = async (req, res) => {
  const { RealestateAgentId, sellerId, RealestateAgentRate, sellerRate } =
    req.body;
  // check if the user rate the seller
  if (sellerId) {
    const result = await userModel.findOne({ _id: sellerId });
    if (result) {
      result.sellerRateArr.push(sellerRate);
      await result.save();
    } else {
      return res.status(404).json("user not found");
    }
  }
  // check if the user rate the Realestate Agent
  if (RealestateAgentId) {
    const result = await userModel.findOne({ _id: RealestateAgentId });
    if (result) {
      result.realestateAgentRateArr.push(RealestateAgentRate);
      await result.save();
    } else {
      return res.status(404).json("user not found");
    }
  }
  // if the user dosn't want to rate anyone
  if (!RealestateAgentId && !sellerId) {
    return res.status(200).json("nothing to add");
  }
  res.status(200).json("done");
};

const updateUser = (req, res) => {
  const { _id, newImg, newUsername, newName, city, phonNumber } = req.body;
  if (newImg) {
    userModel
      .findOneAndUpdate({ _id }, { img: newImg }, { new: true })
      .then(async (result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else if (newUsername) {
    const saveUsername = newUsername.toLowerCase();
    userModel
      .findOneAndUpdate({ _id }, { username: saveUsername }, { new: true })
      .then(async (result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else if (newName) {
    const saveName = newName.toLowerCase();
    userModel
      .findOneAndUpdate({ _id }, { name: saveName }, { new: true })
      .then(async (result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else if (city) {
    const saveCity = city.toLowerCase();
    userModel
      .findOneAndUpdate({ _id }, { city: saveCity }, { new: true })
      .then(async (result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else if (phonNumber) {
    userModel
      .findOneAndUpdate({ _id }, { phonNumber }, { new: true })
      .then(async (result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};

//avability toggle
const avabilityToggle = (req, res) => {
  const { by } = req.body;
  userModel.findById(by).then((result) => {
    if (result.Availability) {
      userModel.updateOne({ _id: by }, { Availability: false }, (err) => {
        if (err) return res.status(400).json(err);
      });
      res.status(200).json("turn to not available");
    } else {
      userModel.updateOne({ _id: by }, { Availability: true }, (err) => {
        if (err) return res.status(400).json(err);
      });
      res.status(200).json("turn to available");
    }
  });
};

module.exports = {
  signUp,
  confirmEmail,
  ForgetPassword,
  resetPassword,
  logIn,
  deleteUser,
  allRealestateAgents,
  oneUser,
  newRate,
  updateUser,
  avabilityToggle,
  availableRealestateAgents
};
