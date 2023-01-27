import productModel from "./models/Productos.model.js";
import userModel from "./models/User.model.js";
import UserDAO from "./User.dao.js";

export default class ProductDAO{
    getProducts = async()=>{
        const products = await productModel.find()
        return products
    }

    getProductsBy = async(params) =>{
        const product= await productModel.findOne(params)
        return product
    }

    saveProduct = async(product)=>{
        const savedProduct = await userModel.create(product);
        return savedProduct
    }
}