const express = require('express');
var router = express.Router();

var { DairyReg } = require("../Model/Dairy");

router.get('/GetDairyReg/:UId', (req, res) => {

    DairyReg.find({ "UId": req.params.UId }, (err, doc) => {
        if (doc.length > 0) {
            res.json(doc)
        }
        else {
            res.status(501).json("No Data Available!!")
        }
    });
});

router.post('/CheckDairyReg', (req, res) => {
    DairyReg.find({ "UId": req.body.UId, "date": req.body.date, "etype": [req.body.etype,req.body.etype2], "ehours": req.body.ehours }, (err, doc) => {
        if (doc.length == 0) {
            res.json("Valid");
        } else {
            return res.status(501).json("Entry Already Done!!");
        }
    });
});

router.post('/AddDairyReg', (req, res) => {
    var daryreg = new DairyReg({
        date: req.body.date,
        type: req.body.type,
        etype: req.body.etype,
        ehours: req.body.ehours,
        hours: req.body.hours,
        milk: req.body.milk,
        snf: req.body.snf,
        fat: req.body.fat,
        good: req.body.good,
        rate: req.body.rate,
        totalRate: req.body.totalRate,
        dairyMilk: req.body.dairyMilk,
        dairyTotalRate: req.body.dairyTotalRate,
        salesTotalRate:req.body.salesTotalRate,
        salesTotalMilk:req.body.salesTotalMilk,
        dairyRate: req.body.dairyRate,
        extraMilk: req.body.extraMilk,
        extraTotalRate: req.body.extraTotalRate,
        extraRate: req.body.extraRate,
        UId: req.body.UId
    });
    daryreg.save((err, doc) => {
        if (!err) {
            res.json({ msg: "Data Added Successfully", data: doc })
        } else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!");
        }
    });
});



module.exports = router;