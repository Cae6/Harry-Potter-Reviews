import express from 'express';
import cors from 'cors';
import HpottersRoutes from './api/Hpotters.route.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/cae6/Hpotters", HpottersRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;