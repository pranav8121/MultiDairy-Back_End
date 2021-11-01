const express = require('express');
var router = express.Router();

var { Bill } = require("../Model/bill");


// FIND BILL
router.get('/findBill/:UId/:inv_no/:No', (req, res) => {
    Bill.find({ "inv_no": req.params.inv_no, "UId": req.params.UId, "No": req.params.No }, (err, doc) => {
        if (doc.length > 0) {
            res.json(doc);
        } else {
            return res.status(501).json("Bill Not Generated!!");
        }
    });
});


router.post('/postBill', (req, res) => {

    var newBill = Bill({
        Name: req.body.Name,
        No: req.body.No,
        adv: req.body.adv,
        bank: req.body.bank,
        supply: req.body.supply,
        share: req.body.share,
        inv_no: req.body.inv_no,
        from: req.body.from,
        to: req.body.to,
        totalmilk: req.body.totalmilk,
        morTotalmilk: req.body.morTotalmilk,
        eveTotalmilk: req.body.eveTotalmilk,
        totalRate: req.body.totalRate,
        cutting: req.body.cutting,
        subAmount: req.body.subAmount,
        mortotalRate: req.body.mortotalRate,
        evetotalRate: req.body.evetotalRate,
        UId: req.body.UId,
    });
    newBill.save((err, doc) => {
        if (!err) {
            res.json({ msg: "Bill Added Successfully", data: doc })
        }
        else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!");
        }
    })
})



// Payment Register
router.post('/PaymentBill', (req, res) => {
    Bill.find({ "UId": req.body.UId }, (err, doc) => {
        if (doc.length > 0) {
            var newDoc = []
            // var existDoc = []
            var ifExist
            doc.forEach(ele => {
                ifExist = newDoc.some(val => { if (val.from == ele.from) return val; });
                if (!ifExist) {
                    let temp = {
                        from: ele.from,
                        to: ele.to,
                        adv: ele.adv,
                        share: ele.share,
                        bank: ele.bank,
                        supply: ele.supply,
                        totalmilk: ele.totalmilk,
                        morTotalmilk: ele.morTotalmilk,
                        eveTotalmilk: ele.eveTotalmilk,
                        totalRate: ele.totalRate,
                        cutting: ele.cutting,
                        subAmount: ele.subAmount,
                        mortotalRate: ele.mortotalRate,
                        evetotalRate: ele.evetotalRate
                    }
                    newDoc.push(temp)
                } else {
                    newDoc.forEach(val => {
                        if (val.from == ele.from && val.to == ele.to) {                          
                            val.from = val.from,
                                val.to = val.to,
                                val.adv = (parseFloat(val.adv) + parseFloat(ele.adv)).toFixed(2),
                                val.share = (parseFloat(val.share) + parseFloat(ele.share)).toFixed(2),
                                val.bank = (parseFloat(val.bank) + parseFloat(ele.bank)).toFixed(2),
                                val.supply = (parseFloat(val.supply) + parseFloat(ele.supply)).toFixed(2),
                                val.totalmilk = (parseFloat(val.totalmilk) + parseFloat(ele.totalmilk)).toFixed(2),
                                val.morTotalmilk = (parseFloat(val.morTotalmilk) + parseFloat(ele.morTotalmilk)).toFixed(2),
                                val.eveTotalmilk = (parseFloat(val.eveTotalmilk) + parseFloat(ele.eveTotalmilk)).toFixed(2),
                                val.totalRate = (parseFloat(val.totalRate) + parseFloat(ele.totalRate)).toFixed(2),
                                val.cutting = (parseFloat(val.cutting) + parseFloat(ele.cutting)).toFixed(2),
                                val.subAmount = (parseFloat(val.subAmount) + parseFloat(ele.subAmount)).toFixed(2),
                                val.mortotalRate = (parseFloat(val.mortotalRate) + parseFloat(ele.mortotalRate)).toFixed(2),
                                val.evetotalRate = (parseFloat(val.evetotalRate) + parseFloat(ele.evetotalRate)).toFixed(2)
                        }
                    });
                }
            });
            res.json({ "data": newDoc});
        } else {
            return res.status(501).json("No Bill Generated!!");
        }
    });
});

router.post('/FindPaymentReg', (req, res) => {
    Bill.find({ "UId": req.body.UId, "from":req.body.from,"to":req.body.to }, (err, doc) => {
        if (doc) {
            res.json(doc);
        } else {
            return res.status(501).json("Something Wrong");
        }
    });
});

module.exports = router;