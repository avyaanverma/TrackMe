import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react'
import TaskList from './components/TaskList';
import Sidebar from './components/Sidebar';

function App() {
 
  return (
    <>
      <Sidebar/>
      <TaskList/>
      
    </>
  )
}

export default App
