import {connectDB}  from '@utils/database'
import Prompt from '@models/promptModel'

export const GET = async (req,{params}) => {
try {
    const {id} = params;
    console.log(id);
    console.log(params);
    await connectDB();
    const prompts = await Prompt.find({creator:id}).populate("creator","userName email image");
    console.log(prompts);

    console.log("Prompt of profile fetched successfully");
    return new Response(JSON.stringify(prompts),{status:200});
    
} catch (error) {
    console.log(error); 
    return new Response("An error occurred. Failed to fetch prompts in profile",{status:500});
}

}