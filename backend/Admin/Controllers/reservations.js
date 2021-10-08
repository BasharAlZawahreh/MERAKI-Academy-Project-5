const connection = require("../../db/db");

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

module.exports = confirmReservation;
