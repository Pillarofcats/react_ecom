CREATE TABLE ecom.all_products (
  p_id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  price_cent BIGINT NOT NULL,
  weight_lbs REAL NOT NULL,
  product_type VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  quantity_sold BIGINT
);