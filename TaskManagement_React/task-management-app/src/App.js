import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import TaskList from './Components/TaskList/TaskList';
import TaskAdd from './Components/AddTask/AddTask';

function App() {

  const [refresh, setRefresh] = useState(false);

    const handleTaskAdded = () => {
        setRefresh(!refresh); // Toggle refresh state to trigger re-render
    };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4'>Task Manager</h1>
    <TaskList key={refresh} />
    <TaskAdd onTaskAdded={handleTaskAdded} />
</div>
  );
}

export default App;
