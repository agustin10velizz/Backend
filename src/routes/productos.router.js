import { Router } from "express"
import ProductoManager from "../daos/productoFS.js";
import PERSISTENCIA from "../daos/index.js";


const router = Router()
const ProductoServicio = new ProductoManager


if(PERSISTENCIA === "FS") {
    router.get("/",async(req,res)=>{
        let productos = await ProductoServicio.getProducts();
        res.send({status:"sucess",payload:productos})
    })
    
    router.get("/:pid",async(req,res)=>{
        const {pid} = req.params
        const id = parseInt(pid)
        const existsProducto = await ProductoServicio.exists(id);
    if(!existsProducto) return res.status(404).send({status:"error",error:"Producto no encontrado"})
        const product = await ProductoServicio.getProductById(id)
        res.send({status:"success",payload:product})
    })
    
    router.post("/",async(req,res)=>{
        if (admin) {
            const {titulo,descripcion,precio}= req.body;
        if(!titulo||!descripcion||!precio) return res.status(400).send({status:"error",error:"Incompleto"})
      
        
        const productToInsert ={
            titulo,
            descripcion,
            precio,
        }
        
        const result = await ProductoServicio.addProduct(productToInsert);
        res.send({status:"success",payload:result})
        } else {
            res.send({status:"error",error:"Admin only"})
        }
    })
    router.put("/:pid",async(req,res)=>{
        if(admin){
            const {pid} = req.params
            const id = parseInt(pid)
            const existsProducto = await ProductoServicio.exists(id);
            if(!existsProducto) return res.status(404).send({status:"error",error:"Producto no encontrado"})
            const {titulo,descripcion,precio}= req.body;
        if(!titulo||!descripcion||!precio) return res.status(400).send({status:"error",error:"Incompleto"})
       
        const productToPut ={
            titulo,
            descripcion,
            precio,
        }

        const result = await ProductoServicio.putProduct(productToPut, id)
        res.send({status:"success",payload:result})
        }else{
            res.send({status:"error",error:"Admin only"})
        }
    })
    router.delete("/:pid",async(req,res)=>{
        if(admin){
            const {pid} = req.params
            const id = parseInt(pid)
            const existsProducto = await ProductoServicio.exists(id);
            if(!existsProducto) return res.status(404).send({status:"error",error:"Producto no encontrado"})
            const deletedProducto = ProductoServicio.deleteById(id)
            res.send({status:"succes",payload:deletedProducto,message:"Producto eliminado correctamente"})
        }else{
            res.send({status:"error",error:"Admin only"})
        }
    })
}else{
    console.log("Error, elija una válida")
}

export default router