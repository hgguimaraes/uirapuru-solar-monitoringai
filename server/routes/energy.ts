import express from 'express';
import pool from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { plantId } = req.query;
    
    const currentQuery = `
      SELECT COALESCE(SUM(production), 0) as current_production
      FROM energy_data
      WHERE timestamp >= NOW() - INTERVAL '1 hour'
      ${plantId ? 'AND plant_id = $1' : ''}
    `;

    const historyQuery = `
      SELECT 
        date_trunc('hour', timestamp) as timestamp,
        SUM(production) as production,
        AVG(efficiency) as efficiency
      FROM energy_data
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
      currentProduction: current.rows[0].current_production,
      history: history.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch energy data' });
  }
});

export default router;