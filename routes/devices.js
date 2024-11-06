import express from 'express';
import deviceController from '../controllers/deviceControllers';

const router = express.Router();

router.get('/:deviceId', deviceController.getDevice);

// Otras rutas: crear actualizar, eliminar
module.exports = router;