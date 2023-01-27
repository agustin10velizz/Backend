import userModel from "./models/User.model.js";

export default class UserDAO{
    getUsers = async() =>{
        const users= await userModel.find();
        return users
    }

    getUserBy = async(params) =>{
        const user = await userModel.findOne(params)
        return user
    }

    saveUser = async(user)=>{
        const savedUser = await userModel.create(user);
        return savedUser
    }

    checkProduct = async(email,pid)=>{
        const exists = await userModel.find({$and:[{email:email},{cart:{$elemMatch:{productId:pid}}}]}).count()
        if (exists === 0){
            return false
        }else{
            return true
        }
    }

    addProductToCart = async(email,pid,cantidad)=>{
        const exists = await this.checkProduct(email,pid)
        if(exists===true){
            const prodInCart = await userModel.updateOne({email:email, "cart.productId":pid},{$inc:{"cart.$.cantidad":cantidad}})
            return prodInCart
        }else{
            const prodInCart = await userModel.updateOne({email:email},{$push:{cart:{productId:pid,cantidad:cantidad}}})
            return prodInCart
        }
    }

    deleteCart = async(email)=>{
        const deletedCart = await userModel.updateOne({email:email},{$set:{cart:[]}})
        return deletedCart
    }

    deleteProductFromCart = async(email,pid)=>{
        const deletedProduct = await userModel.updateOne({email:email},{$pull:{cart:{productId:pid}}})
        return deletedProduct
    }
}
