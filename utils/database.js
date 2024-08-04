import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if(isConnected){
        console.log("Using existing connection");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName:"promptdb",
            socketTimeoutMS:45000,
            connectTimeoutMS:45000,
        });
         
        isConnected = true;
        console.log("New connection established");
        
    } catch (error) {
        console.log("Error connecting to database");
        console.log(error); 
    }
}