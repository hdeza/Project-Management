import { useEffect, useState } from "react";
import supabase from "../database/supabase";

interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: Date;
}

export default function RegisteredProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    async function fetchData() {
      const { data: Proyectos, error: fetchError } = await supabase
        .from("Proyectos")
        .select("*");
      if (fetchError) {
        console.error("Error fetching projects", fetchError);
      } else {
        setProjects(Proyectos);
      }
    }
    fetchData();
  }, []);

  const namesProject = projects.map((project) => {
    return (
      <button
        className="border-b opacity-70 border-gray-600 w-full hover:bg-gray-800 py-3"
        key={project.id}
      >
        {project.nombre}
      </button>
    );
  });
  return <div className="mt-10">{namesProject}</div>;
}
