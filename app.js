const express = require('express')
const app  = express();
const dotenv = require('dotenv')

app.use(express.json())
dotenv.config({path:"./config.env"})
const port = process.env.PORT;
require('./database/connection')
app.use(require('./router/auth'))
app.use(require('./router/product'))

app.get('/',(req,res)=>{
    res.send('hi from the server')
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
})