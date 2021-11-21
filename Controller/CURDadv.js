const express = require('express');
var router = express.Router();

var { Adv } = require("../Model/advance");


router.post('/postEntry', (req, res) => {
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
    Adv.find({ "UId": req.body.UId, "No": req.body.No, "type": req.body.type }, (err, doc) => {
        if (doc.length > 0) {
            res.json(doc);
        } else {
            return res.status(501).json("No Entries Yet!!");
        }
    });
});

router.post('/GetSupplyBalance', (req, res) => {
    var add = 0
    var cut = 0
    Adv.find({ "UId": req.body.UId, "No": req.body.No, "type": 'supply' }, (err, doc) => {
        if (doc.length>0) {
            doc.forEach(ele => {
                if (ele.addAmount) { add = add + parseFloat(ele.addAmount) }
                if (ele.cutAmount) { cut = cut + parseFloat(ele.cutAmount) }
            });
            var balance = add - cut
            res.json(balance);
        }else if(doc.length==0){
            var balance=0
            res.json(balance);
        } else {
            return res.status(501).json("No Entries Yet!!");
        }
    });
});


module.exports = router;