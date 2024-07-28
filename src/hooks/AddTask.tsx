import { useEffect, useState } from "react";
import supabase from "../database/supabase";
interface Task {
  id: number;
  tarea: string;
  proyecto: number;
}
export default function AddTask({ id }: { id: number }) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[] | null>(null);

  const fetchTasks = async () => {
    //LECTURA DE TAREAS
    // se crea esta constante para ser llamada en el useEffect cuando cambie el id, es decir se seleccione un nuevo proyecto y tambien para cuando se añada una nueva tarea
    const { data: Tareas, error: FetchError } = await supabase
      .from("Tareas")
      .select("*")
      .eq("proyecto", id);

    if (FetchError) {
      console.error("Fetch error: " + FetchError);
    } else {
      setTasks(Tareas);
    }
  };

  const addTask = async () => {
    const { data, error } = await supabase
      .from("Tareas")
      .insert([
        {
          tarea: task,
          proyecto: id,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding task", error);
    } else {
      console.log(data);
      fetchTasks(); // Se vuelven a leer todas las tareas de la base de datos
      setTask(""); // Limpiar el campo de entrada después de agregar la tarea
    }
  };

  useEffect(() => {
    fetchTasks(); // se lee las tareas al montar el componente (cada que cambie el id)
  }, [id]);

  const deleteTask = async (taskId: number) => {
    const { error } = await supabase.from("Tareas").delete().eq("id", taskId);
    if (error) {
      console.log(error);
    } else {
      fetchTasks(); // Se vuelven a leer todas las tareas de la base de datos
    }
  };

  return (
    <div>
      <section className="py-6">
        <h2 className="text-xl font-medium">Tasks</h2>
        <input
          onChange={(e) => setTask(e.target.value)}
          value={task}
          type="text"
          className="border shadow-sm mr-3 w-3/5 mt-3 h-8"
        />
        <button onClick={addTask}>Add Task</button>
      </section>
      <section className="py-12">
        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <article key={task.id} className="flex justify-between">
              <p>{task.tarea}</p>
              <button
                className="opacity-45"
                onClick={() => deleteTask(task.id)}
              >
                Clear
              </button>
            </article>
          ))
        ) : (
          <p>No tasks found</p>
        )}
      </section>
    </div>
  );
}
