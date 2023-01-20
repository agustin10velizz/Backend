import express from 'express';

import ProductosRouter from './routes/productos.router.js';
import chatRouter from "./routes/chat.router.js"
import loginRouter from "./routes/login.js"
import objectProcessRouter from "./routes/objectProcess.js"


import __dirname from './utils.js';

import productosManager from "./managers/productoManager.js"
import ChatManager from "./managers/chatManager.js";

import { Server } from "socket.io";
import containerSQL from "./container/containerSQL.js"
import sqliteOptions from "./DB/knex.js";

import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import initializePassport from "./configPass.js";
import config from "./config/config.js";
import {addLogger} from "./utils/logger.js";
import cluster from "cluster"
import os from "os";
const CPUs = os.cpus().length;


const app = express(); //inciar el aplicativo
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>console.log(`Se creo la pagina ${PORT}`)) //Poner al aplicativo a escuchar


app.use(express.json())
app.use(express.static(__dirname+'/public'))

app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.get("/",async(req,res)=>{
    res.render("index")
});

const productosService = new productosManager();
app.use("/api/productos",ProductosRouter);
app.use("/",loginRouter)
app.use("/",chatRouter)
app.use("/",objectProcessRouter)
const io = new Server(server);

/*app.use(session({     ACA DEBERIA PORNER EL LINK DE MI SERVER PERO NOSE COMO HACERLO
    store:MongoStore.create({
        mongoUrl:"",
        ttl:600,
    }),
    secret:"CoderSecret",
    saveUnitialized:false,
    resave:false
}))*/

initializePassport();
app.use(passport.initialize());
app.use(passport.session())


const productoSQL = new containerSQL(sqliteOptions, "productos")
const messagesSQL = new containerSQL(sqliteOptions, "messages")
const messages = []
app.get("/productos",async(req,res)=>{
    let productos = await productoSQL.getAll();
res.render("productos",
    {
    productos
    }
        )
    });


app.get("/*",(req,res)=>{
        req.logger.warning("Se entró a una ruta inexistente con el método "+ req.method +": " + req.url)
    })
app.get("/chat",(req,res)=>{
    res.render("chat");
})
const chatService = new ChatManager();
io.on("connection", async socket=>{
    let productos = await productoSQL.getAll()
    socket.emit("productos", await productoSQL.getAll())

    socket.on("message", async data=>{
        await messagesSQL.addProduct(data);
        const messagesC = await messagesSQL.getAll();
        io.emit("logs",messagesC);
    })
    socket.emit("logs", await messagesSQL.getAll());
    socket.on("authenticated",data=>{
        socket.broadcast.emit("newUserConnected", data);
    })
})


/*if(cluster.isPrimary){
        console.log("Proceso primario ejecutándose con PID " + process.pid)
        for(let i=0;i<CPUs;i++){
            cluster.fork();
         }
        cluster.on("exit",()=>console.log("Proceso muerto"))
     }else{
     console.log("Proceso worker ejecutado con PID "+process.pid)
      app.listen(config.app.PORT,()=>console.log("Listening on "+ config.app.PORT))
   }*/