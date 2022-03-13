const express = require('express');
var router = express.Router();

var { User } = require("../Model/login");
var { member } = require("../Model/member");
var {MemberDetails} = require("../Model/memLogin")


router.get('/getCred/:username/:password', (req, res) => {
    var m_count
    User.findOne({ 'username': req.params.username }, (err, doc) => {
        if (doc) {
            if (doc.password == req.params.password) {

                member.find({ "UId": doc._id }, (err, result) => {
                    if (result) {
                        m_count = result.length
                        var token = "JWTtoken";
                        return res.json({ message: "Login SuccessFull", Name: doc.Name, Id: doc._id, token: token, token, Member_count: m_count,multi:doc.multi,auth:"Admin" });
                    }
                });


            } else {
                return res.status(501).json({ message: "Invalid Username or password !!" });
            }
        } else {
            return res.status(501).json({ message: "Username does not exist !!" });
        }
    });
});

router.get('/getMemCred/:username/:password', (req, res) => {
    console.log(req.params.username,req.params.password);
    var m_count
    MemberDetails.findOne({ 'username': req.params.username }, (err, doc) => {
        console.log(doc);
        if (doc) {
            if (doc.password == req.params.password) {

                member.find({ "UId": doc.Id }, (err, result) => {
                    if (result) {
                        m_count = result.length
                        var token = "JWTtoken";
                        return res.json({ message: "Login SuccessFull", Name: doc.Name, Id: doc.Id, token: token, token, Member_count: m_count,multi:doc.multi,auth:"Member"});
                    }
                });


            } else {
                return res.status(501).json({ message: "Invalid Username or password !!" });
            }
        } else {
            return res.status(501).json({ message: "Username does not exist !!" });
        }
    });
});

router.get('/getall', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.json(docs);
        }
        else {
            return res.status(501).json("error in retriving data !!");
        }
    });
});


router.post('/addCred', (req, res) => {
    var newUser = new User({
        password: req.body.password,
        username: req.body.username,
        Name: req.body.Name,
        multi:req.body,multi
    });
    newUser.save((err, doc) => {
        console.log(doc);
        if (!err) {
            res.json({ msg: "data Added Successfully", data: doc })
        }
        else {
            return res.status(501).json("Error in Saving Data Please Check You Internet Connection or Refresh!!")
        }
    });
});

module.exports = router;