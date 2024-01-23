import { Aution } from "../model/Appliedjob.js";
import { Bids } from "../model/companey.js";
import { User } from "../model/user.js";
export const ApliedJob = async (req, res) => {
    const { iid, jid } = req.params;
    // const {Location,name,number,price,rating}= req.body;
    try {
        const isUser = await User.findOne({ _id: iid });
        const isItem = await Bids.findOne({ _id: jid });
        // const isDone = await Aution.findOne({});
        const isBid = await Aution.find({ ProductID: isItem._id, email: isUser.email });
        console.log(isBid)
        if (!isUser) {
            return res.status(404).json({
                success: false,
                message: "Register For Biding...."
            })
        }

        if (!isBid) {
            return res.status(404).json({
                success: false,
                message: "Already done..."
            })
        }

        const Autions = new Aution({
            name: isUser.name,
            email: isUser.email,
            ProductID: isItem._id,
            userName: isItem.name,
            productName: isItem.productName,
            Per_bid: isItem.Per_bid,
            BindingProice: isItem.BindingProice,
            OriginalPrice: isItem.OriginalPrice,

        })
        await Autions.save();
        res.status(201).json({
            success: true,
            message: "Congratulations, 🎉 Bid has been added Successfully....."
        })
    } catch (error) {
        console.log(error)
    }
}

export const getApplied = async (req, res) => {
    try {
        const { iid } = req.params;
        const isUser = await User.findById(iid);
        const Auctions = await Aution.find({ email: isUser.email })
        if (!Auctions) {
            return res.status(404).json({
                success: false,
                message: "Empty..."
            })
        }
        res.status(201).json({
            success: true,
            message: "Feteched Successfully...",
            Auctions
        })
    } catch (error) {
        console.log(error)
    }
}
export const getApplieds = async (req, res) => {
    try {
        const Auctions = await Aution.find()
        res.status(201).json({
            success: true,
            message: "Feteched Successfully...",
            Auctions
        })
    } catch (error) {
        console.log(error)
    }
}