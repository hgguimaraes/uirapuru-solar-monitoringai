-- Create plants table
CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    capacity DECIMAL NOT NULL,
    units INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create units table
CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    plant_id INTEGER REFERENCES plants(id),
    name VARCHAR(255) NOT NULL,
    capacity DECIMAL NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create energy_data table
CREATE TABLE energy_data (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER REFERENCES units(id),
    plant_id INTEGER REFERENCES plants(id),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    production DECIMAL NOT NULL,
    efficiency DECIMAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create climate_data table
CREATE TABLE climate_data (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER REFERENCES units(id),
    plant_id INTEGER REFERENCES plants(id),
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    temperature DECIMAL NOT NULL,
    humidity DECIMAL NOT NULL,
    irradiance DECIMAL NOT NULL,
    precipitation DECIMAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create maintenance_events table
CREATE TABLE maintenance_events (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER REFERENCES units(id),
    plant_id INTEGER REFERENCES plants(id),
    type VARCHAR(100) NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create alerts table
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    unit_id INTEGER REFERENCES units(id),
    plant_id INTEGER REFERENCES plants(id),
    type VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP WITH TIME ZONE
);