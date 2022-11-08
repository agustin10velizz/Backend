import express from 'express';
import ProductosRouter from './routes/productos.router.js';
import __dirname from './utils.js';
import Manager from './Manager/Manager.js';

const app = express(); //inciar el aplicativo
const server = app.listen(8080,()=>console.log("Se creo la pagina")) //Poner al aplicativo a escuchar


app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended:true}))

app.use("/api/productos", ProductosRouter)

app.set("views",`${__dirname}/views`);
app.set('view engine', 'ejs');


app.get("/",(req,res)=>{
    res.render("formulario")
})

const productoServicio = new Manager();
app.get("/productos", async(req,res)=>{
    const productosArray = await productoServicio.getAll()
    res.render("history",{productosArray})
})