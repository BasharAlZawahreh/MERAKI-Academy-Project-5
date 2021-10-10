const connection = require("../../db/db");


const getAllReservations = (req, res) => {
  const query = `SELECT * FROM reservations INNER JOIN cars ON cars.car_id = res_id`;

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


const confirmReservation = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE reservations SET isConfirmed=1 WHERE res_id=${id}`;
  
  connection.query(query, (err, result) => {
    if (result.affectedRows) {
      res.status(202).json({
        success: true,
        message: ` Success reservation confirmed`,
        result: result,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `reservation => ${id} not found`,
      });
    }
  });
};

module.exports = {confirmReservation, getAllReservations};
