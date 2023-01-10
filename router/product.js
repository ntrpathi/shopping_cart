const { query } = require('express');
const express = require('express');
const router = express.Router();

const product = require('../models/cart')

router.get('/',(req,res)=>{
    res.send('hi from the new page')
});

// A. OBJECT MANAGEMENT

// Adding item in inventory

router.post('/addITems',async(req,res)=>{
    const {name,description,brandName,color,size} = req.body;
    try{
        if(!name||!description||!brandName||!color||!size){
            res.send("provide all information of product for adding it to inventory")
        }else{
            const add = new product({name,description,brandName,color,size})
            const addItem = await add.save()
            if(addItem){
                res.send("item added successfully in inventory")
            }else{
                res.send("sorry try again")
            }
        }

    }catch(err){
        console.log(err)
    }
})

// Edit object Values

router.put('/editItem',async(req,res)=>{
    const data = req.body
    try{
        const findProduct = await product.findById(data.id)
        console.log(findProduct)
        if(findProduct){ 
            await findProduct.update({
                $set:{name:data.newName,
                    description:data.newDescription,
                    brandName:data.newBrandName,
                    color:data.newColor,
                    size:data.newSize
                }
            })
            res.send("data updated")
        }else{
            res.send("try again later")
        }

    }catch(error){
        console.log(error)
    }
})


// to delete an item from inventory 

router.delete('/deleteItem/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const da = await product.deleteOne({_id:id})
        if(da){
            res.send("item deleted sucessfully")
        }
    }catch(err){
        res.send(err)
    }
 

})


// fetch all the items of inventory based on requirement
// also by filter

router.get('/fetchList',async(req,res)=>{
    const data = req.query;
    console.log(data,"the data is here")

    const products = await product.find({...data})
    if(products){
        res.send({data:products})
    }else{
        res.send({response:"Data not found "})
    }

})

// to sort 

router.get('/fetchListSorted',async(req,res)=>{
    const data = req.query;
    console.log(data,"the data is here")

    const products = await product.find({...data})
    if(products){
        res.send({data:products.sort(data.size)})
    }else{
        res.send({response:"Data not found "})
    }

})


// show all the details of an object

router.get('/show',async(req,res)=>{
    //const{name,description,brandName,color,size} = req.body
    const data = req.body

    try{
        const productInfo = await product.findById(data.id)
        if(productInfo){
            res.send(productInfo)
        }else{
            res.send("couldn't find the ID")
        }
    }catch(error){
        console.log(error)
    }
})

module.exports = router;

