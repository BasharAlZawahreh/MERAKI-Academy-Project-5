const connection = require('../../db/db')

const getAllCars = (req, res) => {
    const query = `SELECT * FROM cars 
    INNER JOIN car_types ON car_types.typeCar_id = car_types_id
    INNER JOIN car_brands ON car_brands.brand_id = car_brand_id
    INNER JOIN users ON users.user_id = cars.user_id
    WHERE is_Deleted = 0`;
  
    connection.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err,
        });
      }
      else if (!result.length) {
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


  const deleteCarById = async (req, res) => {
    let id = req.params.id;
    const query = `UPDATE users SET is_Deleted=1 WHERE car_id=${id}`;
  
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


  module.exports = {getAllCars, deleteCarById}