CREATE TABLE ecom.product_reviews (
  r_id SERIAL PRIMARY KEY,
  p_id BIGINT NOT NULL REFERENCES ecom.all_products(p_id) ON DELETE CASCADE,  
  u_id BIGINT NOT NULL UNIQUE REFERENCES ecom.user_info(u_id) ON DELETE CASCADE,
  username VARCHAR(255) NOT NULL,
  review VARCHAR(255) NOT NULL,
  stars INTEGER NOT NULL
);
