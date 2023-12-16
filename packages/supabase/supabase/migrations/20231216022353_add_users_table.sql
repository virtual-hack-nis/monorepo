CREATE SEQUENCE referral_code_seq START 854694;

CREATE TABLE taxi_users (
  id SERIAL PRIMARY KEY,
  taxi_card_number TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  promo_code TEXT,
  points INTEGER DEFAULT 0 CHECK (points >= 0),
  referral_code BIGINT DEFAULT nextval('referral_code_seq') NOT NULL UNIQUE CHECK (referral_code >= 100000 AND referral_code <= 999999),
  referrer_id INTEGER REFERENCES taxi_users(id)
);

CREATE TABLE vendors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  website TEXT,
  contact_info TEXT
);

CREATE TABLE rewards (
  id SERIAL PRIMARY KEY,
  vendor_id INTEGER NOT NULL REFERENCES vendors(id),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  points_cost INTEGER NOT NULL CHECK (points_cost > 0)
);

CREATE TABLE user_rewards (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES taxi_users(id),
  reward_id INTEGER NOT NULL REFERENCES rewards(id),
  status TEXT NOT NULL CHECK (status IN ('Claimed', 'Unclaimed'))
);

CREATE TABLE transfers (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES taxi_users(id),
  receiver_id INTEGER NOT NULL REFERENCES taxi_users(id),
  points_transferred INTEGER NOT NULL CHECK (points_transferred >= 0),
  reward_id INTEGER NOT NULL REFERENCES rewards(id),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE OR REPLACE FUNCTION update_referrer_points() RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'UPDATE' AND NEW.points > OLD.points) THEN
    UPDATE taxi_users SET points = points + ((NEW.points - OLD.points) * 0.05)
    WHERE id = NEW.referrer_id;
    UPDATE taxi_users SET points = points + 5 WHERE id = NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_referrer_points_trigger
AFTER INSERT OR UPDATE OF points ON taxi_users
FOR EACH ROW EXECUTE FUNCTION update_referrer_points();