import axios from 'axios';

const baseURL = 'https://localhost:7202/api/Task';

const TaskService = {
    getAllTasks: async () => {
        const response = await axios.get(baseURL);
        return response.data;
    },
    addTask: async (Tasks) => {
        const response = await axios.post(baseURL, Tasks);
        return response.data;
    },
    deleteTask: async (id) => {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data;
    },
    updateTask: async (id, Tasks) => {
        const response = await axios.put(`${baseURL}/${id}`, Tasks);
        return response.data;
    }
};

export default TaskService;
