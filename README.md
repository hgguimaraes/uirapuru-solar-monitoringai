# Uirapuru Solar Monitoring System

A comprehensive monitoring system for solar power plants with real-time data visualization, predictive analytics, and maintenance tracking.

## Features

- 📊 Real-time monitoring of multiple solar plants
- 🌡️ Environmental data tracking (temperature, irradiance, precipitation)
- ⚡ Energy production analytics
- 🔧 Maintenance scheduling and tracking
- 📱 Responsive design for all devices
- 🤖 AI-powered predictions and anomaly detection

## Tech Stack

- **Frontend:**
  - React with TypeScript
  - TailwindCSS for styling
  - Recharts for data visualization
  - React Query for data fetching
  - TensorFlow.js for AI predictions

- **Backend:**
  - Node.js with Express
  - PostgreSQL database
  - TypeScript for type safety

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/uirapuru-solar-monitoring.git
cd uirapuru-solar-monitoring
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
# Create the database
psql -U postgres
CREATE DATABASE solar_monitoring;
\c solar_monitoring

# Run the schema migrations
psql -U postgres -d solar_monitoring -f server/db/schema.sql
```

4. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

5. Start the development servers:
```bash
# Start the backend server
npm run server

# In a new terminal, start the frontend
npm run dev
```

## Project Structure

```
├── src/                      # Frontend source code
│   ├── components/          # React components
│   ├── api/                 # API client functions
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Utility functions
├── server/                  # Backend source code
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   ├── db/                 # Database setup and queries
│   └── utils/              # Backend utilities
└── public/                 # Static assets
```

## Architecture

### Frontend Architecture

The frontend follows a component-based architecture with React:

1. **Components Layer:**
   - Modular, reusable UI components
   - Each component has a single responsibility
   - Styled with TailwindCSS for consistency

2. **Data Management:**
   - React Query for server state management
   - TypeScript interfaces for type safety
   - Centralized API client for data fetching

3. **Analytics Layer:**
   - TensorFlow.js for real-time predictions
   - Recharts for data visualization
   - Custom hooks for data processing

### Backend Architecture

The backend follows a layered architecture:

1. **API Layer:**
   - RESTful endpoints
   - Request validation
   - Route handlers

2. **Service Layer:**
   - Business logic
   - Data processing
   - External service integration

3. **Data Layer:**
   - PostgreSQL database
   - Optimized queries
   - Data models and relationships

### Database Schema

The database is designed for analytics and real-time monitoring:

1. **Core Tables:**
   - `plants`: Solar plant information
   - `units`: Individual solar units within plants
   - `energy_data`: Production metrics
   - `climate_data`: Environmental data

2. **Operational Tables:**
   - `maintenance_events`: Maintenance records
   - `alerts`: System alerts and notifications

3. **Relationships:**
   - Plants have many units
   - Units have many data points
   - All tables linked for efficient querying

## API Documentation

### Plants Endpoints

```typescript
GET /api/plants
GET /api/plants/:id
GET /api/plants/overview

POST /api/plants
PUT /api/plants/:id
DELETE /api/plants/:id
```

### Energy Data Endpoints

```typescript
GET /api/energy?plantId=:id
POST /api/energy
GET /api/energy/analytics
```

### Climate Data Endpoints

```typescript
GET /api/climate?plantId=:id
POST /api/climate
GET /api/climate/forecast
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details