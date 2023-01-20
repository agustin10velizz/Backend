import mongoose, { startSession } from "mongoose";
import config from "../config/config.js";


const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const userModel = mongoose.model("Users",schema)

export default userModel