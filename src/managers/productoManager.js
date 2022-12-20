import fs from "fs";
import path from "path";
import __dirname from "../utils.js";


const pathToFile = __dirname+"./json/productosFaker.json";

const success = {
    status: "success",
    message: "Producto creado correctamente"
    }

    class Manager {
    save = async (producto) => {
    if(!producto.titulo || !producto.precio || !producto.img){
    return {
    status: "error",
    message: "Falta completar",
        }
    } try {
    if(fs.existsSync(pathToFile)){
    let data = await fs.promises.readFile(pathToFile, "utf-8");
    let productos = JSON.parse(data);
    let id = productos.length +1;
    producto.id = id;
    productos.push(producto);
    await fs.promises.writeFile(pathToFile, JSON.stringify(productos, null, 2))
    return success
        } else {
    producto.id = 1;
    await fs.promises.writeFile (
    pathToFile,
    JSON.stringify([producto], null, 2)
        );
    return success;
         }
    } catch (error){
    return{
    status: "error",
    message: error.message,
             };
        }
    };
    getAll = async () => {
    try {
    if(fs.existsSync(pathToFile)){
    let data = await fs.promises.readFile(pathToFile, "utf-8");
    let productos = JSON.parse(data);
    return{
    status: "success",
    products: productos,
        };
    }else{
    return{
    status:"error",
    message:"Producto no encontrado",
             }
         }
    }catch (error){
    return{
    status: "error",
    message: error.message,
             };
         }
    }
    getById = async(id) =>{
    if(!id) {
    return{
    status:"error",
    message: "Se requiere el ID",
        };
    }
    if (fs.existsSync(pathToFile)) {
    let data = await fs.promises.readFile(pathToFile, "utf-8");
    let products = JSON.parse(data);
    let product = products.find((product) => product.id == id);
    if(product){
    return{
    status:"success",
    product:product,
        };
    }else {
    return {
    status: "error",
    message: "Producto no encontrado",
         };
    }
        }
    }
    deleteById = async (id) =>{
    if(!id) {
    return{
    status:"error",
    message: "Se requiere el ID",
        };
    }
    if (fs.existsSync(pathToFile)) {
    let data = await fs.promises.readFile(pathToFile, "utf-8")
    let productos = JSON.parse(data)
    let newProductos = productos.filter((producto) => producto.id != id)
    await fs.promises.writeFile(
    pathToFile,
    JSON.stringify(newProductos, null, 2)
    );
    return{
    status: "success",
    message:"Producto eliminado correctamente",
        }
    } else{
    return{
    status: "error",
    message: "Producto no encontrado",
             }
        }
    }
    putFile = async (producto, id) =>{
        const allProductos = await this.getAll()
        const productos = allProductos.productos

        let newProducto = productos.map(element =>{
            if(element.id == id){
                return {...producto, id:id}
            }else{
                return element
            }
        })
        newProducto = JSON.stringify(newProducto, null, "\t")
        await fs.promises.writeFile(pathToFile, newProducto)
    }
    deleteAll = async () =>{
    try {
     if(fs.existsSync(pathToFile)){
        await fs.promises.unlink(pathToFile)
     }else{
        return{
            status:"error",
            message:"Producto no encontrado",
                    }
                 }
            }catch (error){
            return{
            status: "error",
            message: error.message,
                 };
            }
    }
}
export default Manager