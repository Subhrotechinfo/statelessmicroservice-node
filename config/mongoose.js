require('dotenv').config()
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports.mongooseConnect = () => {
    mongoose.connect(process.env.mongoAtlas, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(
        (connect) => {

            console.log('MongoDB connected')
        },
        (err) => { console.log('MongoDB connection error', err) }
    );
    mongoose.set('useCreateIndex', true);
};
