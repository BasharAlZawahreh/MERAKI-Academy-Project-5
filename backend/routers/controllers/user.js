const userModel = require("../../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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

module.exports = { createNewUser, updateUserById };
