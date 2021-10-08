const connection = require('../../db/db')

const getAllCars = (req, res) => {
    const query = `SELECT * FROM cars`;
  
    connection.query(query, (err, result) => {
      if (!result.length) {
        return res.status(404).json({
          success: false,
          message: `not found any reservation`,
        });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err,
        });
      }
      return res.status(200).json({
        success: true,
        message: "all reservations",
        result: result,
      });
    });
  };

  module.exports = {getAllCars}