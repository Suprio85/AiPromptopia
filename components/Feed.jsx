"use client";
import { useState,useEffect } from "react";
import PromptCardList from "@components/PromptCardList";






const Feed = () => {
  const [searchText, setSearchText ] = useState("");
  const [promptData, setPromptData] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return promptData.filter(
      (item) =>
        regex.test(item.creator.userName) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(()=>{
  const fetchPosts = async()=>{
    try {
      const response = await fetch("/api/prompt");
      if(response.ok){
        const data = await response.json();
        console.log(data);
        setPromptData(data);
        console.log("Prompt data set successfully");
      }else{
        console.log("An error occurred"); 
        throw new Error("An error occurred getting prompts");
      }
    } catch (error) {
      console.log(error);
  }
}

fetchPosts();

  },[])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
        type="text"
        placeholder="Search for a tag or username"
        value ={searchText}
        onChange={handleSearchChange}
        className="search_input peer:"
        >
        </input>
      </form>
      {
        searchText? (<>
        <PromptCardList data={searchedResults} handleTagClick={handleTagClick}/>
        </>) :(<>
        <PromptCardList data={promptData} handleTagClick={handleTagClick}/>
        </>)

      }

    </section>
  )
}

export default Feed