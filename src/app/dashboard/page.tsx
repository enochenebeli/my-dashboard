"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const res = await fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    let data = await res.json();
    if (filter !== "All") {
      data = data.filter((t: any) => t.status === filter);
    }
    setTasks(data);
  };

  const handleAdd = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, status: "Pending" }),
    });
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 flex-1"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 rounded" type="submit">
          Add
        </button>
      </form>

      <div className="mb-4">
        <select
          className="border p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>

      <ul>
        {tasks.map((task: any) => (
          <li key={task._id} className="border p-2 mb-2 rounded">
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
