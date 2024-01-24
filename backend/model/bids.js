import mongoose from "mongoose";

const Bids = new mongoose.Schema({
    userID : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    bidPrice:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
   totalBids:[
        {
            userID:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            bidPrice:{
                type:Number,
            }
        }
   ]
},
    {
        timestamps:{
            required:true
        }})

export const bids = new mongoose.model('Bids', Bids);