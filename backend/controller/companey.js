import { Bids } from "../model/companey.js";
import { Admin } from "../model/Admin.js";

export const AddCompaney = async(req, res)=>{
    const {productName, price, BindingProice, OriginalPrice } = req.body;
    const {id} = req.params;
    try {
    const isCompaney = await Admin.findById(id);
    if(!isCompaney){
        return res.status(404).json({
            success:false,
            message:"User is not Registerd Sorry !!"
        })
    }
    else{
        await Bids.create({
            userID:isCompaney._id,
            userName:isCompaney.name,
            productName,
            Per_bid:price,
            BindingProice,
            OriginalPrice,
            
        })
        res.status(201).json({
            success:true,
            message:"Item has been Added Successfully.."
        })
    }
   
    } catch (error) {
    //    res.status(500).json({message:"something went to wrong !", error}) 
    console.log(error)
    }
    
}


export const getJob = async(req, res)=>{
    try {
        const AllJobs = await Bids.find();
        res.status(200).json({
            AllJobs
        })
    } catch (error) {
        console.log(error)
    }
}