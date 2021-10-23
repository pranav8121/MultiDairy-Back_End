const mongoose = require('mongoose')

var Adv = mongoose.model('AdvSupply', {
    type: { type: String },
    addAmount: { type: Number },
    cutAmount: { type: Number },
    date: { type: String },
    No: { type: String },
    rate: { type: Number },
    bag: { type: Number },
    Name: { type: String },
    UId: { type: String }
});
module.exports = { Adv };