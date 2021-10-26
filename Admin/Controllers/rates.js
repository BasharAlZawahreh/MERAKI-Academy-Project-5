const connection = require("../../db/db");

const DeleteRatebyId = (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM rates WHERE rate_id=${id}`

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
        message: ` Success rate deleted`,
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

module.exports = { DeleteRatebyId };
