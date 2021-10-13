CREATE DATABASE IF NOT EXISTS autoRental;

USE autoRental ;
-- -----------------------------------------------------
-- Table  autoRental . users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(255) NOT NULL,
  lastName VARCHAR(255) ,
  age INT NULL,
  city VARCHAR(45) ,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  ssn INT  UNIQUE,
  birthDate DATE  ,
  role VARCHAR(45)   DEFAULT "user",
  license_img  LONGBLOB,
  mobile VARCHAR(45)  ,
  is_Blocked TINYINT   DEFAULT 0,
  PRIMARY KEY (user_id)
  );
-- -----------------------------------------------------
-- Table  autoRental . car_types
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS car_types (
  typeCar_id INT NOT NULL AUTO_INCREMENT,
    car_type VARCHAR(255) ,
  type_desc VARCHAR(100) ,
  PRIMARY KEY (typeCar_id)
 );
-- -----------------------------------------------------
-- Table  autoRental . car_brands
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS car_brands (
  brand_id INT NOT NULL AUTO_INCREMENT,
  decrp VARCHAR(100) ,
  brand VARCHAR(45) NOT NULL UNIQUE,
  PRIMARY KEY (brand_id)
 );
-- -----------------------------------------------------
-- Table  autoRental . cars
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS cars(
  car_id INT NOT NULL AUTO_INCREMENT,
  color VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  carLicense LONGBLOB,
  description VARCHAR(255) NULL,
  manifactoring_year YEAR(4) NOT NULL,
  is_Available TINYINT  DEFAULT 1,
  is_Deleted TINYINT  DEFAULT 0,
  day_price DOUBLE NOT NULL,
  user_id INT NOT NULL,
 FOREIGN KEY (user_id) REFERENCES users(user_id),
  car_types_id INT NOT NULL,
  FOREIGN KEY (car_types_id) REFERENCES car_types(typeCar_id),
  car_brand_id INT NOT NULL,
  FOREIGN KEY (car_brand_id) REFERENCES car_brands(brand_id),
  main_img VARCHAR(255) NOT NULL,
  PRIMARY KEY (car_id));
-- -----------------------------------------------------
-- Table  autoRental . imgs 
-- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS car_imgs (
  img_id INT NOT NULL AUTO_INCREMENT,
    imgUrl VARCHAR(255) ,
  car_id int ,
   FOREIGN KEY (car_id) REFERENCES cars ( car_id),
  PRIMARY KEY (img_id)
 );

-- -----------------------------------------------------
-- Table  autoRental . reservations
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS reservations (
  res_id INT NOT NULL AUTO_INCREMENT,
  returnDate DATE NOT NULL,
  PickUpDate DATE NOT NULL,
  isConfirmed TINYINT NULL DEFAULT 0,
  amount DOUBLE NOT NULL,
  users_id INT NOT NULL,
  FOREIGN KEY (users_id) REFERENCES users(user_id),
  car_id INT NOT NULL,
  FOREIGN KEY (car_id) REFERENCES cars(car_id),
  PRIMARY KEY (res_id)
 );
-- -----------------------------------------------------
-- Table  autoRental . rates
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS rates(
  rate_id  INT NOT NULL AUTO_INCREMENT,
  comment  VARCHAR(100) ,
  rate  TINYINT NOT NULL,
  rate_date  DATE NOT NULL,
   car_id  INT NOT NULL,
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
  user_id  INT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(user_id),
  PRIMARY KEY ( rate_id  )
 );