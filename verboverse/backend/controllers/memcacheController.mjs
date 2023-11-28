import memcachedClient from "../models/memcache.mjs";
import { ErrorResponse } from '../utils/errorResponse.mjs';

let keyCounter = 1;

export async function cacheData (req, res, next) {
    const key = `${keyCounter++}`;

    console.log(key)
    try {
        const value = req.body.value;
        await memcachedClient.set(key, value, function (error, result) {
            if (error) {
                console.error(error);
            }
            console.log(result);
        } , {expires: 600});
        console.log("HI")

    } catch (error) {
        next(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function getData (req, res, next) {
    const {key} = req.body.key;
    const cachedData = await memcachedClient.get(key);
    if (cachedData.value) {
        res.send(JSON.parse(cachedData.value.toString()));
    } else {
        res.send('No data found in the cache');
    }
}



