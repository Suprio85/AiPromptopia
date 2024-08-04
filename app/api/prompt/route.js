import {connectDB}  from '@utils/database'
import Prompt from '@models/promptModel'

export const GET = async (req,res) => {
try {
    await connectDB();
    const prompts = await Prompt.find().populate("creator","userName email image");
    console.log(prompts);


    return new Response(JSON.stringify(prompts),{status:200});
    
} catch (error) {
    console.log(error); 
    return new Response("An error occurred. Failed to fetch prompts",{status:500});
}

}