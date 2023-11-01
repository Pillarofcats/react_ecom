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