CREATE TABLE ecom.user_info (
  u_id BIGINT PRIMARY KEY REFERENCES ecom.all_users(u_id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
	firstname VARCHAR(255),
	lastname VARCHAR(255),
	birthday DATE,
  address VARCHAR(255),
	phone VARCHAR(255),
  purchases JSONB,
  cart JSONB
);

-- GET USER'S REVIEWS: SELECT * FROM ecom.product_reviews WHERE u_id = u_id

-- PURCHASES JSONB SCHEMA: [{"p_id": "1"}, {"p_id": "2"}, {"p_id": "3"}]
  
-- CART JSONB SCHEMA: [{"p_id": "1"}, {"p_id": "2"}, {"p_id": "3"}]