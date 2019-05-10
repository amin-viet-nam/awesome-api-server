class BaseService {
    constructor(serviceProvider, mongoDb) {
        this.services = serviceProvider;
        this.mongo = mongoDb;
    }
}

module.exports = BaseService;