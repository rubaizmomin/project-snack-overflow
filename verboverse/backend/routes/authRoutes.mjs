import express from 'express';
import { signup } from '../controllers/authController.mjs';
const router = express.Router();
import sign from 'jsonwebtoken';
import json from 'body-parser';

// auth routes
// api/signup

router.post('/signup', signup);
