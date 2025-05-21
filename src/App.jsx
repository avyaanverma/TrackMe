import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function App() {
  const [value, setValue] = useState();
  const [taskList, setTaskList] = useState([]);
  const [compTask, setCompTask] = useState([]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value)    
  }



  const deleteTask = (index)=>{
    setTaskList(taskList.filter((_, idx)=>{
      return idx!=index
    }));
  }

  const addTask = ()=> {
    if(value.trim() != ''){
      setTaskList([...taskList, value]);
      setValue("");
    }else{
      alert("add sth in input box");
    }
  };
  const titleCase = (str) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() +
            txt.substr(1).toLowerCase();
    });
  }
  // creating a toggle function to include it when a task is completed
  const toggleComplete = (index) =>{
    // if i want to check if value exists or not in array

    if(!compTask.includes(index)){
      setCompTask([...compTask, index]);
    }else{
      setCompTask(compTask.filter((_, idx)=> idx!=index));
    }
  }

  return (
    <>
    <div className="font-mono text-white min-h-screen bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500">
      <div className='ml-80 flex flex-col justify-center items-start'>
        <h1 className='text-3xl tracking-[25px] font-bold text-white m-10'>TODO</h1>
      </div>
      
      
      <div className='todo  flex flex-col justify-start items-center '>
      <div className='w-150 text-black '>
        <label >
          
          <Input 
          type="text" 
          name='title' 
          value={value} 
          onChange={handleInputChange}
          onKeyDown={(e)=>{e.key === 'Enter' && addTask()}}

          className=" h-15 bg-white font-semibold text-slate-800 rounded-sm w-150 mt-10"
          /> 
        </label>
        <div className="rounded-sm mt-10 drop-shadow-xl  bg-white">
          <ul>          
            {
              taskList && taskList.map((task, index)=> 
                (
                  <li 
                  key={index}  
                  className=" rounded-sm h-15 w-full flex flex-row border-b-2 items-center justify-left gap-4"

                  >
                  <input 
                    type="checkbox" 
                    checked={compTask.includes(index)}
                    onChange={()=> toggleComplete(index)}
                    className='ml-4 rounded-full h-4 w-5'
                    />
                  {titleCase(task)} <span onClick={()=>{ deleteTask(index) }}>❌</span> 
                </li>
              )
            )}
          </ul>
        </div>
      </div>    
      </div>
      
      <div className='ml-90 mt-12 flex flex-col justify-center items-start'>
        <h2>Total Tasks: {taskList.length}</h2>
        <h2>Completed Tasks: {compTask.length}</h2>
      </div>
      
    </div>
    </>
  )
}

export default App
