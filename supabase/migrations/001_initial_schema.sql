-- =====================================================
-- Bihh Platform Database Schema
-- Run this in Supabase SQL Editor
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Vehicles Table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  long_description TEXT,
  price_per_day DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Saloon Car', 'SUV', 'Van', '4x4', 'Compact Car', 'Luxury SUV')),
  image_url TEXT,
  gallery TEXT[],
  features TEXT[],
  seats INTEGER,
  transmission TEXT,
  range TEXT,
  acceleration TEXT,
  top_speed TEXT,
  status TEXT DEFAULT 'available' CHECK (status IN ('available', 'booked', 'maintenance')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE RESTRICT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'ongoing', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

-- Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT DEFAULT 'M-Pesa',
  transaction_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  mpesa_receipt_number TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Roadtrips Table
CREATE TABLE IF NOT EXISTS roadtrips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  price_per_person DECIMAL(10,2) NOT NULL,
  duration TEXT,
  date TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'full')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Driver Verifications Table
CREATE TABLE IF NOT EXISTS driver_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  driver_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  license_number TEXT NOT NULL,
  license_expiry DATE NOT NULL,
  id_number TEXT NOT NULL,
  license_front_url TEXT,
  license_back_url TEXT,
  id_front_url TEXT,
  id_back_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_data JSONB,
  new_data JSONB,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_vehicle ON bookings(vehicle_id);
CREATE INDEX idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);
CREATE INDEX idx_verifications_status ON driver_verifications(status);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roadtrips_updated_at BEFORE UPDATE ON roadtrips
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_verifications_updated_at BEFORE UPDATE ON driver_verifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create audit log
CREATE OR REPLACE FUNCTION create_audit_log()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'DELETE') THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_data, user_id)
    VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD), auth.uid());
    RETURN OLD;
  ELSIF (TG_OP = 'UPDATE') THEN
    INSERT INTO audit_logs (table_name, record_id, action, old_data, new_data, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(OLD), row_to_json(NEW), auth.uid());
    RETURN NEW;
  ELSIF (TG_OP = 'INSERT') THEN
    INSERT INTO audit_logs (table_name, record_id, action, new_data, user_id)
    VALUES (TG_TABLE_NAME, NEW.id, TG_OP, row_to_json(NEW), auth.uid());
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply audit triggers
CREATE TRIGGER audit_vehicles AFTER INSERT OR UPDATE OR DELETE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

CREATE TRIGGER audit_bookings AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION create_audit_log();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadtrips ENABLE ROW LEVEL SECURITY;
ALTER TABLE driver_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Vehicles: Public can view available vehicles, admins have full access
CREATE POLICY "Public can view available vehicles" ON vehicles
  FOR SELECT USING (status = 'available');

CREATE POLICY "Admins have full access to vehicles" ON vehicles
  FOR ALL USING (auth.jwt() ->> 'role' = 'authenticated');

-- Customers: Users can view/update their own data
CREATE POLICY "Users can view own customer data" ON customers
  FOR SELECT USING (auth.uid()::text = id::text OR auth.jwt() ->> 'role' = 'authenticated');

CREATE POLICY "Users can insert customer data" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins have full access to customers" ON customers
  FOR ALL USING (auth.jwt() ->> 'role' = 'authenticated');

-- Bookings: Users can view their own, admins can view all
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE email = auth.jwt() ->> 'email')
    OR auth.jwt() ->> 'role' = 'authenticated'
  );

CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage bookings" ON bookings
  FOR ALL USING (auth.jwt() ->> 'role' = 'authenticated');

-- Payments: Similar to bookings
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    booking_id IN (
      SELECT id FROM bookings WHERE customer_id IN (
        SELECT id FROM customers WHERE email = auth.jwt() ->> 'email'
      )
    )
    OR auth.jwt() ->> 'role' = 'authenticated'
  );

CREATE POLICY "Admins can manage payments" ON payments
  FOR ALL USING (auth.jwt() ->> 'role' = 'authenticated');

-- Roadtrips: Public read, admin write
CREATE POLICY "Public can view active roadtrips" ON roadtrips
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage roadtrips" ON roadtrips
  FOR ALL USING (auth.jwt() ->> 'role' = 'authenticated');

-- Driver Verifications: Users can submit, admins can review
CREATE POLICY "Users can submit verifications" ON driver_verifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own verifications" ON driver_verifications
  FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE email = auth.jwt() ->> 'email')
    OR auth.jwt() ->> 'role' = 'authenticated'
  );

CREATE POLICY "Admins can manage verifications" ON driver_verifications
  FOR ALL USING (auth.jwt() ->> 'role' = 'authenticated');

-- Settings: Admin only
CREATE POLICY "Admins can manage settings" ON settings
  FOR ALL USING (auth.jwt() ->> 'role' = 'authenticated');

-- Audit Logs: Admin read-only
CREATE POLICY "Admins can view audit logs" ON audit_logs
  FOR SELECT USING (auth.jwt() ->> 'role' = 'authenticated');

-- =====================================================
-- ENABLE REALTIME
-- =====================================================

ALTER PUBLICATION supabase_realtime ADD TABLE vehicles;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE customers;
ALTER PUBLICATION supabase_realtime ADD TABLE payments;
ALTER PUBLICATION supabase_realtime ADD TABLE roadtrips;
ALTER PUBLICATION supabase_realtime ADD TABLE driver_verifications;

-- =====================================================
-- SEED DATA (Optional - migrate existing CARS data)
-- =====================================================

-- You can insert your existing vehicles here
-- Example:
-- INSERT INTO vehicles (name, tagline, description, price_per_day, category, image_url, features, seats, transmission)
-- VALUES ('Toyota Land Cruiser', 'Premium SUV', '...', 9000, 'SUV', '/assets/vehicles/landcruiser.jpg', ARRAY['4WD', 'Leather'], 7, 'Automatic');
