const mongoose = require('mongoose')


var Data = mongoose.model('Data', {
    Name: { type: String },
    No:{type:Number},
    date: { type: String },
    time: { type: String },
    milk: { type: Number },
    fat: { type: Number },
    snf: { type: Number },
    rate: { type: Number },
    t_rate: { type: Number },
    ehours:{type:String},
    hours:{type:String},
    type:{type:String},
    UId:{type:String}
});
module.exports = {Data};