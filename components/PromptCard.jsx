"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";


const PromptCard = ({prompt,handleTagClick,handleEdit,handleDelete}) => {
 const [copied, setCopied] = useState(false);
const router = useRouter();
const {data:session} = useSession();
const path = usePathname();
 const handleCopy = ()=>{
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(()=>{
      setCopied(false);
    },3000)
 }

 const handleViewProfile = async()=>{
    if(session?.user.id === prompt.creator._id)
        router.push("/profile");
    else if(session?.user.id !== prompt.creator._id){
        router.push(`/profile/${prompt.creator._id}`);
        console.log(session?.user.id);
        console.log(prompt.creator._id);
    }
    else{
      alert("You need to login to view profile");
      router.push("/");
    }
 }

  return (
    <div className="prompt_card">
    <div className="flex justify-between items-start gap-5">
      <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        <Image src={prompt.creator.image}
         width={30} height={30} 
         className="rounded-full object-contain"
         onClick={handleViewProfile} 
         alt="Profile" />
         <div className="flex flex-col">
          <h3
          className="font-satoshi font-semibold text-base text-gray-700 cursor-pointer hover:text-black"
          onClick={handleViewProfile}
          >{prompt.creator.userName}</h3>
          <p
          className="font-satoshi font-semibold text-xs text-gray-400"
          >{prompt.creator.email}</p>
        </div>
      </div>
      <div
      className="copy_btn"
      onClick={handleCopy}>
        <Image
        src={copied?"/assets/icons/tick.svg":"/assets/icons/copy.svg"}
        width={20} height={20}
        onClick={()=>{}}
        />
      </div>
    </div>
      <p
      className="my-4 font-satoshi text-sm text-gray-600"
      >{prompt.prompt}</p>
      <p
      className="font-inter text-sm blue_gradient hover: cursor-pointer"
      onClick={()=>handleTagClick&&handleTagClick(prompt.tag)}
      >{prompt.tag}</p>

      {session?.user.id === prompt.creator._id && path === "/profile" && (
        <div className="mt-5 flex flex-center  gap-5 border-gray-300 border-t-2 pt-4">
         <p className="font-inter text-sm orange_gradient cursor-pointer "
         onClick={()=>handleEdit && handleEdit(prompt)}
         >
         Edit
         </p>

         <p className="font-inter text-sm orange_gradient cursor-pointer"
         onClick={()=>handleDelete && handleDelete(prompt)}
         >
         Delete
         </p>


        </div>
      )}
    </div>
  )
}

export default PromptCard