import Memcached from "memcached";

// Initialize Memcached
// const memcachedClient = Memcached.Client.create(process.env.MEMCACHIER_SERVERS, {
//     failover: true,  // default: false
//     timeout: 1,      // default: 0.5 (seconds)
//     keepAlive: true  // default: false
// }); 


console.log(process.env.MEMCACHIER_SERVERS); 

const memcachedClient = new Memcached('localhost:11211');

export default memcachedClient;