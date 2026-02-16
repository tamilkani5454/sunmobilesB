import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const ConnectDB=async(req,res)=>{
    try{
        
        await mongoose.connect(process.env.MONGO_URI)
    }catch(error){
        return;
    }
}
