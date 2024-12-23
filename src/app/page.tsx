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
      {tasks?.map(({ _id, text, isCompleted }) => (
        <div key={_id} className="flex items-center">
          <input
            type="checkbox"
            id={_id}
            className="mr-2"
            checked={isCompleted}
            onChange={() => handleCheckboxChange(_id, isCompleted)}
          />
          <label htmlFor={_id}>{text}</label>
        </div>
      ))}
    </main>
  );
}
