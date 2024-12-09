-- Dimension Tables

CREATE TABLE dim_time (
    time_id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    hour INTEGER NOT NULL,
    day INTEGER NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    is_weekend BOOLEAN NOT NULL,
    season VARCHAR(10) NOT NULL
);

CREATE TABLE dim_location (
    location_id SERIAL PRIMARY KEY,
    plant_id INTEGER REFERENCES plants(id),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL,
    longitude DECIMAL,
    timezone VARCHAR(50) NOT NULL
);

CREATE TABLE dim_units (
    unit_id SERIAL PRIMARY KEY,
    plant_id INTEGER REFERENCES plants(id),
    unit_name VARCHAR(255) NOT NULL,
    capacity DECIMAL NOT NULL,
    installation_date DATE NOT NULL,
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    technology_type VARCHAR(100)
);

-- Fact Tables

CREATE TABLE fact_energy (
    energy_fact_id SERIAL PRIMARY KEY,
    time_id INTEGER REFERENCES dim_time(time_id),
    location_id INTEGER REFERENCES dim_location(location_id),
    unit_id INTEGER REFERENCES dim_units(unit_id),
    production DECIMAL NOT NULL,
    efficiency DECIMAL NOT NULL,
    target_production DECIMAL,
    variance_from_target DECIMAL,
    cost_savings DECIMAL
);

CREATE TABLE fact_climate (
    climate_fact_id SERIAL PRIMARY KEY,
    time_id INTEGER REFERENCES dim_time(time_id),
    location_id INTEGER REFERENCES dim_location(location_id),
    temperature DECIMAL NOT NULL,
    humidity DECIMAL NOT NULL,
    irradiance DECIMAL NOT NULL,
    precipitation DECIMAL NOT NULL,
    cloud_cover DECIMAL,
    wind_speed DECIMAL
);

CREATE TABLE fact_maintenance (
    maintenance_fact_id SERIAL PRIMARY KEY,
    time_id INTEGER REFERENCES dim_time(time_id),
    unit_id INTEGER REFERENCES dim_units(unit_id),
    maintenance_type VARCHAR(100) NOT NULL,
    duration_hours DECIMAL NOT NULL,
    cost DECIMAL,
    parts_replaced TEXT[],
    technician_count INTEGER,
    is_scheduled BOOLEAN
);

-- Analysis Views

CREATE VIEW vw_daily_performance AS
SELECT 
    dt.timestamp::DATE as date,
    dl.city,
    dl.state,
    SUM(fe.production) as total_production,
    AVG(fe.efficiency) as avg_efficiency,
    SUM(fe.cost_savings) as total_savings,
    AVG(fc.temperature) as avg_temperature,
    AVG(fc.irradiance) as avg_irradiance,
    COUNT(fm.maintenance_fact_id) as maintenance_events
FROM fact_energy fe
JOIN dim_time dt ON fe.time_id = dt.time_id
JOIN dim_location dl ON fe.location_id = dl.location_id
LEFT JOIN fact_climate fc ON fe.time_id = fc.time_id AND fe.location_id = fc.location_id
LEFT JOIN fact_maintenance fm ON fe.time_id = fm.time_id
GROUP BY dt.timestamp::DATE, dl.city, dl.state
ORDER BY dt.timestamp::DATE;