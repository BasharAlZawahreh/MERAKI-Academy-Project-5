const userModel = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "748391034640-4faj5hc4s827b2h6k3c9cni55uq46djh.apps.googleusercontent.com"
);
const createNewUser = async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  password = await bcrypt.hash(password, 10);
  email = email.toLowerCase();
  const query = `INSERT INTO users
    (firstName,lastName,email,password)
    VALUES(?,?,?,?)`;
  data = [firstName, lastName, email, password];

  userModel.query(query, data, (err, result) => {
    if (result) {
      res.status(201).json({
        success: true,
        message: `All users `,
        users: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
  });
};

const updateUserById = async (req, res) => {
  let id = req.params.id;
  let { firstName, lastName, age, city, password } = req.body;
  password = await bcrypt.hash(password, 10);
  const query = `UPDATE users SET firstName=?,lastName=?,age=?,city=?,password=? WHERE user_id=? and role="user"`;
  const data = [firstName, lastName, age, city, password, id];

  userModel.query(query, data, (err, result) => {
    if (result.affectedRows) {
      res.status(202).json({
        success: true,
        message: ` Success Article updated`,
        result: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `The result => ${id} not found`,
      });
    }
  });
};
const loginWithGoogle = async (req, res) => {
  const tokenId = req.body.tokenId;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "748391034640-4faj5hc4s827b2h6k3c9cni55uq46djh.apps.googleusercontent.com",
    })
    .then((response) => {
      const { email_verified, given_name, family_name, email } =
        response.payload;
      if (email_verified) {
        const query = `SELECT * FROM users WHERE users.email=?`;
        data = [email];
        userModel.query(query, data, (err, result) => {
          if (result) {
            try {
              const valid = await bcrypt.compare(
                email + process.env.SECRET,
                result.password
              );
              if (!valid) {
                return res.status(403).json({
                  success: false,
                  message: "Password incorrect",
                });
              }
              const payload = {
                firstName: result.userName,
                userId: result._id,
              };

              const options = {
                expiresIn: "2h",
              };
              const token = jwt.sign(payload, process.env.SECRET, options);
              return res.status(200).json({
                success: true,
                message: "login successfuly",
                token: token,
              });
            } catch (error) {
              console.log("newError");
            }
          } else {
            let password = email + process.env.SECRET;
            password = await bcrypt.hash(password, 10);
            const query = `INSERT INTO users
    (firstName,lastName,email,password)
    VALUES(?,?,?,?)`;
            data = [firstName, lastName, email, password];
            userModel.query(query, data, (err, result) => {
              if (result) {
                res.status(201).json({
                  success: true,
                  message: `All users `,
                  users: result,
                });
              } else {
                res.status(500).json({
                  success: false,
                  message: `Server Error`,
                  err: err,
                });
              }
            });
          }
        });
      }
    });
};
module.exports = { createNewUser, updateUserById };
