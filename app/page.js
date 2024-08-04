import Image from "next/image";
import Feed from "@components/Feed";


export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
       Discover & Share AI Prompts
       <br className="max-md:hidden"/>
       <span className="orange_gradient text-center">
        AI-Powered Writing Prompts
       </span>
      </h1>
      <p className="desc text-center">
        Promptopia is a platform that allows you to discover and share AI-generated writing prompts. 
        Our mission is to inspire creativity and help writers overcome writer's block.
      </p>
      <Feed />
    </section>
  );
}
