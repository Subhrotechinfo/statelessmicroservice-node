const mongoose = require('mongoose');
// var AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const postSchema = new Schema({
    postName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
var Posts = mongoose.model('post', postSchema, 'posts');
module.exports = {
    Posts
}








