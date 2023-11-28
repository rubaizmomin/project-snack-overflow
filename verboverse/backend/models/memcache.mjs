import Memcached from 'memjs';

// Initialize Memcached
const memcachedClient = Memcached.Client.create(process.env.MEMCACHIER_SERVERS, {
    failover: true,  // default: false
    timeout: 1,      // default: 0.5 (seconds)
    keepAlive: true  // default: false
}); 

export default memcachedClient;