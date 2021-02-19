const exp=require("express")
const app=exp();
//path to connect with angular
const path=require("path")
const mc=require("mongodb").MongoClient
 //import env module
 require("dotenv").config();

// connect angular app with webserve
app.use(exp.static(path.join(__dirname,"./dist/completeapp")));


//create api obj
const userApiObj=require("./apis/userapi")
//const productApiObj=require("./multipleapis/productapi")
//const adminApiObj=require("./apis/adminapi")

//forward req objects to specific api based on path
app.use("/user",userApiObj)
//app.use("/product",productApiObj)
//app.use("/admin",adminApiObj)

//database url
const dburl=process.env.dburl;
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
    const databaseObj=client.db("firstdatabase");
    const userCollectionObj=databaseObj.collection("usercollection");
    const productCollectionObj=databaseObj.collection("productcollection");
    const adminCollectionObj=databaseObj.collection("admincollection");
    app.set("userCollectionObj", userCollectionObj);
    app.set("productCollectionObj",productCollectionObj)
    app.set("adminCollectionObj",adminCollectionObj)
    console.log("db is running successfully")

})
.catch(err=>console.log("err in db connection",err))

//event handler for invalid path
app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid`})


})
//event handkler for syntax errors
app.use((err,req,res,next)=>{
    res.send({message:"error occured",reason:err.message})

})

const portno=4000;

app.listen(portno,()=>console.log(`web server on port ${portno}`))