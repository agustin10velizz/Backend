import {  Router} from "express";

import productosManager from "../managers/productoManager.js"
import uploader from "../services/upload.js";
import __dirname from "../utils.js";

import containerSQL from "../Container/containerSQL.js";
import sqliteOptions from "../DB/knex.js";
import { generateProduct } from "../managers/productoFaker.js";

const router = Router()
const productSQL = new containerSQL(sqliteOptions, "productos")
const productosService = new productosManager();

router.get("/test",async(req,res)=>{
    let productos = []
    for(let i=0;i<5;i++){
        productos.push(generateProduct());
    }
    res.render("productosFaker",
    {
        productos
    }
    )
});
router.post("/",uploader.single("img"),async (req,res)=>{
    let producto = req.body;
    producto.precio = parseInt(producto.precio);
    const parsedProducto = JSON.parse(JSON.stringify(producto))
    const result = await productSQL.addProduct(parsedProducto);
    res.send({status:"success", message:result});
})
router.get("/",async(req,res)=>{
    let result = await productSQL.getAll();
    res.send(result)
})
router.get("/:id",async(req,res)=>{
    let id = req.params.id
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
    let result = await productosService.getById(id)
    res.send(result)
})
router.put("/:id",async(req,res)=>{
    let {id} = req.params;
    let product = req.body;
    await productosService.putFile(product, id)
    res.send("Producto actualizado")
})
router.delete("/:id",async(req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
let result = await productosService.deleteById(id)
    res.send(result)
})
export default router