const socket = io({
    autoConnect:false
});

let user;
const chatBox = document.getElementById("chatBox");
Swal.fire({
    title:"Identificate",
    input:"text",
    text:"Ingresá tu nombre de usuario",
    inputValidator: (value) =>{
        return !value && "ingresá un usuario válido"
    },
    allowOutsideClick:false,
    allowEscapeKey: false,
}).then(result =>{
    user = result.value;
    socket.connect();
    socket.emit("authenticated",user)
})

    chatBox.addEventListener("keyup",e=>{
        if(e.key==="Enter"){
            if(chatBox.value.trim().length>0){
                socket.emit("message",{user, message:chatBox.value.trim()})
                chatBox.value="";
            }
        }
    })

    socket.on("logs",data=>{
        const logsPanel = document.getElementById("logsPanel");
        let message = "";
        data.forEach(msg=>{
            message += `${msg.user} dice: ${msg.message} <br/>`
        })
        logsPanel.innerHTML= message;
    })

    socket.on("newUserConnected", data=>{
        if(!user) return;
            Swal.fire({
                toast:true,
                position:"top-end",
                showConfirmButton:false,
                timer:2000,
                title:`${data} se unió al chat`,
                icon:"success" 
            })
})