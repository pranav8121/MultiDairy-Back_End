const mongoose = require('mongoose')


var member = mongoose.model('Members', {
    Name: { type: String },
    engName:{ type: String },
    No: { type: Number },
    type: { type: String },
    Phone:{type:Number},
    UId:{type: String}
});
module.exports = { member };