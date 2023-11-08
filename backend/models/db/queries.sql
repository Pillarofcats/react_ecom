CREATE TABLE ecom.all_users (
  u_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE ecom.user_info (
  u_id BIGINT PRIMARY KEY REFERENCES ecom.all_users(u_id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255),
	firstname VARCHAR(255),
	lastname VARCHAR(255),
	birthday VARCHAR(10),
  address VARCHAR(255),
	phone VARCHAR(255)
);

CREATE TABLE ecom.user_purchases (
  purchase_id SERIAL PRIMARY KEY NOT NULL,
  u_id BIGINT REFERENCES ecom.all_users(u_id) ON DELETE CASCADE,
  purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
  p_id BIGINT NOT NULL,
  stars INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  price_cent INTEGER NOT NULL,
  qty_purchased INTEGER NOT NULL
);

CREATE TABLE ecom.all_products (
  p_id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price_cent INTEGER NOT NULL,
  weight_lbs REAL NOT NULL,
  product_type VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  stars INTEGER NOT NULL,
  quantity_sold INTEGER,
  num_reviews INTEGER,
  colors JSONB,
  sizes JSONB
);

CREATE TABLE ecom.product_reviews (
  r_id SERIAL PRIMARY KEY,
  p_id BIGINT NOT NULL REFERENCES ecom.all_products(p_id) ON DELETE CASCADE,  
  u_id BIGINT NOT NULL REFERENCES ecom.user_info(u_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  r_date DATE NOT NULL DEFAULT CURRENT_DATE,
  username VARCHAR(255) NOT NULL,
  review VARCHAR(255) NOT NULL,
  stars INTEGER NOT NULL
);

INSERT INTO ecom.all_users (username, email, password)
VALUES ('cat1', 'a@w.com', '1234'),
('cat2', 'b@w.com', '1234'),
('cat3', 'c@w.com', '1234'),
('cat4', 'd@w.com', '1234');

INSERT INTO ecom.user_info (u_id, email, username, lastname)
VALUES (1, 'a@w.com', 'J1', 'W1'),(2, 'b@w.com', 'J2', 'W2'),(3, 'c@w.com', 'J3', 'W3'),(4, 'd@w.com', 'J4', 'W4');

SELECT * FROM ecom.user_info
JOIN ecom.all_users ON user_info.u_id = all_users.u_id;

SELECT * FROM ecom.all_users;

INSERT INTO ecom.all_products (title, description, price_cent, weight_lbs, product_type, quantity, stars)
VALUES
  ('Boxed Cereal 1', 'A really tasty cereal, not just for kids.','764','1.11','Foods','22','2'),
	('Makeup Brush','A Fine hair contour brush for delicate skin, look your best everyday.','1264','0.23','Cosmetics','18','5'),
	('Wood Guitar 1','A great guitar for beginners and professionals, great sound quality.','28714','8.17','Instruments','8','4'),
	('Boater Hat','A nice hat for a nice day, comfortable fit.', '1466','1.14','Apparel','16','3'),
	('Power Drill 1','A great tool for the right job, easy to handle and yellow.', '4393','5.29','Tools','5','2'),
	('Gaming Mouse 1','A responsive mouse for any hardcore gamer, red like lava.', '6098','1.82','Electronics','12','5'),
	('Comfy Pants 1','A comfy pair of pants, great for lounging around.', '2998','3.41','Apparel','31','4'),
	('Regal Necklace 1','A a beautiful necklace fit for a queen, be beautiful.', '7227','0.46','Jewelry','4','3'),
	('Pickles Jar 1','A jar of tasty pickled pickles, try not to eat them all.', '533','4.71','Foods','19','2'),
	('Striped Shirt 1','A great striped shirt that is stylish, impress people.', '1889','1.41','Apparel','15','4'),
	('Big TV 1','A big television for big sports parties, no sore necks.', '44795','19.12','Electronics','5','5'),
  ('Soda Pack 1','A 6-pack of liquid sugary goodness, enjoy everyday.', '666','3.20','Foods','45','3'),
  ('Pans Set 1','A great quality set of pans fit for any cook, make the best meals.', '12989','34.71','Cookware','11','2'),
  ('Metal Scissors','A strong pair of scissors, cut something.', '734','2.23','Tools','16','3'),
  ('Suit Tie 1','A powerful red striped tie, make some hard decisions.', '1367','1.97','Apparel','9','4'),
  ('Wheat Flour','A healthy ingredient with many nutrients, bake something good.', '1253','6.91','Foods','10','3'),
  ('Watch 1','A nice accurate watch, always be on time.', '2723','1.98','Jewelry','27','5'),
  ('Ballcap Hat 1','A white ballcap that fits all sizes, look sporty.', '1715','1.31','Apparel','4','3'),
  ('Coffee Maker 1','A black sleek maker of coffee, get energized.', '4322','11.43','Cookware','8','2'),
  ('Doritos Chips 1','A salty, tasty, triangular snack, treat yourself.', '531','1.12','Foods','45','5');