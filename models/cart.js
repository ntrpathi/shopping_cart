const mongoose = require('mongoose')

const product = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    brandName:{
        type:String,
    },

    color:{
        type:String
    },

    size:{
        type:String
    }
})

const products = mongoose.model('inventory',product)
module.exports = products