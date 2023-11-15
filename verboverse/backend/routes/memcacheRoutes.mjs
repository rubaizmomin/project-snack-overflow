import express from 'express';
import { getFromCache, setToCache } from '../controllers/cacheController.mjs';
const router = express.Router();

router.post('/addText', setToCache); 
router.get('/translate', getFromCache);

export const memcacheRoutes = router;