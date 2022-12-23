import { json, Router, text} from "express";
import __dirname from "../utils.js";
import userModel from "../managers/loginManager.js";

const router = Router()

router.get("/register",(req,res)=>{
    res.render("register")
})

router.post("/register",async(req,res)=>{
    const {email, user, password} = req.body
    if(!email||!user||!password) return res.status(400).send({status:"error",error:"Incomplete Values"})
    const exists = await userModel.findOne({email})
    if(exists) return res.status(400).send({status:"error",error:"User already exists"});
    const fullUser = {
        email,
        user,
        password
    }
    const result = await userModel.create(fullUser);
    res.send({status:"success",payload:result._id})
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    if(!email||!password) return res.status(400).send({status:"error",error:"Incomplete Values"})
    const user = await userModel.findOne({email,password});
    if(!user) return res.status(400).send({status:"error",error:"Wrong user or password"})
    req.session.user = {
        user: user.user,
        email: user.email
    }
    res.send({status:"success", message:"Logueado"})
})

router.get("/profile",async(req,res)=>{
    const userInfo = req.session.user
    console.log(userInfo)
    res.render("profile",{user:userInfo})
})

router.get("/logout",async(req,res)=>{
    req.session.destroy(err =>{
        if(!err) res.redirect("/login")
        else res.send({status:"error",body:err})
    })
})

export default router