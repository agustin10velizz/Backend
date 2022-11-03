const fs = require("fs");
const path = require("path");
const pathToFile = "./products.json";



const success = {
    status: "Bien hecho",
    message: "Producto creado"
    }

    class Manager {
    save = async (producto) => {
        if(!producto.titulo || !producto.precio || !producto.img){
            return {
             status: "error",
             message: "Algo raro paso",
             }
        } try {
            if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile, "utf-8");
            let productos = JSON.parse(data);
            let id = productos.length +1;

            producto.id = id;
            productos.push(producto);
            await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
            return success
            } else {
                producto.id = 1;
                await fs.promises.writeFile (
                pathToFile,
                JSON.stringify([producto], null, 2));
                return success;
                }
            } catch (error){
            return{
            status: "error",
            message: error.message,
             };
         }
    };

    //crear funcion para que lea todos los productos

    getAll = async () => {
        try{
            if(fs.existsSync(pathToFile)){
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let productos = JSON.parse(data);
                return{
                    status:"Bien hecho",
                    productos: productos,
                };
            } else{
                return{
                    status:"error",
                    message:"producto no encontrado",
                }
            }
        } catch (error){
            return{
                status:"error",
                message: error.message,
            };
        }
    }


    // crea una funcion para leer el id

    getById = async(id)  =>{
        if(!id){
            return{
                status:"error",
                message: "se requiere el ID",
            };
        }
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile, "utf-8");
            let productos = JSON.parse(data);
            let producto = productos.find((producto) => producto.id == id);
        if(producto){
            return{
                status:"Bien hecho",
                producto:producto,
            };
            } else{
                return{
                    status:"erorr",
                    message: "Producto no encontrado",
                };
            }
        } else{
            return{
                status:"erorr",
                message: "Producto no encontrado"
            };
        }
    };

// elimina un producto  por el id

    deleteById = async (id) =>{
        if(!id){
            return{
                status:"error",
                message:"Se requiere el ID"
            };
        }
        if(fs.existsSync(pathToFile)){
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let productos = JSON.parse(data)
            let newProducto = productos.filter((producto)=> producto.id !=id)
            await fs.promises.writeFile(pathToFile, JSON.stringify(newProducto, null, 2));
            return{
                status:"Bien hecho",
                message:"Producto eliminado"
            }
        } else{
            return{
                status:"error",
                message:"producto no encontrado"
            }
        }
    }

    //borra todos los productos
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


module.exports = Manager;