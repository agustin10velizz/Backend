import mongoose from "mongoose";
import config from "../../config/dotenvConfig.js"
import { logger } from "../../utils/logger.js";
const connection =  mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}${config.mongo.DB}`, err=>{
    if(err) logger.error(err);
    else logger.info("Se Conecto Mongo en Productos.model.js")
})

const collection = "products";
const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    
})


export default productModel