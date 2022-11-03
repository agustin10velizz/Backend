import { Router } from "express";


const router = Router();

router.get('/',(req,res)=>{
    const result = manager.getAll()
    res.send();
})



router.get("/:idProductos",(req,res)=>{

})


router.post("/",(req,res)=>{
    const userToInsert = req.body.user;
    console.log(userToInsert)
    res.send("prueba")
})


router.post("/",(req,res)=>{
   
})

router.put("/",(req,res)=>{
   
})

router.delete("/",(req,res)=>{
   
})

export default router