const {Schema}=require("mongoose");
const Mongoose=require("mongoose");
Mongoose.Promise=global.Promise;
Mongoose.set('useCreateIndex',true);
const url="mongodb://localhost:27017/User";
let collection={};

const userSchema=Schema({
username:{type:String,required:true},
password:{type:String,required:true},
},{collection:"User"});

collection.getUserCollection=()=>{
 
    return Mongoose.connect(url,{useNewUrlParser:true}).then((database)=>
    {return database.model('User',userSchema)
}).catch(()=>{
  
    let err=new Error("Could not connect to user Collection Database");
    err.status=500;
    throw err;

})
}

module.exports=collection;