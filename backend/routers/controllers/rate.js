const connection = require("../../db/db");

//
const addToRate = (req, res) => {
  const user_id = req.token.user_id;
  const car_id = req.params.car_id;
  //const rate_date=(new Date()).toLocaleDateString('YYYY-MM-DD').replace(/\//g,"-")
  // let now = new Date();
  // let rate_date = moment(now). format('YYYY-MM-DD')

  const { comment, rate, rate_date } = req.body;

  const query = `INSERT INTO rates
 (comment, rate, rate_date, car_id, user_id)
 VALUES(?,?,?,?,?)`;
  const data = [comment, rate, rate_date, car_id, user_id];
  console.log(data);
  connection.query(query, data, (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
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

const getRateByCarId = (req, res) => {
  
  const car_id = req.params.car_id;
  const query = `SELECT * FROM rates WHERE rates.car_id=${car_id}`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Not found any rate for this car`,
      });
    } else if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    return res.status(201).json({
      success: true,
      result: result,
    });
  });
};
module.exports = { addToRate, getRateByCarId };
