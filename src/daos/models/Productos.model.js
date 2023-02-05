export default class Product {
    static get model(){
        return "products"
    }
    static get schema(){
        return{
            title:{
                type: String,
                required: true
            },
            description:{
                type: String,
                required:true
            },
            code:{
                type:String,
                required:true
            },
            thumbnail:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            stock:{
                type:Number,
                required:true
            },
            id:{
                type:Number
            }
        }
    }
}