import express from 'express';
import pool from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { plantId } = req.query;
    
    const currentQuery = `
      SELECT 
        AVG(temperature) as temperature,
        AVG(irradiance) as irradiance,
        SUM(precipitation) as precipitation
      FROM climate_data
      WHERE timestamp >= NOW() - INTERVAL '1 hour'
      ${plantId ? 'AND plant_id = $1' : ''}
    `;

    const historyQuery = `
      SELECT 
        date_trunc('hour', timestamp) as timestamp,
        AVG(temperature) as temperature,
        AVG(humidity) as humidity,
        AVG(irradiance) as irradiance,
        SUM(precipitation) as precipitation
      FROM climate_data
      WHERE timestamp >= NOW() - INTERVAL '24 hours'
      ${plantId ? 'AND plant_id = $1' : ''}
      GROUP BY date_trunc('hour', timestamp)
      ORDER BY timestamp DESC
    `;

    const [current, history] = await Promise.all([
      pool.query(currentQuery, plantId ? [plantId] : []),
      pool.query(historyQuery, plantId ? [plantId] : [])
    ]);

    res.json({
      currentTemperature: current.rows[0].temperature,
      currentIrradiance: current.rows[0].irradiance,
      currentPrecipitation: current.rows[0].precipitation,
      history: history.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch climate data' });
  }
});

export default router;