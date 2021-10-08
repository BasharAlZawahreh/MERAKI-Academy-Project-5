const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../../db/db");
require("dotenv").config();

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const queryString = `SELECT * from users  WHERE email="${email}" AND role="SuperAdmin" OR role="Admin"`;
  connection.query(queryString, async(err, data, fields)=> {
   if(!data.length){
    return res.json("The email doesn't exist")
   }
   if(err){
    return res.status(500).json("server Error")
   }
   try {
     const valid = await bcrypt.compare(password, data[0].password);
     console.log(`${password},  ${data[0].password},  ${valid}`)

        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId:  data[0].user_id,
          role:  data[0].role,
        };

        const options = {
          expiresIn: "60m",
        };

        // console.log(payload);
        const token = jwt.sign(payload, process.env.ADMIN_SECRET, options);
        res.status(200).json({
          success: true,
          message: `Email and Password are correct`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    });
};

module.exports = {
  login,
};