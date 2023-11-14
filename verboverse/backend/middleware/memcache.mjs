import Memcached from 'memcached';

const memcached = new Memcached('localhost:11211');

const cacheMiddleware = (req, res, next) => {
    const key = req.originalUrl || req.url;

    // Attempt to retrieve data from the cache
    memcached.get(key, (err, data) => {
        if (err) {
            console.error('Memcached error:', err);
            next(); // Continue to the route handler even if there's an error with Memcached
        } else if (data) {
            // If data is found in the cache, send it as the response
            res.send(data);
        } else {
            // If data is not in the cache, proceed to the route handler
            next();
        }
    });
};

export default cacheMiddleware;

