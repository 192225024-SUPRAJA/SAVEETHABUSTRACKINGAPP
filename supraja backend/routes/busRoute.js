import express from "express"
import { 
    fetchbus,createbus,updatebus,deletebus,Schedulebus,updateScheduleBus,deleteScheduleBus,
    getBusById, fetchAllScheduleBus} from "../controller/buscontroller.js"

const route = express.Router();

route.post("/create", createbus);
route.get("/getAllBus", fetchbus);
route.get("/getBusById/:id",getBusById);
route.put("/update/:id",updatebus);
route.delete("/delete/:id", deletebus);
route.post("/scheduleBus", Schedulebus);
route.get("/getschedule", fetchAllScheduleBus);
route.put("/updateschedule/:id",updateScheduleBus);
route.delete("/deleteschedule/:id",deleteScheduleBus);


export default route;

