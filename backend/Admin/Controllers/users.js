const connection = require("../../db/db");
const makeUserAdminById = async (req, res) => {
    let id = req.params.id;
    const query = `UPDATE users SET role="Admin" WHERE user_id=${id}`;
  
    connection.query(query, (err, result) => {
      if (result.affectedRows) {
        res.status(202).json({
          success: true,
          message: ` Success User updated`,
          result: result,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `user => ${id} not found`,
        });
      }
    });
  };

  module.exports = {makeUserAdminById} /// newwwwwwwww