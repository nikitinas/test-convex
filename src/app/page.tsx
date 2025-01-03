"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const updateTask = useMutation(api.tasks.update);

  const handleCheckboxChange = async (taskId: Id<"tasks">, isCompleted: boolean) => {
    await updateTask({ id: taskId, isCompleted: !isCompleted });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="task-list">
        {tasks?.map(({ _id, text, isCompleted }) => (
          <div key={_id} className="task-item flex items-center p-2 mb-2 border-b border-gray-300">
            <input
              type="checkbox"
              id={_id}
              className="mr-2"
              checked={isCompleted}
              onChange={() => handleCheckboxChange(_id, isCompleted)}
            />
            <label htmlFor={_id} className={`task-text ${isCompleted ? 'line-through text-gray-500' : ''}`}>
              {text}
            </label>
          </div>
        ))}
      </div>
    </main>
  );
}
