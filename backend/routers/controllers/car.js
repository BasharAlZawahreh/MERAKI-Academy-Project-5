const carModel = require("../../db/db");

const addNewCar = (req, res) => {
  let resut = res.status(201).json({
    success: true,
    message: `you're car added successfuly `,
  });
  
  let user_id = req.token.user_id;
  const urls = req.body.urls;
  const {
    color,
    model,
    description,
    manifactoring_year,
    day_price,
    car_types_id,
    car_brand_id,
  } = req.body;
  const query = `INSERT INTO cars
 (color,model,description,manifactoring_year,day_price,user_id,car_types_id,car_brand_id)
 VALUES(?,?,?,?,?,?,?,?)`;
  const data = [
    color,
    model,
    description,
    manifactoring_year,
    day_price,
    user_id,
    car_types_id,
    car_brand_id,
  ];
  carModel.query(query, data, (err, result) => {

    if (err) {
     return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (result.affectedRows) {
      let car_id = result.insertId;
      
      while (urls.length) {
       
        let query = `INSERT INTO car_imgs
        (imgUrl,car_id)
        VALUES(?,?)`;
        const data = [urls[0], car_id];
        urls.shift();
        carModel.query(query, data, (err, result) => {
          
          if(result.affectedRows){
          
            resut=resut
            
          } else {
         res =  res.status(404).json({
               success: false,
               message: `some thing error `,
            });

          }

        });
      }
    }

  });
  return resut 
};
const getCarById = (req, res) => {
  const car_id = req.params.car_id;
  const query = `SELECT * FROM cars INNER JOIN car_brands ON cars.car_id=car_brands.brand_id
     INNER JOIN car_types ON cars.car_id=car_types.typeCar_id 
     INNER JOIN car_imgs ON cars.car_id=car_imgs.car_id
     WHERE cars.car_id=${car_id} AND cars.is_Deleted=0`;

  carModel.query(query, (err, result) => {

    if (!result.length) {
      res.status(201).json({
        success: false,
        message: `not found any car`,
      });
    } else if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      result: result,
    });
  });
};

const getCarByuserId = (req, res) => {
  
  const query = `SELECT * FROM cars INNER JOIN car_brands ON cars.car_id=car_brands.brand_id
INNER JOIN car_types ON cars.car_id=car_types.typeCar_id 
LEFT JOIN car_imgs ON cars.car_id=car_imgs.car_id
WHERE cars.user_id=${req.token.user_id} AND cars.is_Deleted=0`;

  console.log(req.token);
  carModel.query(query,  (err, result) => {

    if (!result.length) {
     return res.status(500).json({
        success: false,
        message: `not found any car`,
      });
    } else if (err) {
     return res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
  return  res.status(201).json({
      success: true,
      result: result,
    });
  });
};

const updateCarById = (req, res) => {
  const car_id = req.params.car_id;
  const { color, carLicense, description, is_Available, day_price } =
    req.body;
  const query = `UPDATE cars set color=?,carLicense=?,description=?,is_Available=?,day_price=? WHERE car_id=?`;
  const data = [
    color,
    carLicense,
    description,
    is_Available,
    day_price,
    car_id,
  ];
  carModel.query(query, data, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (!result.affectedRows) {
      res.status(500).json({
        success: false,
        message: `car not found`,
      });
    }
    res.status(202).json({
      success: true,
      result: result,
    });
  });
};

const toggleCarAvailability = (req, res) => {
  const car_id = req.params.car_id;
  const query = `UPDATE cars SET is_Available=0 WHERE car_id=${car_id}`;

  carModel.query(query, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (!result.affectedRows) {
      res.status(500).json({
        success: false,
        message: `car not found`,
      });
    }
    res.status(202).json({
      success: true,
      result: result,
    });
  });
};

const deleteCarById = (req, res) => {
  //we will makw soft delete
  const car_id = req.params.car_id;
  const query = `UPDATE cars SET is_Deleted=1 WHERE car_id=${car_id}`;

  carModel.query(query, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (!result.affectedRows) {
      res.status(500).json({
        success: false,
        message: `car not found`,
      });
    }
    res.status(202).json({
      success: true,
      message: "success deleted",
    });
  });
};

module.exports = {
  addNewCar,
  getCarById,
  getCarByuserId,
  updateCarById,
  toggleCarAvailability,
  deleteCarById,
};
