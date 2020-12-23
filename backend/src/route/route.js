const express=require('express');
const router=express.Router();
var bodyParser=require('body-parser');
const userservice=require('../service/user');
const User=require('../model/userclass');
const create = require('../model/dbsetup');

router.use(bodyParser.urlencoded({extend:false}));
router.use(bodyParser.json());


router.get('/setupDb',(req,res,next)=>{
    console.log("inside route");
    create.setupDb().then ((data)=>{
        console.log(data);
   res.send(data) 
    }).catch((err)=>{
        next(err)
    })
})



// get all user 
router.get('',(req,res,next)=>{
    userservice.getalluser().then((data)=>{
        res.json(data);
    }).catch((err)=>next(err));
    })





//to login
    router.post('/login',(req,res,next)=>{
        const username=req.body.username;
        const password=req.body.password;
        userservice.loginuser(username,password).then((data)=>{
            res.json(data)
        }).catch((err)=>{
            next(err)
        })
     })

     //admin login
    router.post('/admin',(req,res,next)=>{
        const username=req.body.username;
        const password=req.body.password;
        userservice.loginadmin(username,password).then((data)=>{
            res.json(data)
        }).catch((err)=>{
            next(err)
        })
     })

//to register user
router.post('/register', (req, res, next) => {
   
    const newuser = new User(req.body);
  
    userservice.registeruser(newuser).then((data) => {
   
        res.json( data);
    }).catch((err) => {next(err)})
})

//to delete
router.delete('/delete/:username/:password', (req, res, next) => {
    
    let username = req.params.username;
    let password=req.params.password;
    userservice.deleteuser(username,password).then((response) => {
        console.log(response);
        res.json(response);
    }).catch((err) => next(err))
})

//update password
router.put('/update/:newpassword', (req, res, next) => {
    
    let username = req.body.username;
    let password=req.body.password;
    let newpassword=req.params.newpassword;
    console.log(newpassword);
     userservice.updateuser(username,password,newpassword).then((data) => {
         console.log("hello");
         console.log(data.message);
        res.json(data);
    }).catch((err) => {console.log("esdsd");next(err)})
})

    module.exports=router;
    