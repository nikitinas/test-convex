import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const TaskInput = () => {
    const [taskText, setTaskText] = useState('');
    const insertTask = useMutation(api.tasks.insert);

    const handleInsertTask = () => {
        if (taskText.trim()) {
            insertTask({ text: taskText });
            setTaskText('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Enter task text"
                className="task-input mb-2"
            />
            <button
                onClick={handleInsertTask}
                className="sign-in-button"
            >
                Insert Task
            </button>
        </div>
    );
};

export default TaskInput; 