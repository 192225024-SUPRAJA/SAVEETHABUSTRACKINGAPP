import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    register_number:{
        type:String,
        requied:true
    },
    password:{
        type:String,
        required:true
    },
});

export default mongoose.model("users",userSchema);