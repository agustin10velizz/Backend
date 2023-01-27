import receiptModel from "./models/Receipt.model.js";

export default class RecepitDAO{
    saveReceipt = async(recepit)=>{
        const savedReceipt = await receiptModel.create(recepit)
        return savedReceipt
    }

    getReceipt = async(rid)=>{
        const receipt = await receiptModel.findOne({receiptId:rid})
        return receipt
    }
}