import express from 'express';
import ProductosRouter from './routes/productos.router.js';
import __dirname from './utils.js';

const app = express(); //inciar el aplicativo
const server = app.listen(8080,()=>console.log("Se creo la pagina")) //Poner al aplicativo a escuchar




app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use("/api/productos", ProductosRouter)



