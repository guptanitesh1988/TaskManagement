import React, { useState } from 'react';
import taskService from '../../TaskServices/TaskService';

const TaskListItem = ({ task, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedDesc, setEditedDesc] = useState(task.description);

    const handleEdit = async () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const editedTask = { ...task, name: editedDesc };
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
        <li className="list-group-item">
            {isEditing ? (
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" value={editedDesc} onChange={e => setEditedDesc(e.target.value)} required />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
                        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-between align-items-center">
                    <span>{task.description} </span>
                    <div>
                        <button className="btn btn-danger me-2" onClick={onDelete}>Delete</button>
                        <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TaskListItem;
