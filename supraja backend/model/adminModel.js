import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email_id:{
        type:String,
        required:true
    },
   
    password:{
        type:String,
        required:true
    },
});

export default mongoose.model("admin",adminSchema);