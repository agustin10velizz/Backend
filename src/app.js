import express from 'express';

import ProductosRouter from './routes/productos.router.js';
import chatRouter from "./routes/chat.router.js"
import loginRouter from "./routes/login.js"
import objectProcessRouter from "./routes/objectProcess.js"

import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"

import __dirname from './utils.js';

import productosManager from "./managers/productoManager.js"
import { addLogger, logger } from "./utilss/logger.js";

import { Server } from "socket.io";

import MongoStore from "connect-mongo";
import session from "express-session";
import passport from "passport";
import initializePassport from "./configPass.js";
import config from "./config/config.js";
import os from "os";
const CPUs = os.cpus().length;


const app = express(); //inciar el aplicativo
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>console.log(`Se creo la pagina ${PORT}`)) //Poner al aplicativo a escuchar


app.use(express.json())
app.use(express.static(__dirname+'/public'))
app.use(addLogger)
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.set("views",__dirname+"/public/ejs");
app.get("/",async(req,res)=>{
    res.render("index")
});

const productosService = new productosManager();
app.use("/api/productos",ProductosRouter);
app.use("/",loginRouter)
app.use("/",chatRouter)
app.use("/",objectProcessRouter)
app.use("/",viewsRouter)
app.use("/",sessionsRouter)
const io = new Server(server);

/*app.use(session({ACA DEBERIA PONER SERVER
    store:MongoStore.create({
        mongoUrl:`mongodb+srv://
        ttl:6000,
    }),
    secret:`${config.sessions.SECRET}`,
    saveUnitialized:false,
    resave:false
}))*/
initializePassport();
app.use(passport.initialize());
app.use(passport.session())









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