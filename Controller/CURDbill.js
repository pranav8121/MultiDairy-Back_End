const express = require('express');
var router = express.Router();

var { Bill } = require("../Model/bill");


// FIND BILL
router.get('/findBill/:UId/:inv_no/:No', (req, res) => {
    Bill.find({ "inv_no": req.params.inv_no, "UId": req.params.UId,"No":req.params.No }, (err, doc) => {
        if (doc.length>0) {
            res.json(doc);
        } else {
            return res.status(501).json("Bill Not Made!!");
        }
    });
});


router.post('/postBill', (req, res) => {
    var newBill = Bill({
        No:req.body.No,
        adv:req.body.adv ,
        bank:req.body.bank ,
        supply:req.body.supply ,
        share:req.body.share ,
        inv_no:req.body.inv_no ,
        from:req.body.from ,
        to:req.body.to ,
        UId:req.body.UId,
    });
    newBill.save((err,doc)=>{
        if (!err) {
            res.json({ msg: "Bill Added Successfully", data: doc })
        }
        else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!");
        }
    })
})


module.exports = router;