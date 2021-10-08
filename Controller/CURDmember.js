const express = require('express');
var router = express.Router();

var { member } = require("../Model/member")




router.post('/addMem/:UId', (req, res) => {
    var memb = new member({
        Name: req.body.Name,
        engName:req.body.engName,
        No: req.body.No,
        type: req.body.type,
        Phone: req.body.Phone,
        UId: req.params.UId
    });
    memb.save((err, doc) => {
        if (!err) {
            res.json({ msg: "data Added Successfully", data: doc });
        } else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!")
        };
    });
});

router.get('/getOneMem/:UId/:No', (req, res) => {
    member.findOne({ "UId": req.params.UId, "No": req.params.No }, (err, docs) => {
        if (docs) {
            res.json(docs);
        } else {
            return res.status(501).json("User Not Found !!");
        }
    });
});

router.get('/getallMem/:UId', (req, res) => {
    member.find({ "UId": req.params.UId }, (err, docs) => {
        if (!err) {
            res.json(docs);
        } else {
            return res.status(501).json("Members Not Found !!");
        }
    });
});





module.exports = router;