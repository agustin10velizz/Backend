import UserDAO from "../dao/User.dao.js"
import RecepitDAO from "../dao/Receipt.dao.js"
import ProductDAO from "../dao/Producto.dao.js"
import MailingService from "../services/MService.js"
import { json } from "express"

const productService = new ProductDAO()
const userService = new UserDAO()
const receiptService = new RecepitDAO()
const mailer = new MailingService()


const addToCart = async(req,res)=>{
    const pid = JSON.parse(req.params.id)
    const userInfo = req.session.user.email
    await userService.addProductToCart(userInfo,pid,1)
    res.redirect("/products")
}

const deleteProductFromCart = async(req,res)=>{
const pid = JSON.parse(req.params.id)
const userInfo =req.session.user.email
await userService.deleteProductFromCart(userInfo,pid)
res.redirect("/cart")
}

const deleteCart = async(req,res)=>{
const userInfo = req.session.user.email
await userService.deleteCart(userInfo)
res.redirect("/cart")
}

const buyCart = async(req,res)=>{

    const userInfo = req.session.user.email
    const user = await userService.getUserBy({email:userInfo})
    const products = []
    for (let index = 0; index < user.cart.length; index++) {
        const oneProduct = await productService.getProductsBy({id:user.cart[index].productId})
            const finalProduct = {
                title:oneProduct.title,
                thumbnail:oneProduct.img,
                price:oneProduct.price*user.cart[index].cantidad,
                quantity: user.cart[index].cantidad,
                productId:user.cart[index].productId
            }
            products.push(finalProduct)
    }
    const sum = products.reduce((accumulator, object) => {
        return accumulator + object.price;
    }, 0);
    const receipt = {
        productDetails:products,
        receiptId: Math.random().toString(16).slice(2),
        finalPrice:sum
    }
    await receiptService.saveReceipt(receipt)
    await userService.deleteCart(userInfo)
    const html = receipt.productDetails.map(products=>`
    <div>
    <h2>${products.title}</h2>
    <p>Amount: ${products.cantidad}</p>
    <h3>Subtotal:${products.precio}</h3>
    </div>
    `).join("")
    mailer.sendSimpleMail({
        from:"ecommerce",
        to:userInfo,
        subject:`New order from ${req.session.user.name}, email ${userInfo}`,
        html:`
        <div id="details">${html}</div>
        <h1>Precio final: ${receipt.finalPrice}</h1>
        <p>Su recibo de id:${receipt.receiptId}<p>
        `
    })
    res.redirect("/cart")
}

export default {
    addToCart,
    deleteProductFromCart,
    deleteCart,
    buyCart
}