'use strict';

let fs = require('fs');
let path = require('path');
let basename = path.basename(module.filename);

let express = require('express');
let router = express.Router();

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0)
            && (file !== basename)
            && (file.slice(-3) === '.js')
            && file.startsWith('api.');
    })
    .forEach(((file) => {
        let fn = require(path.join(__dirname, file));
        if (typeof fn == 'function') {
            fn(router);
        }
    }));

module.exports = router;