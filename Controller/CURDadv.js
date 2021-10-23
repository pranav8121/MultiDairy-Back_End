const express = require('express');
var router = express.Router();

var { Adv } = require("../Model/advance");


router.post('/postBill', (req, res) => {
    var entry = Adv({
        type: req.body.type,
        addAmount: req.body.addAmount,
        cutAmount: req.body.cutAmount,
        date: req.body.date,
        No: req.body.No,
        rate: req.body.rate,
        bag: req.body.bag,
        Name: req.body.Name,
        UId: req.body.UId
    });
    entry.save((err, doc) => {
        if (!err) {
            res.json({ msg: "Entry Added Successfully", data: doc })
        }
        else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!");
        }
    })
})



router.post('/GetEntry', (req, res) => {
    Bill.find({ "UId": req.body.UId, "No": req.body.No, "type": req.body.type }, (err, doc) => {
        if (doc.length > 0) {
            res.json(doc);
        } else {
            return res.status(501).json("No ENtries Yet!!");
        }
    });
});


module.exports = router;