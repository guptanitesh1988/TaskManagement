import React, { useState } from 'react';
import taskService from '../../TaskServices/TaskService';

const TaskForm = ({ onTaskAdded }) => {
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        var today = new Date();
        const newTask = { description, createdAt:today };
        try {
            await taskService.addTask(newTask);
            onTaskAdded(); // Trigger refresh
            setDescription('');
            setCreatedAt('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Add Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">Task Description:</label>
                    <input type="text" className="form-control" id="taskDescription" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
