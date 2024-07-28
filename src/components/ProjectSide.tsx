import AddProject from "../hooks/AddProject";
import RegisteredProjects from "../hooks/RegisteredProjects";

export default function ProjectSide() {
  return (
    <aside className="w-1/5 bg-gray-900 text-white  h-screen ">
      <h2 className="pt-10 text-xl pl-5">YOUR PROJECTS</h2>
      <div className="pt-4 text-center">
        <AddProject />
      </div>
      <div>
        <RegisteredProjects />
      </div>
    </aside>
  );
}
