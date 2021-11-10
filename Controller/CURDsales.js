const express = require('express');
var router = express.Router();

var { Sales } = require("../Model/sales");

router.get('/GetDairysales/:UId', (req, res) => {

    Sales.find({ "UId": req.params.UId }, (err, doc) => {
        if (doc.length > 0) {
            res.json(doc)
        }
        else {
            res.status(501).json("No Data Available!!")
        }
    });
});



router.post('/AddDairysales/:UId', (req, res) => {

    var newSale = new Sales({
        date:req.body.date,
        hours:req.body.hours,
        ehours:req.body.ehours,
        type:req.body.type,
        etype:req.body.etype,
        milk:req.body.milk,
        rate:req.body.rate,
        totalRate:req.body.totalRate,
        UId:req.params.UId
    });
    newSale.save((err, doc) => {
        if (!err) {
            res.json({ msg: "Data Added Successfully", data: doc })
        } else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!");
        }
    });
});

router.post('/FindDairysales',(req,res)=>{
    Sales.find({ "UId": req.body.UId, "ehours": req.body.ehours,"date":req.body.date,"type": req.body.etype}, (err, doc) => {
        if (doc.length > 0) {
            res.json(doc)
        }
        else {
            res.status(501).json("No Data Available!!")
        }
    });
})



module.exports = router;