import React, { useState } from 'react';
import taskService from '../../TaskServices/TaskService';

const TaskListItem = ({ task, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDesc, setEditedDesc] = useState(task.description);

    const handleEdit = async () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const editedTask = { ...task, description: editedDesc };
        try {
            await taskService.updateTask(task.id, editedTask);
            setIsEditing(false);
            onEdit(); // Refresh task list
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset edited values
        setEditedDesc(task.description);
    };

    return (
        <tr className="border-b">
            <td className="py-2 px-4">
                {isEditing ? (
                    <div className="flex items-center space-x-4">
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={editedDesc} onChange={e => setEditedDesc(e.target.value)} required />
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSave}>Save</button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <span>{task.description}</span>
                )}
            </td>
            <td className="py-2 px-4">
                <span>{task.createdAt}</span>
            </td>
            <td className="py-2 px-4">
                {!isEditing && (
                    <div className="space-x-2">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={onDelete}>Delete</button>
                        <button className="hidden bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleEdit}>Edit</button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default TaskListItem;
