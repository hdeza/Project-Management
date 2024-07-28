import EmptyProject from "./components/EmptyProject";
import ProjectSide from "./components/ProjectSide";

function App() {
  return (
    <div className="flex">
      <ProjectSide />
      <EmptyProject />
    </div>
  );
}

export default App;
