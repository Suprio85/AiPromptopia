import { connectDB } from "@utils/database";
import Prompt from "@models/promptModel";


export const GET = async (req,{params}) => {
    try{
        const promptId = params.id;
        await connectDB();
        const prompt = await Prompt.findById(promptId);
        if(!prompt){
            console.log("Prompt not found");
            return new Response("Prompt not found",{status:404});
        }
        console.log(prompt);

        return new Response(JSON.stringify(prompt),{status:200});

    }catch(error){
        console.log(error);
        return new Response("An error occurred. Failed to edit prompts in profile",{status:500});
    }
};


export const PATCH = async (req,{params}) => {
    const {prompt,tag} = await req.json();
    try{
        const promptId = params.id;
        await connectDB();
        const updatedPrompt = await Prompt.findByIdAndUpdate(promptId,{
            prompt,
            tag
        },{new:true});
        if(!updatedPrompt){
            console.log("Prompt not found");
            return new Response("Prompt not found",{status:404});
        }
        console.log(updatedPrompt);

        return new Response(JSON.stringify(updatedPrompt),{status:200});

}catch(error){
    console.log(error);
    return new Response("An error occurred. Failed to edit prompts in profile",{status:500});
}};


export const DELETE = async (req,{params}) => {
    const promptId = params.id;
    try{
        await connectDB();
        const deletedPrompt = await Prompt.findByIdAndDelete(promptId);
        if(!deletedPrompt){
            console.log("Prompt not found");
            return new Response("Prompt not found",{status:404});
        }
        console.log("Prompt deleted successfully");
        return new Response(JSON.stringify(deletedPrompt),{status:200});
    }
    catch(error){
        console.log(error);
        return new Response("An error occurred. Failed to delete prompts in profile",{status:500});
    }
}