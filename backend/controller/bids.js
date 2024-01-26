import express from "express";
import { bids } from "../model/bids.js";
import { User } from "../model/user.js";

// Add a bid
export const addBid = async (req, res) => {
    try {
        const bid = new bids(req.body);
        const savedBid = await bid.save();
        res.status(201).json(savedBid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all approved bids
export const getAllBids = async (req, res) => {
    try {
        const bidData = await bids.find();
        // check if approved or not
        const approvedBids = bidData.filter(b => b.approved === true);
        res.json(approvedBids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all unapproved bids
export const getAllUnapprovedBids = async (req, res) => {
    try {
        const bidData = await bids.find();
        // check if approved or not
        const unapprovedBids = bidData.filter(b => b.approved === false);
        res.json(unapprovedBids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Edit a bid
export const editBid = async (req, res) => {
    try {
        const bid = await bids.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(bid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a bid
export const deleteBid = async (req, res) => {
    try {
        const bid = await bids.findByIdAndDelete(req.params.id);
        res.json({ message: 'Bid deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// get Single bid

export const getSingleBid = async (req, res) => {
    try {
        const bid = await bids.findById(req.params.id).populate('userID');
        // add views 
        bid.views = bid.views + 1;
        await bid.save();
        res.json(bid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// make a bid
export const makeBid = async (req, res) => {
    try {
        const user = await User.findById(req.body.user);
        const bid = await bids.findById(req.params.id);
        // check if user already bid
        const alreadyBid = bid.totalBids.filter(b => b.user[0]._id.toString() === user._id.toString())
        const userData = [{ name: user.name, email: user.email, _id: user._id }]
        if(alreadyBid.length > 0){
        //    update the bid
        const updateBid = bid.totalBids.map(b => {
            if(b.user[0]._id.toString() === user._id.toString()){
                b.bidPrice = req.body.bidPrice;
            }
            return b;
        })
        bid.totalBids = updateBid;
        if(req.body.bidPrice > bid.bidPrice){
            bid.bidPrice = req.body.bidPrice;
        }
        await bid.save();
        return res.json(bid);
        }
        
        bid.totalBids.push({ user:userData, bidPrice: req.body.bidPrice });
        if(req.body.bidPrice > bid.bidPrice){
            bid.bidPrice = req.body.bidPrice;
        }
        await bid.save();
        res.json(bid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// search bids
export const searchBid = async (req, res) => {
    try {
        const bidsData = await bids.find({ name: { $regex: req.params.query, $options: 'i' } });
        res.json(bidsData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// approve auction
export const approveBid = async (req, res) => {
    try {
        const bid = await bids.findById(req.params.id);
        bid.approved = true;
        await bid.save();
        res.json(bid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
