import { useEffect, useState } from "react";
import supabase from "../database/supabase";
import AddTask from "./AddTask";

interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
}

export default function Project({ id }: { id: number }) {
  const [proyecto, setProyecto] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data: Proyectos, error: fetchError } = await supabase
        .from("Proyectos")
        .select("*")
        .eq("id", id);

      if (fetchError) {
        console.error("Fetch error: " + fetchError);
      } else {
        setProyecto(Proyectos[0]);
      }
    }
    fetchData();
  }, [id]);

  const deleteProject = async () => {
    const { error } = await supabase.from("Proyectos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting project", error);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="px-28 py-10 w-4/5">
      <section className="border-b-2">
        <article className="flex justify-between">
          <h1 className="text-3xl font-semibold">{proyecto?.nombre}</h1>
          <button className="opacity-45" onClick={deleteProject}>
            Delete
          </button>
        </article>
        <p className="opacity-45 py-2">{proyecto?.fecha}</p>
        <p className="">{proyecto?.descripcion}</p>
      </section>
      <AddTask id={id} />
    </div>
  );
}
