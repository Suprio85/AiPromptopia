import PromptCardList from "./PromptCardList"
const Profile = ({name,desc,data,handleEdit,handleDelete}) => {


  return (
    <section className="w-full">
    <h3 className="head_text text-left">
      <span className="blue_gradient">
        {name}
      </span>
    </h3>
    <p className="desc text-left">{desc}</p>
    <PromptCardList data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
    </section>
  )
}

export default Profile