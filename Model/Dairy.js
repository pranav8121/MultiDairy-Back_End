const mongoose = require('mongoose')


var DairyReg = mongoose.model('DairyReg', {
    "date":{type:String},
    "type":{type:String},
    "etype":{type:String},
    "ehours":{type:String},
    "hours":{type:String},
    "milk":{type:Number},
    "snf":{type:Number},
    "fat":{type:Number},
    "good":{type:String},
    "rate":{type:Number},
    "totalRate":{type:Number},
    "dairyMilk":{type:Number},
    "dairyTotalRate":{type:Number},
    "dairyRate":{type:Number},
    "extraMilk":{type:Number},
    "extraTotalRate":{type:Number},
    "extraRate":{type:Number},
    "UId":{type:String}
});
module.exports = {DairyReg};