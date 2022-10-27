import express from 'express';
import fs from "fs"

const app = express(); //inciar el aplicativo
const server = app.listen(8080,()=>console.log("Listening on Express :)")) //Poner al aplicativo a escuchar

let data = fs.readFileSync("./products.json")
let productos = JSON.parse(data)

app.get('/productos',(req,res) =>{
    res.send(productos)
})

app.get('/productos/productoRamdom', (req,res)=>{
 let RamdomProducto = productos[Math.floor(Math.random()*productos.length)];
 res.send(RamdomProducto)
})
