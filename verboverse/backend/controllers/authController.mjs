import User from '../models/userModel.mjs';
import { ErrorResponse } from '../utils/errorResponse.mjs';

export async function signup (req, res, next) { 
    const {email} = req.body;
    
    const userExist = await User.findOne({email});
    if (userExist) {
        return next(new ErrorResponse('Email already exists', 400));
    }
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }

}

export async function signin (req, res, next) {
    try {
        const {email, password} = req.body; 
        if (!email) {
            return next(new ErrorResponse('Please enter an email', 403));
        } 
        if (!password) {
            return next(new ErrorResponse('Please enter a password', 403));
        }

        const user = await User.findOne({email}); 
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 400));
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 400));
        }

        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}

const sendTokenResponse = async(user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus)
    .cookie('token', token, {
        maxAge: 60*60*1000, // 1 hour
        httpOnly: true
    })
    .json({
        success: true,
        id: user._id,
        role:user.role, 
    })
}

// logout 
export function logout (req, res, next) {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: "logged out"
    })
}

// user profile
export async function userProfile(req, res, next) { 
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({
        success: true,
        user
    })
}