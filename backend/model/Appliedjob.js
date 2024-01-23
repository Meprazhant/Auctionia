import  mongoose  from "mongoose";

const appiledJobs = new mongoose.Schema({
    
   
    name:{
        type:String,
        
    },
    email:{
        type:String,
    }, 
    ProductID : {
        // type:String,
    },
    userName : {
        type:String,
    },
    productName:{
        type:String,
        required:true
    },
    Per_bid:{
        type:Number,
        required:true
    },
    OriginalPrice:{
        type:String,
        required:true
    },
    BindingProice:{
        type:String,
        default:'',
    }
    
},{
    timestamps:{
        required:true
    }})

export const Aution = mongoose.model('Aution', appiledJobs)