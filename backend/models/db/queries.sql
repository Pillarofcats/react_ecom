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
	('Shirt 1','A great striped shirt that is stylish, impress people.', '1889','1.41','Apparel','15','4'),
	('Big TV 1','A big television for big sports parties, no sore necks.', '44795','19.12','Electronics','5','5'),
  ('Soda Pack 1','A 6-pack of liquid sugary goodness, enjoy everyday.', '666','3.20','Foods','45','3'),
  ('Pans Set 1','A great quality set of pans fit for any cook, make the best meals.', '12989','34.71','Cookware','11','2'),
  ('Metal Scissors','A strong pair of scissors, cut something.', '734','2.23','Tools','16','3'),
  ('Suit Tie 1','A powerful red striped tie, make some hard decisions.', '1367','1.97','Apparel','9','4'),
  ('Wheat Flour','A healthy ingredient with many nutrients, bake something good.', '1253','6.91','Foods','10','3'),
  ('Watch 1','A nice accurate watch, always be on time.', '2723','1.98','Jewelry','27','5'),
  ('Ballcap Hat 1','A white ballcap that fits all sizes, look sporty.', '1715','1.31','Apparel','4','3'),
  ('Coffee Maker 1','A black sleek maker of coffee, get energized.', '4322','11.43','Cookware','8','2'),
  ('Doritos Chips 1','A salty, tasty, triangular snack, treat yourself.', '531','1.12','Foods','45','5'),
  ('Dress Shoes 1','A nice leathery pair of shoes, no squeaky walking sounds.', '7824','2.46','Apparel','7','4'),
  ('Grey Dress 1','A beautiful grey dress for staying neutral.', '6235','2.23','Apparel','4','2'),
  ('BBQ Sauce 1','A tasty smokey sauce for anything.', '575','1.83','Foods','19','1'),
  ('Board Game 1','A board game, play with your friends.', '2378','6.41','Toys','11','3'),
  ('Bread 1','A bag of tasty carbohydrates, get energy.', '396','0.56','Foods','22','1'),
  ('Blender 1','A nice powerful blenders, make a smoothie.', '3351','10.24','Cookware','5','2'),
  ('Boxed Cereal 2','A tasty breakfast, eat a couple bowls.', '725','2.56','Foods','14','5'),
  ('Drum Set 1','A nice drumset, join a band.', '14583','35.82','Instruments','3','4'),
  ('Keyboard 1','A great keyboard, click-clack.', '8320','3.92','Electronics','8','1'),
  ('Jeans 1','A good fit and comfortable.', '4689','4.82','Apparel','9','2'),
  ('Peanut Butter','A delicious filling snack, get some crackers.', '672','3.65','Foods','5','2'),
  ('Comfy Shorts','A pair of comfy shorts, relax a bit.', '2723','3.73','Apparel','10','3'),
  ('Stereo','A great loud stereo to listen to music with.', '2689','15.72','Electronics','5','4'),
  ('Rubix Cube','A fun puzzle to solve.', '673','1.41','Toys','7','5'),
  ('Action Figure','A cool toy any kid would want.', '1173','1.27','Toys','4','3'),
  ('Ballcap Hat 2','A black ballcap that keeps you cool.', '1623','0.57','Apparel','3','4'),
  ('Toaster 1','A great way to make toast.', '1543','7.27','Cookware','6','2'),
  ('Gold Ring','A shiny gold ring, looking good.', '6893','0.24','Jewelry','3','1'),
  ('Wrench','A good tool for tough jobs, strong as steel.', '2617','5.17','Tools','19','3'),
  ('Rice','A big bag of rice, glutenous grains of goodness.', '2168','13.23','Foods','7','4'),
  ('Lipstick','A beautiful red color, look good.', '3257','1.12','Cosmetics','15','5'),
  ('Camera 1','A retro style camera with a high resolution lense, capture a moment.', '44786','6.35','Electronics','8','4'),
  ('Keyboard 2','A RGB keyboard that has a nice click-clack sounds.', '7798','6.53','Electroncis','12','3'),
  ('Winter Mug','A nice mug for a cold day, get some hot cocoa.', '489','2.64','Cookware','8','1'),
  ('Olive Oil','A health oil to cook with and eat.', '1359','4.43','Foods','9','3'),
  ('Sweater 1','A nice striped sweater that will keep your warm in the cold, stay warm.', '2165','2.01','Apparel','10','3'),
  ('Silverware Set','A great set to have for eating.', '4478','15.28','Cookware','19','1'),
  ('Dumbell','Get swoll.', '1894','50.64','Tools','4','3'),
  ('Toaster 2','A old school toaster that still works, make some toast.', '2697','9.43','Cookware','14','1'),
  ('Boots 1','A nice pair of boots for hiking and other activities, stay centered.', '6747','5.89','Apparel','4','5'),
  ('Chair','A comfy beige chair, sit and relax.', '4652','15.25','Furniture','2','3'),
  ('Guitar 2','A great wood guitar that sounds great, play something.', '61321','14.42','Instruments','6','4'),
  ('Sweater 2','A nice black sweater to keep you warm this winter.', '2456','1.42','Apparel','3','4'),
  ('Sneakers 1','A pair of great sneakers for athletes, train hard.', '6324','2.87','Apparel','8','1'),
  ('BBQ Sauce 2','A tasty sauce for any BBQ, slather it on.', '845','2.12','Foods','16','2'),
  ('Coffee Maker','A coffee maker to keep you sane, and stay on top of your day.', '5275','13.26','Cookware','9','4'),
  ('Knife Set','A sharp set of knives, cook something.', '9356','9.26','Cookware','3','3'),
  ('Keyboard 3','A stylish keyboard that makes you look good typing, type something.', '11234','8.28','Electronics','7','1'),
  ('Tie','A simple and neutral tie, look good.', '2254','0.72,','Apparel','4','5'),
  ('Power Drill 2','A great tool, drill something.', '8821','14.26','Tools','14','2'),
  ('Soda Pack 2','A delicious tasting bubbly beverage with sugar, drink it.', '368','4.37','Foods','23','1'),
  ('Sweater 3','A wavy sweater all warm and fuzzy, keep warm.', '1897','2.21','Apparel','17','4'),
  ('Shirt 2','A plain white T-shirt, get it.', '799','1.47','Apparel','21','3');