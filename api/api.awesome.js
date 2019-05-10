module.exports = (router) => {

    router.get('/', (req, res, next) => {
        res.send('Awesome');
    });

    router.get('/ping', (req, res, next) => {
        res.send('pong');
    });

    router.get('/api/content', (req, res, next) => {
        req.service
            .content
            .getContents({
                page: parseInt(req.query.page || 1),
                size: 25,
                language: req.query.language
            })
            .then((value) => {
                res.send(value);
            }).catch(next);
    });

    router.post('*', (req, res, next) => {

    });
};