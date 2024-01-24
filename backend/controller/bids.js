import express from "express";
import { bids } from "../model/bids.js";

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

// Get all bids
export const getAllBids = async (req, res) => {
    try {
        const bidData = await bids.find();
        res.json(bidData);
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
