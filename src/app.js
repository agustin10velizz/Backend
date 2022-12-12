import express from 'express';
import ProductosRouter from './routes/productos.router.js';
import __dirname from './utils.js';
import cartRouter from "./routes/cart.router.js"


const app = express(); //inciar el aplicativo
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>console.log(`Se creo la pagina ${PORT}`)) //Poner al aplicativo a escuchar


app.use(express.json())
app.use(express.static(__dirname+'/public'))

app.use(express.urlencoded({extended:true}))

app.use("/api/productos", ProductosRouter)
app.use("/api/cart",cartRouter)

