const carModel = require("../../db/db");

const addNewCar = (req, res) => {
    let user_id = req.token.user_id
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
 (c_img,color,model,description,manifactoring_year,day_price,user_id,car_types_id,car_brand_id)
 VALUES(?,?,?,?,?,?,?,?,?)`;
  const data = [
    c_img,
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
const getCarById = (req, res) => {
  const car_id = req.params.car_id;
  const query = `SELECT * FROM cars INNER JOIN car_brands ON cars.car_id=car_brands.brand_id
     INNER JOIN car_types ON cars.car_id=car_types.typeCar_id WHERE cars.car_id=${car_id} AND cars.is_Deleted=0`;

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
  const user_id = req.token.userId;
  const query = `SELECT * FROM cars INNER JOIN car_brands ON cars.car_id=car_brands.brand_id
INNER JOIN car_types ON cars.car_id=car_types.typeCar_id WHERE cars.user_id=? AND cars.is_Deleted=0`;
  const data = [user_id];
  carModel.query(query, data, (err, result) => {

    if (!result.length) {
      res.status(500).json({
        success: false,
        message: `not found any car`,
      });
    } else if (err) {
      res.status(404).json({
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

const updateCarById = (req, res) => {
  const car_id = req.params.car_id;
  const {c_img,color,carLicense,description,is_Available,day_price}=req.body
  const query = `UPDATE cars set c_img=?,color=?,carLicense=?,description=?,is_Available=?,day_price=? WHERE car_id=?`
  const data = [c_img,color,carLicense,description,is_Available,day_price,car_id]
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

const toggleCarAvailability=(req,res)=>{
    const car_id = req.params.car_id;
    const query = `UPDATE cars SET is_Available=0 WHERE car_id=${car_id}`
    
    carModel.query(query,  (err, result) => {
        
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

const deleteCarById=(req,res)=>{
    //we will makw soft delete
    const car_id = req.params.car_id;
    const query = `UPDATE cars SET is_Deleted=1 WHERE car_id=${car_id}`
    
    carModel.query(query,  (err, result) => {
        
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


}


module.exports = { addNewCar, getCarById, getCarByuserId, updateCarById,toggleCarAvailability ,deleteCarById};
