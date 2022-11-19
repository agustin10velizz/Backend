import { Router } from "express"
import CartManager from "../Manager/cart.Manager.js";
import ProductManager from "../Manager/producto.Manager.js";

const router = Router()
const productoServicio = new ProductManager();
const cartServicio = new CartManager();

router.post("/",async(req,res)=>{
    const newCart = await cartServicio.addCart();
    const cartId = newCart.id
    res.send({status:"success",payload:newCart, cartId:cartId})
})

router.delete("/:cid",async(req,res)=>{
    const {cid} = req.params
    const id = parseInt(cid)
    const existsCart = await cartServicio.exists(id);

    if(!existsCart) return res.status(404).send({status:"error",error:"Cart no encontrada"})
    const deletedCart = cartServicio.deleteCartById(id)
    res.send({status:"success",payload:deletedCart,message:"Cart eliminado correctamente"})
})

router.get("/:cid/products",async(req,res)=>{
    const {cid} = req.params
    const id = parseInt(cid)
    const existsCart = await cartServicio.exists(id);
    
    if(!existsCart) return res.status(404).send({status:"error",error:"Cart no encontrada"})
    const cart = await cartServicio.getCartById(id)
    res.send({status:"success",payload:cart})
})

router.post("/:cid/products",async(req,res)=>{
    const {cid} = req.params
    const {id,quantity}= req.body;

    if(!id||!quantity) return res.status(400).send({status:"error",error:"Incompleto"})
    const cartId = parseInt(cid)
    const productId = parseInt(id)

    const quantityProducts = parseInt(quantity)
    const existsCart = await cartServicio.exists(cartId);
    const existsProduct = await productoServicio.exists(productId);

    if(!existsCart) return res.status(404).send({status:"error",error:"Cart no encontrada"})
    if(!existsProduct) return res.status(404).send({status:"error",error:"Producto no encontrada"})
    const productCheck = await cartServicio.checkProduct(cartId, productId)
    if(productCheck){
        const result = await cartServicio.updateCartwithProduct(cartId,productId,quantityProducts)
        res.send({status:"success",payload:result})
    }else{
        const result = await cartService.addProductToCart(cartId,productId,quantityProducts);
        res.send({status:"success",payload:result})
    }
})

router.delete("/:cid/products/:pid",async(req,res)=>{
    const {cid,pid} = req.params
    const cartId = parseInt(cid)
    const productId = parseInt(pid)

    const existsCart = await cartServicio.exists(cartId);
    const existsProduct = await productoServicio.exists(productId);

    if(!existsCart) return res.status(404).send({status:"error",error:"Cart no encontrada"})
    if(!existsProduct) return res.status(404).send({status:"error",error:"Producto no encontrada"})
    const result = await cartServicio.deleteById(cartId,productId)
    res.send({status:"sucess",payload:result})
})

export default router