require('dotenv').config();
import express, { json } from 'express';
import deviceRoutes from './routes/devices.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use('/api/devices', deviceRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});