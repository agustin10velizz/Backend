import { Router } from "express";
import uploader from "../services/upload.js";
import productoManager from "../Manager/Manager.js"
import { Server } from "socket.io";


const productoServicio = new productoManager();
const router = Router();


router.get('/',async (req,res)=>{
    let result = await productoServicio.getAll()
    res.send(result);
})


router.get("/:id",async(req,res)=>{
    let id = req.params.id
    if(isNaN(id)) return res.status(400).send ({status:"error", error:"producto no encontrado"})
    let result = await productoServicio.getByID(id)
    res.send(result)
})



router.post("/:id",uploader.single("img"),async(req,res)=>{
    const img = req.protocol+"://"+req.hostname+':8080/image'+req.file.filename
    let producto = req.body;
    producto.img = img;
    producto.precio = parseInt(producto.precio);
    const result = await productoServicio.save(producto);
    res.send({status:"bien hecho", message:"prodcuto agregado"});
})

router.put("/:id",async(req,res)=>{
   let {id} = req.params;
   let producto = req.body;
   await productoServicio.putFile(producto, id)
   res.send("producto actualizado")
})

router.delete("/:id",async(req,res)=>{
   let id = req.params.id;
   if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalido type"})
   let result = await productoServicio.deleteById(id)
       res.send(result)
})

export default router