import UserDAO from "../dao/User.dao.js";
import uploader from "../services/upload.js";
import config from "../config/dotenvConfig.js"
import { json } from "express";

const PORT = process.env.PORT || config.app.PORT || 8080
const userService = new UserDAO();

const register =async(req,res)=>{
    res.redirect("/login")
}

const login = async(req,res)=>{
    req.session.user = {
        name: req.user.name,
        email: req.user.email,
        phone_number: req.user.phone_number,
        imageURL: req.user.imageURL,
        age: req.user.age,
    }
    res.redirect("/products")
}


export default{
    register,
    login,
}