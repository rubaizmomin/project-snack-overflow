import mongoose from 'mongoose';
import offerSchema from './offerModel.mjs';
import answerSchema from './answerModel.mjs';

const callSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    offer: {
        sdp: {
            type: String,
            required: true,
            minlength: 3
        },
        type: {
            type: String,
            required: true,
        },
    },
    answer: {
        sdp: {
            type: String,
            required: true,
            minlength: 3
        },
        type: {
            type: String,
            required: true,
        },
    },
    offerCandidates: [offerSchema],
    answerCandidates: [answerSchema],
}); 

export default mongoose.models?.Call || mongoose.model('Call', callSchema);
