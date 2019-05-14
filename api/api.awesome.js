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

    router.get('/api/content/:id', (req, res, next) => {
        req.service
            .content
            .getContentById(parseInt(req.params.id || 0))
            .then((value) => {
                res.send(value);
            }).catch(next);
    });

    router.post('/api/content/recommend', (req, res, next) => {
        res.send({});
    });

    router.post('/api/content/view', (req, res, next) => {
        res.send({});
    });

    router.post('/api/content/referer', (req, res, next) => {
        res.send({});
    });

    router.post('/api/user/share', (req, res, next) => {
        res.send({});
    });

    router.post('/api/content/push_recommend', (req, res, next) => {
        res.send({});
    });
};