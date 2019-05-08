let rp = require('request-promise');
let cors = require('cors');

let express = require('express');
let app = express();

let bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('*', function (req, res) {
    const path = req.path;
    const query = req.query;
    const body = req.body;
    const header = req.headers;

    const options = {
        method: 'GET',
        uri: 'https://omg-server.herokuapp.com' + path,
        qs: query,
        // headers: header,
        body: body,
        json: true,
        rejectUnauthorized: false
    };

    rp(options)
        .then(result => {
            console.log(options);
            console.log(result);
            res.send(result);
        })
});

app.post('*', function (req, res) {
    const path = req.path;
    const query = req.query;
    const body = req.body;
    const header = req.headers;

    const options = {
        method: 'POST',
        uri: 'https://omg-server.herokuapp.com' + path,
        qs: query,
        // headers: header,
        body: body,
        json: true,
        rejectUnauthorized: false
    };

    rp(options)
        .then(result => {
            console.log(options);
            console.log(result);
            res.send(result);
        })
});

app.listen(4000);