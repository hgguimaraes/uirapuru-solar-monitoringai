import express from 'express';
import pool from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM plants ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plants' });
  }
});

router.get('/overview', async (req, res) => {
  try {
    const query = `
      WITH plant_metrics AS (
        SELECT 
          p.id,
          p.name,
          COALESCE(SUM(e.production), 0) as current_production,
          COUNT(DISTINCT CASE WHEN a.status = 'active' THEN a.id END) as active_alerts,
          COUNT(DISTINCT CASE WHEN m.status = 'in-progress' THEN m.id END) as maintenance_count
        FROM plants p
        LEFT JOIN energy_data e ON e.plant_id = p.id 
          AND e.timestamp >= NOW() - INTERVAL '1 hour'
        LEFT JOIN alerts a ON a.plant_id = p.id 
          AND a.status = 'active'
        LEFT JOIN maintenance_events m ON m.plant_id = p.id 
          AND m.status = 'in-progress'
        GROUP BY p.id, p.name
      )
      SELECT 
        id,
        name,
        current_production as "currentProduction",
        active_alerts as "activeAlerts",
        maintenance_count as "maintenanceCount"
      FROM plant_metrics
      ORDER BY name
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plants overview' });
  }
});

export default router;