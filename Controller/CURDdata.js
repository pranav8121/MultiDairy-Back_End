const express = require('express');
var router = express.Router();

var { Data } = require("../Model/data");
var start = new Date();
start.setHours(0,0,0,0);

var end = new Date();
end.setHours(23,59,59,999);



router.get('/getallDairyData/:UId', (req, res) => {
    Data.find({ "UId": req.params.UId }, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            return res.status(501).json("User Data Not Found !!");
        }
    });
});

router.get('/getalldata/:UId/:No', (req, res) => {
    console.log(req.params);
    Data.find({ "UId": req.params.UId, "No": req.params.No }, (err, docs) => {
        if (docs) {
            res.json(docs);
        } else {
            return res.status(501).json("User Data Not Found !!");
        }
    });
});
;

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
            res.json({ msg: "data Added Successfully", data: doc })
        }
        else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!");
        }
    });

});


router.get('/GetTodayData/:UId/:ehours/:date',(req,res)=>{
    // createdAt: ISODate("2016-02-10T07:51:08.934Z")
    console.log(req.params.date);
    Data.find({"date":req.params.date, "UId": req.params.UId,"ehours":req.params.ehours}, (err, docs) => {
        if (docs.length>0) {
            res.json(docs);
        } else {
            return res.status(501).json("No Data Found !!");
        }
    });
})

module.exports = router;



// router.get('/getlastdata/:UId/:Name/:type', (req, res) => {
//     Data.findOne({ "UId": req.params.UId, "Name": req.params.Name,"type":req.params.type,
// }, (err, docs) => {
//         if (!err) {
//             res.json(docs);
//         } else {
//             return res.status(501).json("User Data Not Found !!");
//         }
//     });
//     // Data.findOne(
//     //     {"UId": req.params.UId, "Name": req.params.Name,"type":req.params.type},
//     //     { sort: { _id: -1 } },
//     //     (err, data) => {
//     //         if (!err) {
//     //                     res.json(docs);
//     //                 } else {
//     //                     return res.status(501).json("User Data Not Found !!");
//     //                 }},
//     //   );
// })