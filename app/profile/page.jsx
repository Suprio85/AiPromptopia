"use client";

import { useSession } from "next-auth/react";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const profile = () => {
    const router = useRouter();
   const {data:session} = useSession();
   const[prompts,setPrompts]=useState([]);

    useEffect(()=>{
        const fetchProfile = async()=>{
            try {
                const response = await fetch(`/api/users/${session.user.id}/posts`);
                if(response.ok){
                    const data = await response.json();
                    console.log(data);
                    setPrompts(data);
                }else{
                    console.log("An error occurred");
                    throw new Error("An error occurred getting profile");
                }
            } catch (error) {
                console.log(error);
            }
        }
       
        fetchProfile();

    },[session?.user.id]);


  const handleEdit = async(prompt)=>{
   router.push(`/edit-prompt/${prompt._id}`);

  }

  const handleDelete = async(prompt)=>{
  const confirmDelete = confirm("Are you sure you want to delete this prompt?");
    if(!confirmDelete)
        return;

    try {
        const response = await fetch(`/api/prompt/${prompt._id}`,{
            method:"DELETE"
        });
        if(response.ok){
            console.log("Prompt deleted successfully");
            const data = await response.json();
            console.log(data);
            setPrompts(prompts.filter((p)=>p._id!==prompt._id));
        }else{
            console.log("An error occurred");
            throw new Error("An error occurred deleting prompt");
        }
    } catch (error) {
        console.log(error);
    }


  } 


  return (
    <Profile
    name={session?.user.name}
    desc="I am a software engineer"
    data={prompts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default profile