const connection = require("../../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "748391034640-4faj5hc4s827b2h6k3c9cni55uq46djh.apps.googleusercontent.com"
);
const login = (req, res) => {
  let password = req.body.password
  let email = req.body.email.toLowerCase()
  const query = "SELECT * FROM users WHERE users.role=? AND users.email=? "
  const data = ["user",email]
  connection.query(query,data,async(err,result)=>{
    console.log("myresult",result);
      if(!result.length){
        return res.status(404).json({
            success: false,
            message: `The email doesn't exist`,
          });
      }else if(err){
       return res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });
      }

      const check = await bcrypt.compare(password, result[0].password)
      if(!check){
        return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
      }
   console.log(result[0].user_id)
      const payload = {
        
        user_id: result[0].user_id,
        userName: result[0].firstName,
        country: result[0].city,
        role: result[0].role,
        mobile: result[0].mobile
      }
      const options = {
        expiresIn: "150000h",
      };
      const token = jwt.sign(payload,process.env.SECRET,options)
      res.status(200).json({
        success: true,
        message: `Email and Password are correct`,
        token: token,
      });
      
  })

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
        connection.query(query, data,async (err, result) => {
          if (result.length) {
            try {
              const valid = await bcrypt.compare(
                email + process.env.SECRET,
                result.password
              );
              console.log(result);
              if (!valid) {
                return res.status(403).json({
                  success: false,
                  message: "Password incorrect",
                  token:result
                });
              }
              const payload = {
                  user_id: result.user_id,
                  userName: result.given_name,
                  role: "user"
              };

              const options = {
                expiresIn: "7d",
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
            data = [response.payload.given_name,response.payload.family_name,response.payload.email, password];
            connection.query(query, data, (err, result) => {
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

module.exports = {
  login,
  loginWithGoogle
};
