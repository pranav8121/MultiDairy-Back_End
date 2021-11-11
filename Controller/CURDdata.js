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


router.put('/EditDataDB/:id', (req, res) =>{
    Data.findById(req.params.id,function (err, doc){
        if(err){
            return res.status(501).json("Cannont Find Data !!");
        }
        else{
            doc.Name= req.body.Name,
            doc.No=req.body.No,
            doc.date= req.body.date,
            doc.time= req.body.time,
            doc.milk= req.body.milk,
            doc.fat= req.body.fat,
            doc.snf= req.body.snf,
            doc.rate= req.body.rate,
            doc.t_rate= req.body.t_rate,
            doc.hours= req.body.hours,
            doc.ehours=req.body.ehours,
            doc.type= req.body.type,
            doc.UId= req.body.UId
        //     doc.save().then(doc => {
        //         res.json({ "msg": 'Update complete', data: doc });
        //     })
        //     .catch(err => {
        //         res.status(501).send("unable to update the database");
        //   });
        doc.save((err, doc) => {
            if (!err) {
                res.json({ msg: "Data Updated Successfully", data: doc })
            }
            else {
                return res.status(501).json("Error in Updating Data");
            }
        });
        }
    })
})


router.post('/DairyOneDayTotal', (req, res) => {
    var totalmilk=0
    var totalrate=0
    var rate=0
    Data.find({ "UId": req.body.UId, "ehours": req.body.ehours,"date":req.body.date,"type": [req.body.etype,req.body.etype2]}, (err, doc) => {
        if (doc.length > 0) {
            doc.forEach((ele) => {
                totalmilk=totalmilk+parseFloat(ele.milk)
                totalrate=totalrate+parseFloat(ele.t_rate)
                rate=rate+parseFloat(ele.rate)
            });
            res.json({TotalMilk:totalmilk.toFixed(2),TotalRate:totalrate.toFixed(2),Rate:rate.toFixed(2)});
        } else {
            return res.status(501).json("Entry Not Found!!");
        }
    });
});


module.exports = router;
