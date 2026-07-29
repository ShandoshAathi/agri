-- AgriSense AI Database Schema (Supabase PostgreSQL)

-- 1. Users Table (Farm Managers & Farmers)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) CHECK (role IN ('manager', 'farmer')) NOT NULL,
    phone VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Farms Table
CREATE TABLE IF NOT EXISTS farms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    crop VARCHAR(100) NOT NULL,
    size_acres NUMERIC(8, 2) NOT NULL,
    soil_type VARCHAR(100),
    health_score INT DEFAULT 90,
    manager_id UUID REFERENCES users(id),
    farmer_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Devices Table (ESP32 Gateway Nodes)
CREATE TABLE IF NOT EXISTS devices (
    device_id VARCHAR(100) PRIMARY KEY,
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Online',
    battery_level INT DEFAULT 100,
    ip_address VARCHAR(50),
    last_ping TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Telemetry Stream Table
CREATE TABLE IF NOT EXISTS telemetry (
    id BIGSERIAL PRIMARY KEY,
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    device_id VARCHAR(100) REFERENCES devices(device_id),
    soil_moisture NUMERIC(5, 2) NOT NULL,
    temperature NUMERIC(5, 2) NOT NULL,
    humidity NUMERIC(5, 2) NOT NULL,
    soil_ph NUMERIC(4, 2) NOT NULL,
    rain_detected BOOLEAN DEFAULT FALSE,
    water_tank_level NUMERIC(5, 2) NOT NULL,
    pump_status VARCHAR(10) CHECK (pump_status IN ('ON', 'OFF')) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Disease Diagnosis Scans
CREATE TABLE IF NOT EXISTS disease_scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES farms(id),
    user_id UUID REFERENCES users(id),
    image_url TEXT NOT NULL,
    disease_identified VARCHAR(255) NOT NULL,
    severity_level VARCHAR(100) NOT NULL,
    treatment_advice TEXT NOT NULL,
    scanned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Notifications & Alert Logs
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    farm_id UUID REFERENCES farms(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
