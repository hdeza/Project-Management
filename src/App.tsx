import { useState } from "react";
import EmptyProject from "./components/EmptyProject";
import ProjectSide from "./components/ProjectSide";
import Project from "./hooks/Project";

function App() {
  const [noProjectSelected, setNoProjectSelected] = useState(true);
  const [idSelected, setIdSelected] = useState(-1);
  return (
    <div className="flex">
      <ProjectSide
        setIdSelected={setIdSelected}
        setNoProjectSelected={setNoProjectSelected}
      />
      {noProjectSelected ? <EmptyProject /> : <Project id={idSelected} />}
    </div>
  );
}

export default App;
