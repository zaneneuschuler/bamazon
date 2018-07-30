DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id int NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NULL,
  department VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity SMALLINT NULL,
  PRIMARY KEY (item_id)
);



SELECT * FROM products;
