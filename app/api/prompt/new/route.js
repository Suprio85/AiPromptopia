import {connectDB} from '@utils/database'
import Prompt from '@models/promptModel'


export const POST = async (req,res) => {
    const {userId, prompt , tag } = await req.json();

    try{
        await connectDB();
        const newPrompt = await Prompt.create({
            creator: userId,
            prompt,
            tag
        });

        console.log("Prompt created successfully");
        return new Response(JSON.stringify(newPrompt),{status:201});

    }catch(error){
        console.log(error);
        return new Response("An error occurred.Failed to Create Prompt",{status:500});
    }
}