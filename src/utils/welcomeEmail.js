import nodemailer from "nodemailer"

const welcomeEmail=async(userinfo)=>{
    let transport=nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        },
    });
    let mailoptions={
        from:process.env.EMAIL,
        to:userinfo.email,
        subject:`${userinfo.firstname} Login Successfuly done`,
        html:`<p> Dear, <b>${userinfo.firstname}</b></p><br><br>
        <p>Your login successfuly you can continue to next step ,so Good Luck ${userinfo.firstname}.Thank You </p>`

    };
    transport.sendMail(mailoptions,function(err,info){
        if(err){
            console.log(err);
        }
        else{
            console.log(info)
        }
    });
}
export default welcomeEmail