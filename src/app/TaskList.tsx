import React from 'react';
import { useQuery, Authenticated, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from '../../convex/_generated/dataModel';
import { DeleteIcon } from '../resources/icons';

const TaskList = () => {
    const tasks = useQuery(api.tasks.get);
    const updateTask = useMutation(api.tasks.update);
    const deleteTask = useMutation(api.tasks.deleteTask);

    const handleCheckboxChange = async (taskId: Id<"tasks">, isCompleted: boolean) => {
        await updateTask({ id: taskId, isCompleted: !isCompleted });
    };

    const handleDeleteTask = async (taskId: Id<"tasks">) => {
        await deleteTask({ id: taskId });
    };

    return (
        <Authenticated>
            <div className="task-list">
                {tasks?.map(({ _id, text, isCompleted }) => (
                    <div key={_id} className="task-item flex items-center justify-between p-2 mb-2 border-b border-gray-300">
                        <div className="flex items-center">
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
                        <button
                            onClick={() => handleDeleteTask(_id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                            aria-label="Delete task"
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                ))}
            </div>
        </Authenticated>
    );
};

export default TaskList; 