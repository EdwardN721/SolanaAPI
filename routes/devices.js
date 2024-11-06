import express from 'express';
import { getDevice } from '../controllers/deviceControllers.js';

const router = express.Router();

router.get('/:deviceId', getDevice);

// Otras rutas: crear actualizar, eliminar
export default router;