import express from "express";
import {  Login, Register, } from "../controller/auth.js";
import { addBid, deleteBid, editBid, getAllBids } from "../controller/bids.js";


const route = express();

route.post('/user/register',  Register);
route.post('/user/login', Login);

// Bids

route.get('/bids', getAllBids);
route.post('/bids', addBid);
route.put('/bids/:id', editBid);
route.delete('/bids/:id', deleteBid);






export default route