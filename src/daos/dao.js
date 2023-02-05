import mongoose, { Model, mongo } from "mongoose";
import config from "../config/config.js"
import User from "./models/User.model.js"
import Product from "./models/Product.model.js";
import Receipt from "./models/Receipt.model.js"

export default class Dao {
    constructor(){
        this.connection = mongoose.connect(`mongodb+srv://${config.mongo.USER}:${config.mongo.PWD}/${config.mongo.DB}`)
        const genericTimeStamps = {timestamps:{createdAt:"created_at",updatedAt:"updated_at"}}

        const userSchema = mongoose.Schema(User.schema,genericTimeStamps)
        const productSchema = mongoose.Schema(Product.schema,genericTimeStamps);
        const receiptSchema = mongoose.Schema(Receipt.schema,genericTimeStamps)

        this.models = {
            [User.model] : mongoose.model(User.model,userSchema),
            [Product.model] : mongoose.model(Product.model,productSchema),
            [Receipt.model] : mongoose.model(Receipt.model,receiptSchema)
        }
    }

    get = (options,entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].find(options)
    }

    getBy = (options,entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].findOne(options);
    }

    save = (document,entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].create(document);
    }

    update = (options, document, entity) =>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not defined in models`);
        return this.models[entity].updateOne(options, document);
    }
}