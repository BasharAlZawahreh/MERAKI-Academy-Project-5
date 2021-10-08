const connection = require("../../db/db")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = (req, res) => {
  let password = req.body.password
  let email = req.body.email.toLowerCase()
  const query = "SELECT * FROM users WHERE users.role=? AND users.email=? "
  const data = ["user",email]
  connection.query(query,data,async(err,result)=>{
      if(!result.length){
        return res.status(404).json({
            success: false,
            message: `The email doesn't exist`,
          });
      }else if(err){
        res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err,
          });
      }

      const check = bcrypt.compare(password, result[0].password)
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
        country: result[0].country,
        role: result[0].role,
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

module.exports = {
  login,
};
