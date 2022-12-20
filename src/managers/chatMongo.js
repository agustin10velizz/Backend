import mongoose  from "mongoose";

const URL = ' mongodb://127.0.0.1:27017'
const connection = mongoose.connect(URL,err=>{
    if(err) console.log(err);
    else console.log("Connected to Mongo ")
})

const schema = new mongoose.Schema({
    id:{
        type:String,
    },
    messages:{
        type:Array,
    }
    })
    
    const chatModel = mongoose.model("chats",schema)
    
    
    export default class ChatManager{
    
        addChat = async(message)=>{
            await chatModel.updateOne({id:"mensajes"}, {$push:{messages:{message}}})
        }
    
        allChat = async()=>{
            const chats = await chatModel.find({id:"mensajes"})
            return chats
        }
    }
    