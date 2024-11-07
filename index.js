import 'dotenv/config';
import express from 'express';
import deviceRoutes from './routes/devices.js';
import path from 'path';

const app = express();
const port = 3000;

// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Utiliza las rutas definidas en devices.js
app.use('/devices', deviceRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});