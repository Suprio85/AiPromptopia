"use client";
import Form from "@components/Form";
import { useState,useEffect,Suspense } from "react";
import { useSearchParams,useRouter } from "next/navigation";



const EditPrompt = () => {
const [submitting, setSubmitting] = useState(false);
const [post, setPost] = useState({
    prompt: "",
    tag: "",
});
const router = useRouter();

const searchParams = useSearchParams();
const promptId= searchParams.get("id");

useEffect(()=>{
   try{
       const getPromptDetails = async()=>{
       const response = await fetch(`/api/prompt/${promptId}`);
         if(response.ok){
              const data = await response.json();
              console.log(data);
              setPost({
                prompt:data.prompt,
                tag:data.tag
              });

   }else{
         console.log("An error occurred");
         throw new Error("An error occurred getting prompt");
   }
}

if(promptId)
    getPromptDetails();

}catch(error){
    console.log(error);
}

},[promptId]);


const updatePrompt = async (e)=>{
    e.preventDefault();
    setSubmitting(true);
    if(!promptId){
        console.log("Prompt Id not found");
        alert("Prompt Id not found"); 
    }
    try{
        const response = await fetch(`/api/prompt/${promptId}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                prompt:post.prompt,
                tag:post.tag
            })
        });
        if(response.ok){
            console.log("Prompt updated successfully");
            console.log(await response.json());
            router.push("/profile");
        }else{
            console.log("An error occurred");
            throw new Error("An error occurred updating prompt");
        }

    }catch(error){
        console.log(error);

    }finally{
        setSubmitting(false);
    }
}


return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
}

export default EditPrompt