import { Router } from "express";
import productoManager from "../Manager/producto.Manager.js"
import sqliteOptions from "../DB/knex.js"
import containerSQL from "../container/ContainerSql.js"
import uploader from "../services/upload.js";


const productoServicio = new productoManager();
const router = Router();
const productoSQL = new containerSQL(sqliteOptions,"productos")

router.get('/',async (req,res)=>{
    let result = await productoSQL.getProducts()
    res.send(result);
})

router.post("/",uploader.single("image"),async(req,res)=>{
    let product = req.body;
    product.precio = parseInt(product.precio);
    const parsedProduct = JSON.parse(JSON.stringify(product))
    const result = await productoSQL.addProduct(parsedProduct);
    res.send({status:"success", message:result});
})




router.get("/:pid",async(req,res)=>{
    const {pid} = req.params
    const id = parseInt(pid)
    const existsProduct = await productoServicio.exists(id);
if(!existsProduct) return res.status(404).send({status:"error",error:"Producto no encontrado"})
    const product = await productoServicio.getProductById(id)
    res.send({status:"success",payload:product})
})



router.post("/",async(req,res)=>{
    if (admin) {
        const {title,description,thumbnail,price,stock}= req.body;
    if(!title||!description||!thumbnail||!price||!stock) return res.status(400).send({status:"error",error:"Incompleto"})
    let timestamp = Date.now();
    let code = Math.random().toString(16).slice(2)
    const productToInsert ={
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock
    }
    const result = await productoServicio.addProduct(productToInsert);

    res.send({status:"success",payload:result})
    } else {
        res.send({status:"error",error:"Admin only"})
    }
})

router.put("/:pid",async(req,res)=>{
    if(admin){
        const {pid} = req.params
        const id = parseInt(pid)
        const existsProduct = await productoServicio.exists(id);
        if(!existsProduct) return res.status(404).send({status:"error",error:"Product not found"})
        const {title,description,thumbnail,price,stock}= req.body;

    if(!title||!description||!thumbnail||!price||!stock) return res.status(400).send({status:"error",error:"Incomplete values"})
    let timestamp = Date.now();
    let code = Math.random().toString(16).slice(2)

    const productToPut ={
        timestamp,
        title,
        description,
        code,
        thumbnail,
        price,
        stock
    }
    const result = await productoServicio.putProduct(productToPut, id)
    res.send({status:"success",payload:result})
    }else{
        res.send({status:"error",error:"Incompleto"})
    }
})

router.delete("/:pid",async(req,res)=>{
    if(admin){
        const {pid} = req.params
        const id = parseInt(pid)
        const existsProduct = await productoServicio.exists(id);
        if(!existsProduct) return res.status(404).send({status:"error",error:"Producto no encontrado"})
        const deletedProduct = productoServicio.deleteById(id)
        res.send({status:"succes",payload:deletedProduct,message:"Producto eliminado correctamente"})
    }else{
        res.send({status:"error",error:"Incompleto"})
    }
})

export default router