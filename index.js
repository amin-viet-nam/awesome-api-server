require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const serviceFactory = require('./service/_serviceFactory')();
serviceFactory.init().then(serviceInstance => {

    const app = express();

    app.use(require('./util/requestTimer'));
    app.use((req, res, next) => {
        req.service = serviceInstance;
        next();
    });
    app.use(cors());
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use('/', [require('./api/_index')]);
    app.use(require('./util/errorHandler')({debug: true}));

    app.listen(4000);
});