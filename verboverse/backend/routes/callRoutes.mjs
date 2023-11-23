import express from 'express';
import {  createCall, getCall, getCalls, addOfferCandidates, addOffer} from '../controllers/callController.mjs';
// import { isAuthenticated } from '../middleware/auth.mjs';
const router = express.Router();

router.post('/createCall', createCall);
router.post('/addOfferCandidates', addOfferCandidates); 
router.post('/addOffer', addOffer); 
router.get('/getCall', getCall);
router.get('/getCalls', getCalls);

export const callRoutes = router;