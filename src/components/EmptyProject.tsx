import BookPhoto from "../assets/bookpng.png";
import AddProject from "../hooks/AddProject";

export default function EmptyProject() {
  return (
    <main className="text-center flex flex-col items-center flex-1 font-semibold">
      <h1 className="text-xl mt-14">No Projects Selected!</h1>
      <img src={BookPhoto} alt="books" className="w-28" />
      <p className="text-sm mt-4 opacity-50">
        Start by adding a new project by clicking on the "Add Project" button or
        select a project.
      </p>
      <div className="mt-10">
        <AddProject />
      </div>
    </main>
  );
}
