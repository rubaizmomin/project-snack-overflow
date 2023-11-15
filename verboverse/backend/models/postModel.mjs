import mongoose from 'mongoose';
import { objectId } from mongoose.Schema;

const postSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: true, 
    }, 
    postedBy: {
        type: objectId, 
        ref: "User", 
    }, 
}); 

export default mongoose.model("Post", postSchema);