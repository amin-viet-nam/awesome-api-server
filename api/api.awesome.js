module.exports = (router) => {

    router.get('/', (req, res, next) => {
        res.send('Awesome');
    });

    router.get('/ping', (req, res, next) => {
        res.send('pong');
    });

    router.get('/cats', (req, res, next) => {
        return req.service
            .resource
            .getAppCategories()
            .then(resources => {
                res.send(resources);
            })
            .catch(next);
    });

    router.post('/jwt-firebase', (req, res, next) => {
        let firebaseToken = req.body.firebaseToken || '';

        return req.service
            .user
            .loginByFirebaseToken(firebaseToken)
            .then((user) => {
                res.send(user)
            })
            .catch(next);
    });
};