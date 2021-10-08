const mongoose = require('mongoose')


var Data = mongoose.model('Data', {
    Name: { type: String },
    No:{type:Number},
    date: { type: String },
    time: { type: String },
    milk: { type: String },
    fat: { type: String },
    snf: { type: String },
    rate: { type: String },
    t_rate: { type: String },
    ehours:{type:String},
    hours:{type:String},
    type:{type:String},
    UId:{type:String}
});
module.exports = {Data};