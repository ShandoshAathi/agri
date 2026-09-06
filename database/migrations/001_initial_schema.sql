-- Migration 001: Initial Core Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'Farmer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    area_acres NUMERIC(8,2) DEFAULT 10.0,
    crop_type VARCHAR(100) DEFAULT 'Tomato (Hybrid)',
    manager_id UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS telemetry_logs (
    id BIGSERIAL PRIMARY KEY,
    farm_id UUID REFERENCES farms(id) ON DELETE CASCADE,
    device_id VARCHAR(50) NOT NULL,
    temperature NUMERIC(5,2),
    humidity NUMERIC(5,2),
    soil_moisture NUMERIC(5,2),
    soil_ph NUMERIC(4,2),
    rain_detected BOOLEAN DEFAULT FALSE,
    water_tank_level NUMERIC(5,2),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
