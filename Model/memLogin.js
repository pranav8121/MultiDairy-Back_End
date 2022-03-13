const mongoose = require('mongoose')


var MemberDetails = mongoose.model('MemCredential', {
    username: { type: String },
    password: { type: String },
    Name: { type: String },
    Id: { type: String },
});
module.exports = { MemberDetails };