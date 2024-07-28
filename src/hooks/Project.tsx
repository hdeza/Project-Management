import { useEffect, useState } from "react";
import supabase from "../database/supabase";

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
        console.log(Proyectos);
        setProyecto(Proyectos[0]);
        console.log(typeof Proyectos[0].fecha);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="px-28 py-10 w-4/5">
      <section className="border-b-2">
        <article className="flex justify-between">
          <h1 className="text-3xl font-semibold">{proyecto?.nombre}</h1>
          <button className="opacity-45">Delete</button>
        </article>
        <p className="opacity-45 py-2">{proyecto?.fecha}</p>
        <p className="">{proyecto?.descripcion}</p>
      </section>
      <section className="py-6">
        <h2 className="text-xl font-medium">Tasks</h2>
        <input type="text" className="border shadow-sm mr-3 w-3/5 mt-3 h-8" />
        <button>Add Task</button>
      </section>
      <section className="py-12">
        <article className="flex justify-between">
          <p>Learn the basics</p>
          <button className="opacity-45">Clear</button>
        </article>
      </section>
    </div>
  );
}
