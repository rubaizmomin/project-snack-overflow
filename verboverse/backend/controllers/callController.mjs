import Call from '../models/callModel.mjs';
import { ErrorResponse } from '../utils/errorResponse.mjs';

export async function createCall (req, res, next) {
    try {
        // const {offer, answer, offerCandidates, answerCandidates} = req.body;
        const call = await Call.create({});
        res.status(201).json({
            success: true,
            call
        });
    } catch (error) {
        next(error);
    }
}

export async function getCall (req, res, next) {
    try {
        const call = await Call.findById(req.params.id);
        if (!call) {
            return next(new ErrorResponse('Call not found', 404));
        }
        res.status(200).json({
            success: true,
            call
        });
    } catch (error) {
        next(error);
    }
}

export async function getCalls (req, res, next) {
    try {
        const calls = await Call.find();
        res.status(200).json({
            success: true,
            calls
        });
    } catch (error) {
        next(error);
    }
}

export async function addOfferCandidates (req, res, next) {
    try {
        const {offerCandidates} = req.body;
        const call = await Call.findById(req.params.id);
        if (!call) {
            return next(new ErrorResponse('Call not found', 404));
        }
        call.offerCandidates.push(offerCandidates);
        await call.save();
        res.status(201).json({
            success: true,
            call
        });
    } catch (error) {
        next(error);
    }
}

export async function addOffer (req, res, next) {
    try {
        const {offer} = req.body;
        const call = await Call.findById(req.params.id);
        if (!call) {
            return next(new ErrorResponse('Call not found', 404));
        }
        call.offer = offer;
        await call.save();
        res.status(201).json({
            success: true,
            call
        });
    } catch (error) {
        next(error);
    }
}


