const mongoose = require('mongoose')

const URL = process.env.DATABASE;

const dbs = mongoose.connection;
mongoose.connect(URL,({useNewUrlParser:true}));

dbs.once('open',_=>{
    console.log("Database connected")
})

dbs.on('error',err=>{
    console.log(`error while connecting with database`)
})