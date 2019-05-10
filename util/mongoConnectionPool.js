let MongoClient = require('mongodb').MongoClient;
let dbInstance;

class MongoConnectionPool {
    constructor() {
        this.connectionUrl = process.env.MONGODB_CONNECTION_STRING;
        this.options = {
            numberOfRetries: 5,
            auto_reconnect: true,
            poolSize: 40,
            connectTimeoutMS: 500,
            useNewUrlParser: true
        };
    }

    initConnectionPool() {
        return MongoClient.connect(this.connectionUrl, this.options)
            .then((db) => {
                dbInstance = db;
                return dbInstance;
            });
    }

    getInstance() {
        return new Promise((resolve, reject) => {
            if (!dbInstance) {
                return this.initConnectionPool();
            } else {
                resolve(dbInstance);
            }
        });

    }
}

module.exports = MongoConnectionPool;