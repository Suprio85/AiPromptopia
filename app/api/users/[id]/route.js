import {connectDB} from '@utils/database'
import userModel from '@models/userModel'


export const GET = async (req,{params}) => {
    try{
        await connectDB();
        const user = await userModel.findById(params.id)

        if(!user){
            console.log("User not found");
            return new Response("User not found",{status:404});
        }
        console.log(user);
        return new Response(JSON.stringify(user),{status:200});
    }catch(error){
        console.log(error);
        return new Response("An error occurred. Failed to fetch prompts in profile",{status:500});
    }
}