const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/user")

router.get('/',(req,res)=>{
    res.send('hello from the router server')
});


// to register a new user 

router.post('/signup',async(req,res)=>{
    const {name,email,phone,work,password,cpassword} = req.body

    if(!email||!name||!phone||!work||!password||!cpassword){
        res.status(422).send("fill all the fields properly")
    }else{

        try{
            const userExist = await User.findOne({email:email})

            if(userExist){
                res.status(422).send({error:"email already exist"})
            }

            const user = new User({name,email,phone,work,password,cpassword})
            const userRegister = await user.save();

            if(userRegister){
                res.status(201).send({message:"user registration succesfull"})
            }else{
                res.status(500).send({error:"Failed to register"})
            }

        }catch(err){
            res.send(err)
        }
    }
})


// Login Api

router.post('/login',async(req,res)=>{
    const {email,password} = req.body;

    if(!email||!password){
        res.status(400).send({error:"fill all the fields properly"})
    }else{

        try{
            const userExist = await User.findOne({email:email})

            if(!userExist){
                res.status(422).send({error:"invalid credentials"})
            }else{
                const matchPass = await bcrypt.compare(password,userExist.password)

                const token = await userExist.generateAuthToken();
                // console.log(token)

                res.cookie("jwtoken",token,{
                    // for 30 days
                    expires:new Date(Date.now()+25892000000),
                    httpOnly:true
                })

                if(matchPass){
                    res.send({message:"Login successfull"})
                }else{
                    res.send({error:"invalid credentials"})
                }
            }
        }catch(err){
            res.send(err)
        }

    }
})

module.exports = router;