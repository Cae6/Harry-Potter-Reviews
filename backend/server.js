import express from 'express';
import cors from 'cors';
import HpotterRoutes from './api/Hpotter.route.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/cae6/Harry_Potter_cae6", HpotterRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;