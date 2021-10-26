const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./server');
var cors = require('cors');
var app = express();

var CURDlogin=require('./Controller/CURDlogin');
var CURDmember=require('./Controller/CURDmember');
var CURDdata=require('./Controller/CURDdata');
var CURDbill=require('./Controller/CURDbill');
var CURDadv=require('./Controller/CURDadv');



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });

app.use(bodyParser.json());
app.use(cors());
app.use('/',CURDlogin);
app.use('/',CURDadv);
app.use('/',CURDmember);
app.use('/',CURDdata);
app.use('/',CURDbill);

app.listen(process.env.PORT || 3000, () => console.log('server started at http://localhost:3000/'));