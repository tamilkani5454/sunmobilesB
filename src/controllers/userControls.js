import bcrypt from "bcrypt"
import users from "../modules/users.js"


export const signUp=async(req,res)=>{
    const{firstName,lastName,phoneNumber,email,password}=req.body
    try{
        const exitUser=await users.findOne({$or:[{email},{phoneNumber}]})
        if(exitUser){
            const errors={}
            if( exitUser.email===email){
                errors.email="email alredy exits"
            }
            if(exitUser.phoneNumber==phoneNumber){
                errors.phoneNumber="phone number alredy exits"
            }
           
            return res.status(400).json({message:"user alredy exits",errors});
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new users({
            firstName:firstName,
            lastName:lastName,
            phoneNumber:phoneNumber,
            email:email,
            password:hashedPassword
        })
        await user.save()
    }catch(error){
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

