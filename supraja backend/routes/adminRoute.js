import express from "express"
import { 
    adminLogin} from "../controller/admincontroller.js"

const route = express.Router();


route.post("/adminlogin",adminLogin);
export default route;