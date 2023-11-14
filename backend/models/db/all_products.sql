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