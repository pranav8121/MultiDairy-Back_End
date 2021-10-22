const express = require('express');
var router = express.Router();

var { Data } = require("../Model/data");

// Get Todays Whole Dairy Data
router.get('/GetTodayData/:UId/:ehours/:date',(req,res)=>{
    Data.find({"date":req.params.date, "UId": req.params.UId,"ehours":req.params.ehours}, (err, docs) => {
        if (docs) {
            res.json(docs);
        } else {
            return res.status(501).json("No Data Found !!");
        }
    });
})





// Get Whole Member Data 
router.get('/getallDairyData/:UId', (req, res) => {
    Data.find({ "UId": req.params.UId }, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            return res.status(501).json("User Data Not Found !!");
        }
    });
});




// Get Singel Member Data
router.get('/getalldata/:UId/:No', (req, res) => {
    Data.find({ "UId": req.params.UId, "No": req.params.No }, (err, docs) => {
        if (docs) {
            res.json(docs);
        } else {
            return res.status(501).json("User Data Not Found !!");
        }
    });
});




//Post Data
router.post('/addDataDB', (req, res) => {
    //  fast2sms.sendMessage({
    //     authorization: 'mANeQLvag9lUk1JWYtcXq7M2wShfupjdVIG8x3rODs0Bn5iHTE9ErSGZF76wCRY3telu4iKHQx0UMkhL',
    //     message: `Dear Costomer your ${req.body.date} on ${req.body.time} ${req.body.type} Milk Collection is :
    //     Milk:${req.body.milk}
    //     SNF:${req.body.snf}
    //     Fat:${req.body.fat}
    //     Total rate:${req.body.t_rate}
    //      `,
    //     numbers: [req.body.Phone]
    // })
    var memData = new Data({
        Name: req.body.Name,
        No:req.body.No,
        date: req.body.date,
        time: req.body.time,
        milk: req.body.milk,
        fat: req.body.fat,
        snf: req.body.snf,
        rate: req.body.rate,
        t_rate: req.body.t_rate,
        hours: req.body.hours,
        ehours:req.body.ehours,
        type: req.body.type,
        UId: req.body.UId
    });
    memData.save((err, doc) => {
        if (!err) {
            res.json({ msg: "Data Added Successfully", data: doc })
        }
        else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!");
        }
    });

});




// get only 10 data
router.get('/GetBillData/:UId/:No/:from/:to',(req,res)=>{
    Data.find({ "UId": req.params.UId, "No": req.params.No, date : { $gte :req.params.from, $lt :req.params.to} }, (err, docs) => {
        if (docs.length>0) {
            res.json(docs);
        } else {
            return res.status(501).json("User Data Not Found !!");
        }
    });
})


module.exports = router;
