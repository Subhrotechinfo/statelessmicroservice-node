var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');
const { mongooseConnect } = require('./config/mongoose');
var route = require('./router/router');
var app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

global.appRoot = path.resolve(__dirname);

app.use('/public', express.static(__dirname + '/public'));

app.use('/api', route);
app.get('/hello', (req, res) => {
    res.send('Hello world');
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
mongooseConnect();
app.listen(3000, () => console.log('Server up and running in port 3000'));

