'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);

const MongoClient = require('mongodb').MongoClient;

class ServiceFactory {

    constructor() {
        this.mongoConnectionString = process.env.MONGODB_CONNECTION_STRING;
        this.mongoDefaultDatabase = 'awesome';
        this.mongoOptions = {
            numberOfRetries: 5,
            auto_reconnect: true,
            poolSize: 40,
            connectTimeoutMS: 500,
            useNewUrlParser: true
        };
    }

    init() {
        return this.initDatabases()
            .then(client => {
                console.log('init mongodb');
                return client.db(this.mongoDefaultDatabase);
            })
            .then((db) => {
                console.log('init service');
                return this.initServices(db);
            })
    }

    initServices(mongoDb) {
        const self = this;
        return new Promise(resolve => {
            fs
                .readdirSync(__dirname)
                .filter((file) => {
                    return (file.indexOf('.') !== 0)
                        && (file !== basename)
                        && (file.slice(-3) === '.js')
                        && file.endsWith('Service.js')
                        && !file.startsWith('_');
                })
                .forEach((file) => {
                    const moduleName = file.replace('.js', '').replace('Service', '');
                    const fn = require(path.join(__dirname, file));
                    if (typeof fn == 'function') {
                        self[moduleName] = new fn(self, mongoDb);
                    }
                });

            resolve(self);
        });
    }

    initDatabases() {
        return MongoClient.connect(this.mongoConnectionString, this.mongoOptions);
    }
}

module.exports = () => {
    return new ServiceFactory();
};
