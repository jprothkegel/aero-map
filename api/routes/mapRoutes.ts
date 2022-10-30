import express from 'express';
const router = express.Router();
import { getMapData } from '../controllers/mapController';

router.get('/map', getMapData);

export default router;
