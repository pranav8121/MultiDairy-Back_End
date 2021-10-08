const mongoose = require('mongoose')


var User = mongoose.model('Credential', {
    username: { type: String },
    password: { type: String },
    Name: { type: String },
});
module.exports = { User };