import mongoose from "mongoose";
const connectDb = async()=>{
try{
    await mongoose.connect(process.env.MONGODB_URL,)
    console.log("Db connect");
}
catch(error){
    console.log("DB Error");
}
}
export default connectDb;