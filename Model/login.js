const mongoose = require('mongoose')


var User = mongoose.model('Credential', {
    username: { type: String },
    password: { type: String },
    Name: { type: String },
    multi: { type: Number },
});
module.exports = { User };