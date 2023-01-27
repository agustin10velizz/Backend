import mongoose, { Schema } from "mongoose";
import config from "../../config/dotenvConfig.js";
import { logger } from "../../utilss/logger.js";

const collection = "users";

const connection =  mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}${config.mongo.DB}`, err=>{
    if(err) console.log(err);
    else logger.info("Se Conecto Mongo en User.model.js")
})

const schema = new mongoose.Schema({
    name:String,
    adress:String,
    age:Number,
    phone_number:String,
    imageURL:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    cart:Array,
})

const userModel = mongoose.model(collection,schema)

export default userModel