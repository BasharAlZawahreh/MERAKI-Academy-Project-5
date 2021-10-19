const connection = require("../../db/db");

const getAllReservations = (req, res) => {
  const query = `SELECT * FROM reservations INNER JOIN cars ON cars.car_id = res_id
  INNER JOIN users ON users.user_id = users_id`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `not found any reservation`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "all reservations",
      result: result,
    });
  });
};


const toggleConfirmationById = (req, res) => {
  const id = req.params.id;

  const checkQuery = `SELECT isConfirmed FROM reservations WHERE res_id=${id}`;

  let currentState = 0;
  connection.query(checkQuery, async (err, result) => {
    if (err) {
      throw err;
    }

    if (result) {
      currentState = await result[0].isConfirmed;
      let nextState = currentState === 0 ? 1 : 0;
      const query = `UPDATE reservations SET isConfirmed=${nextState} WHERE res_id=${id}`;

      connection.query(query, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: `server error`,
          });
        }
        if (result.affectedRows) {
          return res.status(202).json({
            success: true,
            message: ` Success`,
            result: result,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: `The result => ${id} not found`,
          });
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: `The result => ${id} not found`,
      });
    }
  });
};

module.exports = { getAllReservations,toggleConfirmationById };