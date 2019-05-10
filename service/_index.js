'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const common = require('../util/common');

class ServiceProvider {
    constructor(namespace) {

    }

    init() {
        const self = this;
        fs
            .readdirSync(__dirname)
            .filter((file) => {
                return (file.indexOf('.') !== 0)
                    && (file !== basename)
                    && (file.slice(-3) === '.js')
                    && file.endsWith('Service.js');
            })
            .forEach((file) => {
                const moduleName = file.replace('.js', '').replace('Service', '');
                const fn = require(path.join(__dirname, file));
                if (typeof fn == 'function') {
                    self[moduleName] = fn(self.dbs, self);
                    if (!self.repo) {
                        self.repo = self[moduleName].repo;
                    }
                }

            });

        return self;
    }
}

const services = {};
//const service = null;
module.exports = (namespace) => {
    const index = common.getRandomInt(0, 10);
    const key = `_${namespace}_${index}`;
    console.log(`init service namespace ${key}`);
    return services[key] ? services[key] : (services[key] = new ServiceProvider(key).init());
};