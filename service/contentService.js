const BaseService = require('./_baseService');

class ContentService extends BaseService {
    constructor(serviceProvider, mongoDb) {
        super(serviceProvider, mongoDb);
    }

    getContents(filter) {
        const page = filter.page;
        const size = filter.size;
        const language = filter.language;

        return this.mongo
            .collection('content')
            .aggregate([
                {
                    $match: {
                        language
                    }
                },
                {
                    $sort: {
                        _id: -1
                    }
                },
                {
                    $skip: page * size
                },
                {
                    $limit: size
                },
                {
                    $sample: {
                        size
                    }
                }
            ])
            // .skip(page * size)
            // .limit(size)
            .toArray();
    }
}

module.exports = ContentService;