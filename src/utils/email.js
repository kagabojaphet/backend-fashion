import nodemailer from "nodemailer"

const sendemail=async(alluserinfo,newsdata)=>{

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
        to:alluserinfo.email,
        subject:`${alluserinfo.firstname} ura presenting ryari bro`,
        html:`<p>Dear, <b>${alluserinfo.firstname} ${alluserinfo.lastname}</b></p><br><br>
        <p> igihe cyageze sha <b>${newsdata.productname}</b></p><br><br>
        <p>click here <a href="http:kfashion.com">kfashion</a></p>`
    };
    transport.sendMail(mailoptions,function(err,info){
        if(err){
            console.error(err);
        }
        else{
            console.info(info);
        }
    });
}
export default sendemail