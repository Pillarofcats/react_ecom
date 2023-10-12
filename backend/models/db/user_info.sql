CREATE TABLE ecom.user_info (
  u_id BIGINT PRIMARY KEY NOT NULL REFERENCES ecom.all_users(u_id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
	firstname VARCHAR(255),
	lastname VARCHAR(255),
	birthday DATE,
  address VARCHAR(255),
	phone VARCHAR(255),
  purchases JSON,
  cart JSON
);