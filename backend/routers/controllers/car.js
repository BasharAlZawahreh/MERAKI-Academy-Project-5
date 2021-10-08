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
const getCarById=(req,res)=>{
    const car_id = req.params.car_id
    const query=`SELECT * FROM cars INNER JOIN car_brands ON cars.car_id=car_brands.brand_id
     INNER JOIN car_types ON cars.car_id=car_types.typeCar_id WHERE cars.car_id=${car_id}`
    
     carModel.query(query,(err,result)=>{
         if(!result.length){
            res.status(201).json({
                success: true,
                message: `not found any car`,
              });
         } else if(err){
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
     })
    }
    

module.exports = { addNewCar,getCarById};