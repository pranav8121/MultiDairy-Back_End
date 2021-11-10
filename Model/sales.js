const mongoose = require('mongoose')


var Sales = mongoose.model('Sales', {
    date: { type: String },
    hours: { type: String },
    ehours: { type: String },
    type: { type: String },
    etype: { type: String },
    milk: { type: Number },
    rate: { type: Number },
    totalRate: { type: Number },
    UId:{ type: String }
});
module.exports = { Sales };