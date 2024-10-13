const redis = require("redis")

const Client = redis.createClient({
    url: 'redis://redis-15365.c228.us-central1-1.gce.redns.redis-cloud.com:15365',
    password: 'c8ezoZNUSABZDFDS2SXKuhPycds2jwSV'
})

Client.on('error', (err) => {
    console.error('Redis error:', err);
});

Client.connect()
    .then(() => {
        console.log('Connected to Redis');
    })
    .catch((err) => {
        console.log('Error connecting to Redis:', err);
    });

module.exports = Client