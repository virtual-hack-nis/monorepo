-- Supabase doesn't allow the 'users' name for the table
CREATE TABLE taxi_users (
  id SERIAL PRIMARY KEY,
  taxi_card_number TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  promo_code TEXT,
  points INTEGER DEFAULT 0 CHECK (points >= 0)
);