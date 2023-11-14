import postModel from "../models/postModel.mjs";
import { ErrorResponse } from "../utils/errorResponse.mjs";

export async function postText (req, res, next) { 
    const { text, postedBy } = req.body; 
    try { 
        const speechToText = await postModel.create({ text, postedBy: req.user._id });
    }

    catch (error) {
        next(error); 
    }
}



