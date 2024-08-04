"use client";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const CreatePrompt = () => {
const {data:session} = useSession();
const router = useRouter();
const [submitting, setSubmitting] = useState(false);
const [post, setPost] = useState({
    prompt: "",
    tag: "",
});


const CreatePromptfn = async (e)=>{
    e.preventDefault();
    setSubmitting(true);

  try {
      const response =await fetch("/api/prompt/new",{
        method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
                userId: session.user.id,
                prompt:post.prompt,
                tag:post.tag
           })
       })
   if(response.ok){
       console.log("Prompt created successfully");
       console.log(await response.json());
       router.push("/");
    }else{
        console.log("An error occurred");
        throw new Error("error occurred in creating prompt");
    }
  } catch (error) {
    console.log(error);
  }finally{
        setSubmitting(false);
  }
}


  return (
    <Form
    type="create"
    post={post}
    setPost={setPost}
    submitting={submitting}  
    handleSubmit={CreatePromptfn}
    />
  )
}

export default CreatePrompt