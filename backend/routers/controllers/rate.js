const connection = require("../../db/db");
// 
const addToRate = (req, res) => {
const user_id=req.token.user_id
const car_id=req.params.car_id
  const {
    comment,
    rate, 
    rate_date
  } = req.body;

  const query = `INSERT INTO rates
 (comment, rate, rate_date, car_id, user_id)
 VALUES(?,?,?,?,?)`;
  const data = [
    comment, 
    rate, 
    rate_date, 
    car_id, 
    user_id
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (result) {
      res.status(201).json({
        success: true,
        message: `rate added successfuly `,
      });
    }
  });
};

module.exports = {addToRate}