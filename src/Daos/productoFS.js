import fs from "fs"
import __dirname from "../utils.js"

export default class ProductoManager {

    constructor() {
        this.path = `${__dirname}/json/producto.json`;
        this.init(); 
    }

    init = async() =>{
        if(!fs.existsSync(this.path)) await fs.promises.writeFile(this.path,JSON.stringify([]))
    }

    readProducts = async() =>{
        let data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }
    getProducts = async() =>{
        return this.readProducts();
    }
    getProductById = async(id)=>{
        const productos = await this.readProducts();
        const producto = productos.find(pr => pr.id === id);

        return producto;
    }

    exists = async(id) =>{ 
        let productos = await this.readProducts();
        return productos.some(producto => producto.id === id) 
    }

    addProduct = async(product) =>{
        let productos = await this.readProducts();
        if(productos.length===0) product.id = 1;
        else product.id = productos[productos.length-1].id + 1;
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productos,null,"\t"))
    }

    deleteById = async (id) =>{
        if(!id) {
        return{
        status:"error", message: "ID is required",
        };
        }
        if (fs.existsSync(this.path)) {
            const productos = await this.readProducts()
        let newProducts = productos.filter((product) => product.id != id)
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(newProducts, null, "\t")
        );
        
        return{
        status: "success",message:"Produco eliminado correctamente",
            }
         } 
        else{
        return{
        status: "error", message: "Producto no encontrado",
                 }
            }
        }

        putProduct = async (product, id) =>{
            const productos = await this.readProducts()
            let newProducto = productos.map(element =>{
                if(element.id == id){
                    return {...product, id:id}
                }else{
                    return element
                }
            })
            newProducto = JSON.stringify(newProducto, null, "\t")
            await fs.promises.writeFile(this.path, newProducto)
        }
}