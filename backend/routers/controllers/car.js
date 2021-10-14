const connection = require("../../db/db");

const addNewCar = (req, res) => {

 console.log("req",req.body)
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
    main_img
  } = req.body;
  const query = `INSERT INTO cars
 (color,model,description,manifactoring_year,day_price,user_id,car_types_id,car_brand_id,main_img)
 VALUES(?,?,?,?,?,?,?,?,?)`;
  const data = [
    color,
    model,
    description,
    manifactoring_year,
    day_price,
    user_id,
    car_types_id,
    car_brand_id,
    main_img
  ];
  // let carId = 0
  console.log("dataoooooooo",data);
  connection.query(query, data, (err, result) => {
    console.log("res",result);
    console.log("urls",urls);
    console.log("err",err);
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (result.affectedRows) {
      let car_id = result.insertId;
      res.json(result)


    }
  });
  
};

const addImgs=(req,res)=>{
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  console.log("req.body",req.body);
  let finalResult = {
    success: false,
    message: `added successfully `,
    result1: []
  }
  let status = 201
  const urls = req.body.imgUrl
  const car_id = req.body.car_id
  console.log("urls=>",urls);
  console.log("car_id=>",car_id);
  if(urls){
    while (urls.length) {
      let query = `INSERT INTO car_imgs
      (imgUrl,car_id)
      VALUES(?,?)`;
      const data = [urls[0], car_id];
      urls.shift();
      connection.query(query, data, (err, result) => {
        console.log("result",result);
        console.log("err",err);
        if (result.affectedRows) {
          console.log("hi ");
          finalResult.success=true
          finalResult.result1.push(result)
         
        } else if(err) {
          finalResult = ({
            success: false,
            message: `some thing error `,
            err: err
          });
          status = 400
        }
      });
    }
   }
   console.log("1",finalResult);
    res.status(status).json(finalResult)
}

const getCarById = (req, res) => {

  const car_id = req.params.car_id;
  const query = `SELECT * FROM cars INNER JOIN car_brands ON cars.car_id=car_brands.brand_id
     INNER JOIN car_types ON cars.car_id=car_types.typeCar_id 
     INNER JOIN car_imgs ON cars.car_id=car_imgs.car_id
     WHERE cars.car_id=${car_id} AND cars.is_Deleted=0`;

  connection.query(query, (err, result) => {
    if (!result.length) {
     return res.status(404).json({
        success: false,
        message: `not found any car`,
      });
    } else if (err) {
    return  res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }
   return res.status(201).json({
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

  connection.query(query, (err, result) => {
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
    return res.status(201).json({
      success: true,
      result: result,
    });
  });
};

const updateCarById = (req, res) => {
  const car_id = req.params.car_id;
  const { color, carLicense, description, is_Available, day_price ,main_img} = req.body;
  const query = `UPDATE cars set color=?,carLicense=?,description=?,is_Available=?,day_price=? WHERE car_id=?`;
  const data = [
    color,
    carLicense,
    description,
    is_Available,
    day_price,
    car_id,
    main_img
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (!result.affectedRows) {
      return res.status(500).json({
        success: false,
        message: `car not found`,
      });
    }
    return res.status(202).json({
      success: true,
      result: result,
    });
  });
};

const toggleCarAvailability = (req, res) => {
  const car_id = req.params.car_id;
  const query = `UPDATE cars SET is_Available=0 WHERE car_id=${car_id}`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (!result.affectedRows) {
      return res.status(500).json({
        success: false,
        message: `car not found`,
      });
    }
    return res.status(202).json({
      success: true,
      result: result,
    });
  });
};

const deleteCarById = (req, res) => {
  //we will makw soft delete
  const car_id = req.params.car_id;
  const query = `UPDATE cars SET is_Deleted=1 WHERE car_id=${car_id}`;

  connection.query(query, (err, result) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    } else if (!result.affectedRows) {
      return res.status(500).json({
        success: false,
        message: `car not found`,
      });
    }
    return res.status(202).json({
      success: true,
      message: "success deleted",
    });
  });
};

// this function return cars according to filters
const carsFilter = (req, res) => {
  const {
   
    day_price_from,
    day_price_to,
  
  } = req.body;

  const car_type = req.body.car_type || "";
  const color = req.body.color || "";
  const brand_car=req.body.brand_car || "";
  const manifactoring_year=req.body.manifactoring_year || "";
  const model=req.body.model || "";


  //test query
  /*
  `SELECT * FROM cars
  INNER JOIN car_types ON car_types.typeCar_id = car_types_id
    INNER JOIN car_brands ON car_brands.brand_id = car_brand_id
    WHERE brand="seedan" AND label="BMW" AND color="red" AND model="520"
    AND manifactoring_year="2020-02-02" AND is_Available=1
    AND day_price BETWEEN 20 AND 30;`
*/

  const query = `SELECT * FROM cars 
  INNER JOIN car_types ON car_types.typeCar_id = car_types_id
  INNER JOIN car_brands ON car_brands.brand_id = car_brand_id
  WHERE brand LIKE "%${brand_car}"  
  AND car_type LIKE "%${car_type}"
  AND color LIKE "%${color}"  
  AND model LIKE "%${model}%"  
  AND manifactoring_year lIKE "%${manifactoring_year}"  
  AND day_price BETWEEN ${day_price_from} AND ${day_price_to}
  AND is_Available=1`;

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
        message: `not found any related car`,
      });
    }

    res.status(200).json({
      success: true,
      message: "filtered cars",
      result: result,
    });
  });
};

const getCarTypes = (req, res) => {
  console.log("carType");
  const query = `SELECT * FROM car_types`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }

    return res.status(200).json({
      success: true,
      message: "car types",
      result: result,
    });
  });
};

const getCarBrands = (req, res) => {
  const query = `SELECT * FROM car_brands`;
  connection.query(query, (err, result) => {
    console.log(err);
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    }

    return res.status(200).json({
      success: true,
      message: "car types",
      result: result,
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
  carsFilter,
  getCarTypes,
  getCarBrands,
  addImgs
};
