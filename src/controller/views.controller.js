import ProductDAO from "../dao/Producto.dao.js"
import UserDAO from "../dao/User.dao.js"

const userService = new UserDAO()
const productService = new ProductDAO()

const login = (req,res)=>{
    res.render("login")
}
const register = (req,res)=>{
    res.render("register")
}
const failedLogin = (req,res)=>{
    res.render("failedLogin")
}
const failedRegister = (req,res)=>{
    res.render("failedRegister")
}

const index = async(req,res)=>{
    res.render("index")
}

const notExists = async(req,res)=>{
    req.logger.warning("Se ingresó una ruta inexistente con el método "+ req.method +": " + req.url)
    res.send("Este sitio no existe")
}

const products = async(req,res)=>{
    const userInfo = req.session.user
    const products = await productService.getProducts()
    res.render("products",{user:userInfo,products:products})
}

const logout = async(req,res)=>{
    req.session.destroy(err=>{
        if(!err) res.redirect("/login")
        else res.send({status:"error",body:err})
    })
}

const cart = async(req,res)=>{
    const userInfo = req.session.user
    if(userInfo){
        const user = await userService.getUserBy({email:userInfo.email})
        let productInCart = []
for (let index = 0; index < user.cart.length; index++) {
    const oneProduct = await productService.getProductsBy({id:user.cart[index].productId})
        const finalProduct = {
            title:oneProduct.titulo,
            thumbnail:oneProduct.img,
            price:oneProduct.price*user.cart[index].cantidad,
            quantity: user.cart[index].cantidad,
            id:user.cart[index].productId
        }
        productInCart.push(finalProduct)
}
const sum = productInCart.reduce((accumulator, object) => {
    return accumulator + object.price;
}, 0);

        res.render("cart",{user:user,products:productInCart,finalPrice:sum})
    }else{
        res.render("cart",{user:false})
    }
}

export default{
    login,
    register,
    failedLogin,
    failedRegister,
    index,
    notExists,
    products,
    logout,
    cart
}