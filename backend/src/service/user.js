const db=require('../model/user');
let userservice={}





//get details of all employees
userservice.getalluser=()=>{
    return db.getalluser().then(data=>{
        if(data==null){
            let err=new Error("There are no registered user yet!");
            err.status=404;
            throw err;
        }
        else{
            return data;
        }
    })
}



//to login
userservice.loginuser=(username,password)=>{
    return db.loginuser(username,password)
    .then((response)=>{
        if(response==null){
            let err=new Error("Wrong Credential")
            err.status=404;
            throw err
        }
        else {
            return {"message":"Login Successful "};
        }
    })
    }

    //admin login
userservice.loginadmin=(username,password)=>{
    return db.loginadmin(username,password)
    .then((response)=>{
        if(response==null){
            let err=new Error("Wrong Credential")
            err.status=404;
            throw err
        }
        else {
            return {"message":"Login Successful "};
        }
    })
    }


//to register 
userservice.registeruser=((newuser)=>{
    
    
   
    return db.finduser(newuser.username,newuser.password).then(object=>{
        if(object!=null){
            let err= new Error("user already registered with given credentials");
            err.status=404;
            throw err;
        }else{
            return db.registeruser(newuser).then((data)=>{
                if(data){
                return {"message": "Successfully registered user" }
            }
                else{
                    let err= new Error("Employee Details not Inserted");
                    err.status=500;
                    throw err;
                }
            })}})})

//delete 
userservice.deleteuser=(username,password)=>{
    console.log("service");
    return db.finduser(username,password).then(object=>{
        if(object==null){
          
            let err= new Error("user not registered!!");
            err.status=404;
            throw err;
        }else{
           
    return db.deleteuser(username,password).then(data=>{

        if(data){
            
            return {"message":"Deleted user"};
        }
        else{
            let err=new Error("Failed to delete ");
            err.status=403;
            throw err;
        }
    })
}
    })
}


//update password
userservice.updateuser=((username,password,newpassword)=>{
    
    return db.finduser(username,password).then(object=>{
        if(object==null){
            let err= new Error("user not registered!!");
            err.status=404;
            throw err;
        }else{
 
    return db.updateuser(username,password,newpassword).then(data=>{
        if(data){
            return {"message": "Successfully updated password" }
        }
        else{
            let err= new Error("Sorry!! Failed to update");
            err.status=403;
            throw err;
        }
    })
}
    })
})

module.exports=userservice;