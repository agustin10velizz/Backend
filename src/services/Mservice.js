import mailer from "nodemailer";
export default class MailingService{
    constructor(){
        this.client = mailer.createTransport({
            service:"email",
            port:587,
            auth:{
                user:"agusveliz@hotmail.com",
                pass:"12345",
            }
        })
    }

    sendSimpleMail = async({from, to, subject,html,attachments=[]})=>{
        let result = await this.client.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
        return result
    }
}