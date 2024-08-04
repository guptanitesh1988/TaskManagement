import React, { useState, useEffect } from 'react';
import TaskListItem from './TaskListItems';
import taskService from '../../TaskServices/TaskService';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const tasksData = await taskService.getAllTasks();
            setTasks(tasksData);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await taskService.deleteTask(id);
            fetchTasks(); // Refresh task list
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = () => {
        fetchTasks(); // Refresh task list after editing
    };

    return (
        <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white p-3 rounded">Task List</h2>
            <table className="min-w-full bg-white rounded">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-blue-200 text-left">Task Description</th>
                        <th className="py-2 px-4 bg-blue-200 text-left">Created At</th>
                        <th className="py-2 px-4 bg-blue-200 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <TaskListItem key={task.id} task={task} onDelete={() => handleDelete(task.id)} onEdit={handleEdit} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
