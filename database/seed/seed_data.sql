-- Seed Initial Data for 17 AgriSense AI Database Tables

-- 1. Users
INSERT INTO users (id, email, password_hash, full_name, role) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'alex@agrisense.io', '$2b$12$KIXp4jXWn.demoHash123', 'Alex Morgan', 'Farm Manager'),
('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'john@agrisense.io', '$2b$12$KIXp4jXWn.demoHash456', 'John Doe', 'Farmer')
ON CONFLICT (email) DO NOTHING;

-- 2. Managers & 3. Farmers
INSERT INTO managers (id, user_id, organization, phone) VALUES
('m0eebc99-9c0b-4ef8-bb6d-6bb9bd380m01', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'AgriSense Corporate Farms', '+1-555-0192')
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO farmers (id, user_id, assigned_area, phone) VALUES
('f0eebc99-9c0b-4ef8-bb6d-6bb9bd380f01', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Sector 4 Hydroponics', '+1-555-0193')
ON CONFLICT (user_id) DO NOTHING;

-- 4. Farms
INSERT INTO farms (id, manager_id, name, location, area_acres, crop_type) VALUES
('fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 'm0eebc99-9c0b-4ef8-bb6d-6bb9bd380m01', 'Green Valley Precision Farm', 'California Valley, USA', 25.5, 'Tomato (Hybrid Rome)')
ON CONFLICT (id) DO NOTHING;

-- 5. FarmAssignments
INSERT INTO farm_assignments (farm_id, farmer_id, role_description) VALUES
('fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380f01', 'Lead Field Specialist')
ON CONFLICT (farm_id, farmer_id) DO NOTHING;

-- 6. Devices & 7. Sensors
INSERT INTO devices (id, farm_id, device_name, device_type, mac_address, status) VALUES
('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380d01', 'fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 'ESP32 Telemetry Gateway Node', 'gateway_node', 'ESP32-NODE-01', 'ONLINE')
ON CONFLICT (mac_address) DO NOTHING;

INSERT INTO sensors (id, device_id, sensor_type, pin_number, status) VALUES
('s0eebc99-9c0b-4ef8-bb6d-6bb9bd380s01', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d01', 'dht22', 4, 'Active'),
('s0eebc99-9c0b-4ef8-bb6d-6bb9bd380s02', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d01', 'soil_moisture', 34, 'Active')
ON CONFLICT (id) DO NOTHING;

-- 8. SensorReadings
INSERT INTO sensor_readings (sensor_id, farm_id, temperature, humidity, soil_moisture, soil_ph, rain_detected, water_tank_level) VALUES
('s0eebc99-9c0b-4ef8-bb6d-6bb9bd380s01', 'fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 26.4, 72.0, 42.5, 6.5, FALSE, 82.5);

-- 9. CropRecommendations & 10. DiseaseReports
INSERT INTO crop_recommendations (farm_id, recommended_crop, confidence_score, soil_ph, soil_moisture, temperature) VALUES
('fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 'Tomato (Hybrid Rome)', 96.4, 6.5, 42.5, 26.4);

INSERT INTO disease_reports (farm_id, image_url, disease_name, severity, treatment, prevention) VALUES
('fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 'https://storage.agrisense.io/leaf_01.jpg', 'Early Blight (Alternaria solani)', 'Moderate (55%)', 'Apply copper fungicide twice weekly.', 'Avoid overhead watering.');

-- 11. IrrigationLogs
INSERT INTO irrigation_logs (farm_id, device_id, action, water_volume_liters, duration_minutes) VALUES
('fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380d01', 'PUMP_ON', 350.0, 20);

-- 12. Notifications, 13. Analytics, 14. Reports, 15. WeatherHistory, 16. Settings, 17. ActivityLogs
INSERT INTO notifications (user_id, title, message, severity) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Low Soil Moisture Alert', 'Plot A moisture dropped to 32%. Automated drip pump scheduled.', 'WARNING');

INSERT INTO analytics (farm_id, total_water_saved_liters, yield_increase_percent, ai_accuracy_percent) VALUES
('fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 14250.00, 18.50, 96.20);

INSERT INTO reports (user_id, report_title, report_type, file_url) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Monthly Farm Telemetry Summary', 'PDF', 'https://storage.agrisense.io/reports/jan_2026.pdf');

INSERT INTO weather_history (farm_id, temperature, humidity, precipitation_mm) VALUES
('fa0ebc99-9c0b-4ef8-bb6d-6bb9bd380fa1', 27.2, 68.0, 0.0);

INSERT INTO settings (user_id, setting_key, setting_value, description) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'auto_irrigation_enabled', 'true', 'Automated drip pump override based on soil moisture threshold');

INSERT INTO activity_logs (user_id, action, ip_address) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'USER_LOGIN', '192.168.1.100');
