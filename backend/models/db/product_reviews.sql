CREATE TABLE ecom.product_reviews (
  r_id SERIAL PRIMARY,
  p_id BIGINT NOT NULL KEY REFERENCES ecom.all_products(p_id) ON DELETE CASCADE,  
  u_id BIGINT NOT NULL UNIQUE REFERENCES ecom.user_info(u_id) ON DELETE CASCADE,
  review VARCHAR(255) NOT NULL,
  stars INTEGER NOT NULL
);

