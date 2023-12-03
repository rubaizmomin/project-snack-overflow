import User from '../models/userModel.mjs';
import { ErrorResponse } from '../utils/errorResponse.mjs';

export async function signup (req, res, next) { 
    const {email} = req.body.email;
    
    const userExist = await User.findOne({email: email});
    if (userExist) {
        return res.status(400).json({
            success: false,
            message: "User already exists"
        })
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
        const email = req.body.email;
        const password = req.body.password;

        if (!email) {
            return res.status(403).json({
                success: false,
                message: "Please enter an email"
            })
        } 
        if (!password) {
            return res.status(403).json({
                success: false,
                message: "Please enter a password"
            })
        }

        const user = await User.findOne({email: email}); 
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            })
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        try {
            sendTokenResponse(user, 200, res);
        } catch (error) {
            next(error);
        }
}

const sendTokenResponse = async(user, codeStatus, res) => {
    const token = await user.getJwtToken();
    res.status(codeStatus)
    // .cookie('token', token, {
    //     maxAge: 60*60*1000, // 1 hour
    //     httpOnly: true,
    //     sameSite: 'None'
    //     // signed: true
    // })
    .json({
        success: true,
        id: user._id,
        role:user.role,
        token 
    });
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
    console.log("what's going on");
    const user = await User.findById(req.user._id).select("-password");

    // const authtoken = req.signedCookies.token;
    // console.log("Hi"); 
    // console.log(authtoken);
    res.status(200).json({
        success: true,
        user
    })
}