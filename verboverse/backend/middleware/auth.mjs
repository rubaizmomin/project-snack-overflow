import { ErrorResponse } from '../utils/errorResponse.mjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';

// check if user is authenticated
export async function isAuthenticated (req, res, next) {
    const token = req.cookies.token;
    // const authtoken = req.signedCookies.token;
    console.log("why"); 
    console.log(req.cookies);
    console.log(token);
    if (!token) {
        return next(new ErrorResponse('You must log in.', 401));
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        console.log(req.user);
        next();
    } catch (error) {
        return next(new ErrorResponse('You must log in', 401));
    }
}

// middleware for admin 
export function isAdmin (req, res, next) {
    if (req.user.role === 'user') { 
        return next( new ErrorResponse('Access denied, you must be an admin', 401));
    }
    next(); 
}



