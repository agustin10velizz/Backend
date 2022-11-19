import express from 'express';
import ProductosRouter from './routes/productos.router.js';
import __dirname from './utils.js';
import Manager from './Manager/producto.Manager.js';
import { Server } from "socket.io";
import ChatRouter from "./routes/chat.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express(); //inciar el aplicativo
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>console.log(`Se creo la pagina ${PORT}`)) //Poner al aplicativo a escuchar


app.use(express.json())
app.use(express.static(__dirname+'/public'))

app.use(express.urlencoded({extended:true}))

app.use("/api/productos", ProductosRouter)
app.use("/api/cart",cartRouter)


app.set("views",`${__dirname}/views`);
app.set('view engine', 'ejs');

app.get("/", (req,res)=>{
    res.render("formulario")
})



const productoServicio = new Manager();

app.get("/productos", async(req,res)=>{
    const productosArray = await productoServicio.getAll()
    res.render("history",{productosArray})
})

const io = new Server(server) 
app.use ("/chat",ChatRouter)

const mensajes = [];

io.on("connection", async socket =>{
    let productos = await productoServicio.getAll();
    let productosArray = productos.products

    socket.emit("productos",productosArray);
    socket.emit("logs",mensajes);
    socket.on ("mensaje", async data =>{
        mensajes.push(data);
        io.emit("logs",mensajes);
    })
    socket.on("authenticated",data=>{
        socket.broadcast.emit("newUserConnected", data);
    })
})
