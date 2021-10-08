const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://pranav:pranavpatil9393@cluster0.f4e9x.mongodb.net/DairyDB',(err)=>{
   
    if(!err)
    console.log('Database connected successfull');
    else
    console.log('Error in DB connection:',err);
});

module.exports = mongoose;