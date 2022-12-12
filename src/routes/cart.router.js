import { Router } from "express";
import CarritoManager from "../daos/carritoFS.js"
import ProductoManager from "../daos/productoFS.js";
import PERSISTENCIA from "../daos/index.js";

const router = Router()
const ProductoServicio = new ProductoManager
const CarritoServicio = new CarritoManager 




if(PERSISTENCIA === "FS"){
    router.get("/",async(req,res)=>{
        const newCart = await CarritoServicio.addCart();
        const cartId = newCart.id
        res.send({status:"success",payload:newCart, cartId:cartId})
    })
    
    router.delete("/:cid",async(req,res)=>{
        const {cid} = req.params
        const id = parseInt(cid)
        const existsCart = await CarritoServicio.exists(id);
        if(!existsCart) return res.status(404).send({status:"error",error:"Cart not found"})
        const deletedCart = CarritoServicio.deleteCartById(id)
        res.send({status:"success",payload:deletedCart,message:"Cart deleted successfully"})
    })
    
    router.get("/:cid/products",async(req,res)=>{
        const {cid} = req.params
        const id = parseInt(cid)
        const existsCart = await CarritoServicio.exists(id);
        if(!existsCart) return res.status(404).send({status:"error",error:"Cart not found"})
        const cart = await CarritoServicio.getCartById(id)
        res.send({status:"success",payload:cart})
    })
    
    router.post("/:cid/products",async(req,res)=>{
        const {cid} = req.params
        const {id,quantity}= req.body;
        if(!id||!quantity) return res.status(400).send({status:"error",error:"Incomplete values"})
        const cartId = parseInt(cid)
        const productId = parseInt(id)
        const quantityProducts = parseInt(quantity)
        const existsCart = await CarritoServicio.exists(cartId);
        const existsProduct = await ProductoServicio.exists(productId);
        if(!existsCart) return res.status(404).send({status:"error",error:"Cart not found"})
        if(!existsProduct) return res.status(404).send({status:"error",error:"Product not found"})
        const productCheck = await CarritoServicio.checkProduct(cartId, productId)
        if(productCheck){
            const result = await CarritoServicio.updateCartwithProduct(cartId,productId,quantityProducts)
            res.send({status:"success",payload:result})
        }else{
            const result = await CarritoServicio.addProductToCart(cartId,productId,quantityProducts);
            res.send({status:"success",payload:result})
        }
    })
    
    router.delete("/:cid/products/:pid",async(req,res)=>{
        const {cid,pid} = req.params
        const cartId = parseInt(cid)
        const productId = parseInt(pid)
        const existsCart = await CarritoServicio.exists(cartId);
        const existsProduct = await ProductoServicio.exists(productId);
        if(!existsCart) return res.status(404).send({status:"error",error:"Cart not found"})
        if(!existsProduct) return res.status(404).send({status:"error",error:"Product not found"})
        const result = await CarritoServicio.deleteById(cartId,productId)
        res.send({status:"sucess",payload:result})
    })
}




export default Router