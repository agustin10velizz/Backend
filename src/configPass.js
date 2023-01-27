import passport from "passport";
import local from "passport-local";
import UserDAO from "./daos/models/User.model.js"
import {createHash, validatePassword} from "./utilss/brcypt.js"
import userModel from "../daos/models/User.model.js";

const localStrategy = local.Strategy;
const userService = new UserDAO();
const PORT = process.env.PORT || config.app.PORT || 8080


const initializePassport = ()=>{
    passport.use("register",new localStrategy({passReqToCallback:true,usernameField:"email"},async(req,email,password,done)=>{
        try{
            const {name,adress,age,phone_number,image} = req.body;
            if(!name||!adress||!age||!phone_number) return done(null, false,{message:"Valores Incompletos"})
            const exists = await userService.getUserBy({email})
            if(exists) return done(null,false,{message:"User already exists"})
            const imageURL = req.protocol+"://"+req.hostname+":"+PORT+"/thumbnail/"+req.file.filename;
            const hashedPassword = await createHash(password)
            const fullUser = {
                name,
                adress,
                age,
                phone_number,
                imageURL,
                email,
                password:hashedPassword,
            }
            const result = await userService.saveUser(fullUser);
            done(null, result)
        }catch(error){
            console.log(error)
            done(error)
        }
    }))

    passport.use("login", new localStrategy({usernameField:"email"},async(email,password,done)=>{
        try{
            if(!email || !password) return done(null,false,{message:"Incomplete values"})
            const user = await userService.getUserBy({email})
            if(!user) return done(null,false,{message:"Incorrect password"})
            const isValidpassword = await validatePassword(user,password);
            if(!isValidpassword) return done(null,false,{message:"Incorrect password"})
            done(null,user);
        }
        catch(error){
            done(error)
        }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser(async(id,done)=>{
        let result = await userModel.findOne({_id:id})
        return done(null,result)
    })
}

export default initializePassport