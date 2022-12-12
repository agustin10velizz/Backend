import fs from "fs";
import __dirname from "../utils.js";

export default class CarritoManager {
    constructor() {
        this.path = `${__dirname}/json/carrito.json`
        this.init();
    }

    init = async() =>{
        if(!fs.existsSync(this.path))
         await fs.promises.writeFile(this.path, JSON.stringify([]));
    }

    readFile = async() =>{
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    getCarts = async()=>{
        return this.readFile();
    }

    getCartById = async(id) =>{
        const carts = await this.readFile();
        const cart = carts.find(cart =>cart.id === id);
        return cart.cartProductos;
    }

    exists = async(id) =>{
        const carts = await this.readFile();
        return carts.some(cart => cart.id === id);
    }

    addCart = async () =>{
        const carts = await this.readFile();
        const newCart = {
            id : carts.length===0 ? 1 : carts[carts.length - 1].id + 1,
            cartProducts: [] 
        }
        carts.push(newCart);
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"))
        return newCart
    }

    checkProduct = async(cid)=>{
        const carts = await this.readFile();
        const cart = carts.find(cart=> cart.id === cid)
        const exists = cart.cartProductos.some(cProduct=> cProduct.id === pid)
        return exists
    }

    updateCartwithProduct = async(cid,Cantidad)=>{
        const carts = await this.readFile();
        const cart = carts.find(cart=> cart.id === cid)

        const productoInCart = cart.cartProductos.find(cProduct=> cProduct.id === pid)
        const actualCantidad = productoInCart.Cantidad
        const finalCantidad = actualCantidad + Cantidad
        
        productoInCart.Cantidad = finalCantidad
        console.log(cart.cartProductos)
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"))
        return cart.cartProductos
    }

    addProductToCart = async(cid,Cantidad) =>{
        const carts = await this.readFile();
        let updatedCart;
        const newCarts = carts.map(cart=>{
            if(cart.id===cid){
                updatedCart = cart;
                const newProducto = {
                    id: pid,
                    Cantidad:Cantidad
                }
                cart.cartProductos.push(newProducto);
            }
            return cart;
        })
        await fs.promises.writeFile(this.path,JSON.stringify(newCarts,null,"\t"))
        return updatedCart
    }

    deleteCartById = async (id) =>{
        if(!id) {
        return{
        status:"error", message: "ID is required",
         };
        }

        if (fs.existsSync(this.path)) {
            const carts = await this.readFile()
        let newCarts = carts.filter((cart) => cart.id != id)
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(newCarts, null, "\t")
        );

        return{
        status: "bien hecho",message:"Producto borrado correctamente",
        }
        }
         else{
        return{
        status: "error", message: "Producto no encontrado",
        }
        }
        }

    deleteById = async (cid,pid) =>{
        const carts = await this.readFile();
        const cart = carts.find(cart=> cart.id === cid)
        const productoInCart = cart.cartProductos.find(cProduct=> cProduct.id === pid)
        const indexOfProduct= cart.cartProductos.indexOf(productoInCart)
        cart.cartProductos.splice(indexOfProduct,1);
        await fs.promises.writeFile(this.path,JSON.stringify(carts,null,"\t"))
        return cart.cartProductos
    }
}
