import { useEffect, useState } from "react";
import supabase from "../database/supabase";

interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

export default function RegisteredProjects({
  setIdSelected,
  setNoProjectSelected,
}: {
  setIdSelected: React.Dispatch<React.SetStateAction<number>>;
  setNoProjectSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const fetchData = async () => {
    const { data: Proyectos, error: fetchError } = await supabase
      .from("Proyectos")
      .select("*");
    if (fetchError) {
      console.error("Error fetching projects", fetchError);
    } else {
      setProjects(Proyectos);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const namesProject = projects.map((project) => {
    return (
      <button
        className="border-b opacity-70 border-gray-600 w-full hover:bg-gray-800 py-3"
        key={project.id}
        onClick={() => {
          setIdSelected(project.id);
          setNoProjectSelected(false);
        }}
      >
        {project.nombre}
      </button>
    );
  });
  return <div className="mt-10">{namesProject}</div>;
}
