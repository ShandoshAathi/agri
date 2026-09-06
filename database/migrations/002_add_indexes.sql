-- Migration 002: Add Time-Series & Query Performance Indexes

CREATE INDEX IF NOT EXISTS idx_telemetry_recorded_at ON telemetry_logs (recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_telemetry_device_id ON telemetry_logs (device_id);
CREATE INDEX IF NOT EXISTS idx_farms_manager ON farms (manager_id);
