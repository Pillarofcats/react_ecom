CREATE TABLE ecom.all_products (
  p_id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  price_cent BIGINT NOT NULL,
  weight_lbs REAL NOT NULL,
  product_type VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  quantity_sold BIGINT
);

CREATE TABLE ecom.all_users (
  u_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE ecom.user_info (
  u_id BIGINT PRIMARY KEY NOT NULL REFERENCES ecom.all_users(u_id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
	firstname VARCHAR(255),
	lastname VARCHAR(255),
	birthday DATE,
  address VARCHAR(255),
	phone VARCHAR(255),
  purchases JSON,
  cart JSON
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