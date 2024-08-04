import {Schema, model, models} from 'mongoose';



const userSchema = new Schema({
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is already in use"],
    },

    userName:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username is already in use"],
    },
    image:{
        type:String,
        default:"/images/default.png",
    },
    
});


export default models.User || model("User",userSchema);

