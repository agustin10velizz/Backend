import {Router} from "express"
import viewsController from "../controller/views.controller.js"

const router = Router()

router.get("/login",viewsController.login)

router.get("/register",viewsController.register)

router.get("/failedregister",viewsController.failedRegister)

router.get("/failedlogin",viewsController.failedLogin)

router.get("/",viewsController.index)

router.get("/products",viewsController.products)

router.get("/logout",viewsController.logout)

router.get("/cart",viewsController.cart)

export default router