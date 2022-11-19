import fs from "fs"
import __dirname from "../utils.js";

 

export default class productoManager{

    constructor(){
        this.path = `${__dirname}/files/products.json`;
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
        const products = await this.readProducts();
        const product = products.find(pr => pr.id === id);

        return product;
    }
    addProduct = async(product) =>{
        let products = await this.readProducts();
        if(products.length===0) product.id = 1;
        else product.id = products[products.length-1].id + 1;
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products,null,"\t"))
    }

    deleteById = async (id) =>{
        if(!id) {
        return{
        status:"error",
        message: "ID is required",
        };
        }
        if (fs.existsSync(this.path)) {
            const products = await this.readProducts()
        let newProducts = products.filter((product) => product.id != id)
        await fs.promises.writeFile(
        this.path,
        JSON.stringify(newProducts, null, "\t")
        );
        return{
        status: "success",
        message:"Product deleted successfully",
        }
        } else{
        return{
        status: "error",
        message: "No prodcuts found",
        }
        }
        }

        putProduct = async (product, id) =>{
            const products = await this.readProducts()
            let newProduct = products.map(element =>{
                if(element.id == id){
                    return {...product, id:id}
                }else{
                    return element
                }
            })
            newProduct = JSON.stringify(newProduct, null, "\t")
            await fs.promises.writeFile(this.path, newProduct)
        }

}