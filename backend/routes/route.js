import express from "express";
import { AdminLogin, Adminreg, Login, Register, } from "../controller/auth.js";
import { AddCompaney, getJob } from "../controller/companey.js";
import { ApliedJob, getApplied, getApplieds } from "../controller/Appliedjob.js";


const route = express();

route.post('/user/register',  Register);
route.post('/user/admin', Adminreg);
route.post('/user/login', Login);
route.post('/user/adminlogin', AdminLogin);
route.post('/user/addjob/:id', AddCompaney);
route.get('/user/alljob', getJob);
route.post('/user/apply/:iid/:jid', ApliedJob);
route.get('/user/appliedJobs/:iid', getApplied);
route.get('/user/appliedJobs', getApplieds);



export default route