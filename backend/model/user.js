import  mongoose  from "mongoose";

const newUser = new mongoose.Schema({
    name:{
        type:String,
    }, 
    email:{
        type:String,
        unique:true
    }, 
    password:{
        type:String,
     
    },
    phone:{
        type:String,
     
    },
    Address:{
        type:String,
     
    },
    file:{
        type:String
    },
    type:{
        type:String,
        default:"user"
    },

    
})

export const User = mongoose.model('User', newUser)