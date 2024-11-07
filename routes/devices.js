import express from 'express';
import { getDevice } from '../controllers/deviceControllers.js';

const router = express.Router();

router.get('/:registryName/:deviceName', async (req, res) => {
  const { registryName, deviceName } = req.params;

  try {
    const deviceData = await getDevice(req, res);
    res.json(deviceData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la información del dispositivo' });
  }
});

export default router;