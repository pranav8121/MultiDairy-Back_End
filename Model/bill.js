const mongoose = require('mongoose')

var Bill = mongoose.model('Bill', {
    Name: { type: String },
    No: { type: Number },
    totalRate: { type: Number },
    cutting: { type: Number },
    subAmount: { type: Number },
    adv: { type: Number },
    bank: { type: Number },
    supply: { type: Number },
    share: { type: Number },
    inv_no: { type: String },
    from: { type: String },
    to: { type: String },
    UId: { type: String }

});
module.exports = { Bill };