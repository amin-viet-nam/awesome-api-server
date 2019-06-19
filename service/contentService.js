const BaseService = require('./_baseService');

class ContentService extends BaseService {
    constructor(serviceProvider, mongoDb) {
        super(serviceProvider, mongoDb);
    }

    getContentById(id){
        return this.mongo
            .collection('content')
            .find({
                _id: id
            })
            .toArray()
            .then((results) => results.pop() || {});
    }

    getContentsRandom(filter) {
        const page = filter.page;
        const size = filter.size;
        let language = filter.language;

        if (['my','hi'].includes(language )) {
            language = "en";
        }

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
                        trending: -1,
                        is_new: -1,
                        _id: -1,
                    }
                },
                {
                    $skip: page * size
                },
                {
                    $limit: size
                }
            ])
            .toArray();
    }
}

module.exports = ContentService;