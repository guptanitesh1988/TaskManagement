// src/components/TaskList/TaskList.js
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
        <div className="container">
            <h2 className="my-4">Task List</h2>
            <ul className="list-group">
                {tasks.map(task => (
                    <TaskListItem key={task.id} task={task} onDelete={() => handleDelete(task.id)} onEdit={handleEdit} />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
