import express from "express";
import {  Login, Register, } from "../controller/auth.js";
import { addBid, deleteBid, editBid, getAllBids, getSingleBid, makeBid, searchBid, getAllUnapprovedBids, approveBid } from "../controller/bids.js";


const route = express();

route.post('/user/register',  Register);
route.post('/user/login', Login);

// Bids

route.get('/bids', getAllBids);
route.get('/bids/unapproved', getAllUnapprovedBids);
route.post('/bids', addBid);
route.put('/bids/:id', editBid);
route.delete('/bids/:id', deleteBid);
route.get('/bids/:id', getSingleBid);
route.post('/makebid/:id', makeBid);
route.get("/search/:query", searchBid);
route.put("/bids/approve/:id", approveBid);



export default route