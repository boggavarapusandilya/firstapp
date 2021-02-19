//create mini express app
const exp=require("express");
const userApiObj=exp.Router();
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
//import verifytoken
const verifyToken=require("./middlewares/verifyToken");
//error handler for syntax errors
const errorHandler=require("express-async-handler");
const { ErrorHandler } = require("@angular/core");
 //import env module
 require("dotenv").config();

//import 
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")
//configure cloudinary
cloudinary.config({
    cloud_name: 'dtrhafbol',
    api_key: '471847945156575',
    api_secret: 'H7vKMedZ5nAeWlIjbjtNebdk3OY'
});
//configure cloudinary storage

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'cdb37',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    },
});
//congigure multer
var upload = multer({ storage: storage });
//extract body of req obj
userApiObj.use(exp.json())


//GET REQ handler
userApiObj.post("/register",upload.single('photo'), errorHandler(async (req,res,next)=>{
    console.log("url is ",req.file.path);
    //get user collectionobject

    

    let userCollectionObj=req.app.get("userCollectionObj");
   console.log("user obj is",req.body)
   let userObj=JSON.parse(req.body.userObj);
   console.log(userObj)

    let user=await userCollectionObj.findOne({username:userObj.username})

    if(user!==null){
        res.send({message:"user existed"})

    }
    else{
        //hash the password
        let hashedpw=await bcryptjs.hash(userObj.password,6)
        //replace plain text pw with hased pw
        userObj.password=hashedpw;
         //add userImagelink
         userObj.userImgLink = req.file.path;
        //create user

        let succes=await userCollectionObj.insertOne(userObj)
        res.send({message:"user created"})

    }
}))

//user login
userApiObj.post("/login",errorHandler(async (req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj");
    let userCredobj=req.body;

    //verify username
    let user=await userCollectionObj.findOne({username:userCredobj.username})
    
    if(user==null){
           res.send({"message":"invalid username"})
    }
    else{

        //verify password

        let status=await bcryptjs.compare(userCredobj.password,user.password)
         //if pas matched
        if(status==true){
            //create a token

            let token=await jwt.sign({username:user.username},process.env.secret,{expiresIn:10})
  

            //send token
            
            res.send({message:"success",signedToken:token,username:user.username})
        }
        else{
            res.send({message:"invalid password"})
        }
    }


}))
userApiObj.get("/getuser/:username",verifyToken,errorHandler(async (req,res,next)=>{ //get user collectionobject 
    let userCollectionObj = req.app.get("userCollectionObj") 
    let userObj=await userCollectionObj.findOne({username:req.params.username})

     res.send({message:"success",user:userObj}) 
    
    }))


module.exports=userApiObj;