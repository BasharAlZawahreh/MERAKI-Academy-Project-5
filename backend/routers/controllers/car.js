const carModel = require("../../db/db");

const addNewCar = (req, res) => {
  const {
    c_img,
    color,
    model,
    description,
    manifactoring_year,
    day_price,
    car_types_id,
    car_brand_id,
  } = req.body;
  
  const query = `INSERT INTO cars
 (c_img,color,model,description,manifactoring_year,day_price,car_types_id,car_brand_id)
 VALUES(?,?,?,?,?,?,?,?)`;
  const data = [
    c_img,
    color,
    model,
    description,
    manifactoring_year,
    day_price,
    car_types_id,
    car_brand_id,
  ];
  carModel.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (result) {
      res.status(201).json({
        success: true,
        message: `you're car added successfuly `,
      });
    }
  });
};

module.exports = { addNewCar};