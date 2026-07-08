import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport(
    {
    secure:true,
    host:"smtp.gmail.com",
    port:465,
    auth:{
        user:"donaldmahanta65@gmail.com",
        pass:"fokwkmivsimdnudm"
    }
    }
);

function sendMail(to,sub,msg){
    transporter.sendMail({
        to:to,
        subject:sub,
        html:msg
    })
}

sendMail("donaldmahanta65@gmail.com","OTP Verification", "this is a mail sent through nodemailer which will be further used to send otp for notesapp");