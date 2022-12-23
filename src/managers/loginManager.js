import mongoose,{ startSession }  from "mongoose";

const URL = ' mongodb://127.0.0.1:27017'
const connection = mongoose.connect(URL,err=>{
    if(err) console.log(err);
    else console.log("Connected to Mongo ")
})

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