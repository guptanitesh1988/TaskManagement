import React, { useState } from 'react';
import taskService from '../../TaskServices/TaskService';

const TaskForm = ({ onTaskAdded }) => {
    const [description, setDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const today = new Date();
        const newTask = { description, createdAt: today };
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
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white p-3 rounded">Task Manager</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="taskDescription" className="block text-gray-700 font-bold mb-2">Task Description:</label>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="taskDescription" value={description} onChange={e => setDescription(e.target.value)} required />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Task</button>
            </form>
        </div>
    );
};

export default TaskForm;
