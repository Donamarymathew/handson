const collection=require('../utilities/connection');
const UserDatabase=[
    {
        username:"admin",
        password:"Admin1234!"
    },
    {
        username:"Noble",
        password:"Abcd1234!"
    },
    {
     username:"Hazel",
     password:"Vxyz1234@"
    }
]

exports.setupDb=()=>{
    console.log("inside dbsetup");
    return collection.getUserCollection().then((user)=>{
       
        return user.deleteMany().then(()=>{return user.insertMany(UserDatabase).then((data)=>{
            if(data){
                
                return "Insertion Succcessful"
            }
            else{
               
                let err=new Error("Insertion Failed");
                err.status=400;
                throw err;
            }
        })})
    })
}