const dbModel=require('../utilities/connection');
const usermodel={};


//get all user
usermodel.getalluser= () =>{
    return dbModel.getUserCollection().then(model=>{
        return model.find().then(data=>{if(data){return data;}
    else{
        return null;
    }})
    })
}



//find user
usermodel.finduser = (username,password) => {
  
    return dbModel.getUserCollection().then((model) => {
      
       
        return model.findOne({ "username": username,"password":password }).then((data) => {
           
            if (data) { 
              
                return data }
            else {return null};
        })
    })
}

//delete user
usermodel.deleteuser=(username,password)=>{
    console.log("model");
    return dbModel.getUserCollection().then((model) => {
        return model.deleteOne({"username":username,"password":password}).then(deleted=>{
            if(deleted.n>0) return username;
            else return null; 
        })
    })
}



// register user
usermodel.registeruser=(newuser)=>{
    return dbModel.getUserCollection().then(model=>{
        return model.create(newuser).then((insertedData)=>{
            if(insertedData){
                return insertedData.username;
            }
            else{
                return null;
            }
        })
    })
}

//update password
usermodel.updateuser=(username,password,newpassword)=>{
    return dbModel.getUserCollection().then(model=>{
        return model.updateOne({"username":username,"password":password},{$set:{"password":newpassword}}).then((updatedData)=>{
            console.log(updatedData);
            if(updatedData.nModified==1){
                return username;
            }
            else{
                return null;
            }
        })
    })
}


//to login
usermodel.loginuser= (username,password) =>{
    console.log("model")
    return dbModel.getUserCollection().then(model=>{
        return model.find({"username":username,"password":password})
        .then(response=>{
            
            if(response.length==1){
                
                return response;
            }
    else{
        return null;
    }})
    })
}

//admin login
usermodel.loginadmin= (username,password) =>{
    console.log("model")
    return dbModel.getUserCollection().then(model=>{
        if(username=="admin" && password=="Admin1234!")
        {
            return true;
        }
        else{
            return null;
        }
    })
}

module.exports=usermodel;