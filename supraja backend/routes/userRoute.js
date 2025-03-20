import express from "express"
import { 
    fetch,fetchbyuserid, create,update,deleteUser,studentLogin} from "../controller/usercontroller.js"

const route = express.Router();

route.post("/create", create);
route.get("/getAllUsers", fetch);
route.put("/update/:id",update);
route.delete("/delete/:id", deleteUser);
route.get("/users/:id", fetchbyuserid);
route.post("/studentlogin",studentLogin);

export default route;

