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
  colors JSONB,
  sizes JSONB
);

-- COLORS JSONB SCHEMA (COLORS VALUES ARE THE NAME OF THE IMAGE TO GET): [{"red": "pid+red.jpg"}, {"blue": "pid+blue.jpg"}, {"green": "pid+green.jpg"}]
  
-- SIZES JSONB SCHEMA (VALUES ARE NUMBER OF EXTRA DOLLARS ($1)): [{"sm": "0"}, {"md": "0"}, {"lg": "1"}, {"xl": "2"}, {"xxl": "3"}]