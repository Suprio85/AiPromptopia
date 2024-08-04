"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";


const profile = ({params}) => {
    const router = useRouter();
   const[prompts,setPrompts]=useState([]);
   const [user,setUser] = useState({
    userName:"",
    email:"",
   });
   const id = params.id;

    useEffect(()=>{
        const fetchProfilePost = async()=>{
            try {
                const response = await fetch(`/api/users/${id}/posts`);
                if(response.ok){
                    const data = await response.json();
                    console.log(data);
                    setPrompts(data);
                }else{
                    console.log("An error occurred");
                    throw new Error("An error occurred getting profile posts");
                }
            } catch (error) {
                console.log(error);
            }
        }
        
        const fetchProfile = async()=>{
              console.log(id.toString());
            try {
               const response = await fetch(`/api/users/${id.toString()}`);

                if(response.ok){
                    const data = await response.json();

                    console.log("Profile info: ",data);
                    setUser({
                        userName:data.userName,
                        email:data.email
                    });
                }else{
                    console.log("An error occurred");
                    throw new Error("An error occurred getting profile details");
                }  
            } catch (error) {
                console.log(error);
            }
        }
        

       
        fetchProfile();
        fetchProfilePost();

    },[]);

  return (
    <Profile
    name={user.userName}
    desc="I am a software engineer"
    data={prompts}
    />
  )
}

export default profile