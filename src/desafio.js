const Manager = require("./manager");
const manager = new Manager();


//Propiedades del nuevo producto que se quiera guardar
let producto ={
    titulo: "Cafetera",
    precio: 6000,
    img:"https://arcencohogar.vtexassets.com/arquivos/ids/325019/Cafetera-AC950-lateral-7793862010708.jpg?v=637922109998500000",
}


//Guardar un nuevo producto
 //manager.save(producto).then((response) =>{
  // console.log(response)
 //});

 
 //mostrar un producto por id (getBYid)
 //manager.getById(2).then((response) =>{
 //console.log(response);   })

 
//Mostrar TODOS los produtcos
// manager.getAll().then((response) =>{
//     console.log(response)
// })

  //Eliminar un producto por su ID
// manager.deleteById(1).then((response) => {
//     console.log(response);
//     });


//Eliminar TODOS los productos
// manager.deleteAll()