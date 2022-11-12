const socket = io()

const productTable = document.getElementById("productTable")

socket.on("productos", data =>{
    let product = ""
    data.forEach(producto=>{
        product += 
        `<div>
        <p> Título: ${producto.titulo} </p>
        <p> Precio: $${producto.preci} </p>         
        <p> Imagen: <img src=${producto.image} > </p>
        </div>`
        productTable.innerHTML = product
    })
})