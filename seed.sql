USE bamazon;

INSERT INTO products (product_name,department,price, stock_quantity) 
VALUES("Bread","Bakery", 5.00, 100),("Toast","Bakery", 5.00, 100),("Microswitches", "Electronics", 10.50, 5),("Buttons", "Electronics", 15.00, 5), 
("Fate Stay/Night", "Video Games", 60.00, 10), ("Beatmania IIDX", "Video Games", 400.00, 1),("Hammer", "Dao Tools", 5.00, 5),("hi", "hi", 1.00, 500),
("GJ Tao Controller", "Electronics", 200.00, 50),("Xybur's Duct Tape", "Leak Prevention", 5.00, 1),("Love Live: Sunshine!", "Movies", 45.00, 20);


SELECT * FROM products;
