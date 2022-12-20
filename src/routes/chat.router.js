import {Router} from "express";
import __dirname from "../utils.js";
import ChatMongoManager from "../Managers/chatMongo.js";
import { normalize, schema} from "normalizr"

const router = Router()

const ChatMongoServicio = new ChatMongoManager

router.get("/mongoChat", async(req,res)=>{
        res.render("mongoChat")
})

router.post("/api/messages", async(req,res)=>{
    const {id, nombre, apellido, edad} = req.body;
    if(!id||!nombre||!apellido||!edad) return res.status(400).send({status:"error",error:"Incomplete values"})
    const chatToInsert ={
        author:{
            id:id,
            nombre: nombre,
            apellido: apellido,
            edad: parseInt(edad),
            
        },
        
    }
    const addedChat = ChatMongoServicio.addChat(chatToInsert)
    res.send({status:"success",payload:addedChat,message:"Message added successfully"})
})

router.get("/api/messages/normalizr", async(req,res)=>{
    const messagesMongo = await ChatMongoServicio.allChat()
    const messages = messagesMongo.map(m=>{
        const newMessage = {
            id:m.id,
            messages: m.messages,
            _id:m._id.valueOf()
        }
        return newMessage
    })
    const finalMessage = messages[0]
    const user = new schema.Entity("users")
    const message = new schema.Entity("message", {
        author:user
    })
    const messagesSchema = new schema.Entity("messages",{
        messages: [message]
    })

    const normalizedMessages = normalize(messages,messagesSchema);
    res.send({payload:normalizedMessages})
})

export default router