require('dotenv').config();
const express = require('express');
const deviceRoutes = require('./routes/devices');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

// Rutas
app.use('/api/devices', deviceRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${port}`);
});

