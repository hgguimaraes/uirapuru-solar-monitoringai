import express from 'express';
import dotenv from 'dotenv';
import plantsRouter from './routes/plants';
import energyRouter from './routes/energy';
import climateRouter from './routes/climate';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/plants', plantsRouter);
app.use('/api/energy', energyRouter);
app.use('/api/climate', climateRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});