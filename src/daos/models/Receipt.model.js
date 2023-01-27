import mongoose, { mongo } from "mongoose";
import config from "../../config/dotenvConfig.js"
import { logger } from "../../utils/logger.js";
const connection =  mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}${config.mongo.DB}`, err=>{
    if(err) logger.error(err);
    else logger.info("Se Conecto Mongo en Receipt.model.js")
})

const collection = "receipts"

const schema = new mongoose.Schema({
    productDetails:Array,
    receiptId:String,
    finalPrice:Number
})

const receiptModel = mongoose.model(collection,schema)

export default receiptModel