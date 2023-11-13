import { User } from '../models/userModel.mjs';
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

exports.signin = async (req, res, next) => {
    try {
        const {email, password} = req.body; 

    } catch (error) {

    }
}
