# AgriSense AI - Relational Database Specification

## Database Engine
- **Database System**: PostgreSQL / Supabase
- **Primary Keys**: UUID v4 / BIGSERIAL
- **Timezone**: UTC

## Entity Relationship Model (17 Tables)

```
[users] ───< [managers]
   │    ───< [farmers]
   │
   └───< [farms] ───< [farm_assignments]
           │
           ├───< [devices] ───< [sensors] ───< [sensor_readings]
           │        │
           │        └───< [irrigation_logs]
           │
           ├───< [crop_recommendations]
           ├───< [disease_reports]
           ├───< [analytics]
           └───< [weather_history]

[users] ───< [notifications]
[users] ───< [reports]
[users] ───< [settings]
[users] ───< [activity_logs]
```

## Data Dictionary Highlights

### 1. `sensor_readings` (Time-Series Table)
- `id`: BIGSERIAL (Primary Key)
- `farm_id`: UUID (Foreign Key -> `farms.id`)
- `temperature`: NUMERIC(5,2)
- `humidity`: NUMERIC(5,2)
- `soil_moisture`: NUMERIC(5,2)
- `soil_ph`: NUMERIC(4,2)
- `rain_detected`: BOOLEAN
- `water_tank_level`: NUMERIC(5,2)
- `recorded_at`: TIMESTAMP WITH TIME ZONE

### Indexing Strategy
- `idx_sensor_readings_time`: Composite index on `(farm_id, recorded_at DESC)` for sub-millisecond telemetry query execution.
