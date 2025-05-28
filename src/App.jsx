import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Input } from "@/components/ui/input"

function App() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks" || []));
  const [value, setValue] = useState();
  const [tasks, setTasks] = useState(storedTasks || []);
  
  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
  }, [tasks])

  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value)    
  }

  const deleteTask = (index)=>{
    
    setTasks(tasks.filter((task)=>{
      return task.id!=index;
    }));
    console.log(tasks);
  }

  const addTask = ()=> {
    console.log();
    
    if(value.trim() != ''){
      setTasks([...tasks, {
        id: Date.now(),
        title: value,
        done: false,
        date : new Date().toLocaleDateString()
      }]);
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
  const toggleComplete = (id) =>{
    // if i want to check if value exists or not in array

   setTasks(tasks.map((task)=>{
    if(task.id == id){
      return {...task, done: !task.done}
    } else{
      return task;
    }
   }));
  }

  return (
    <>
    <div className="font-mono text-white min-h-screen bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500">
      <div className='ml-80 flex flex-col justify-center items-start'>
        <h1 className='text-3xl tracking-[25px] font-bold text-white m-10'>TODO</h1>
      </div>
      
      <div>
        <h1 className='text-2xl  font-bold text-white m-10'>
          Date: {new Date().toLocaleDateString()}
        </h1>
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
              tasks && tasks.map((task)=> 
                (
                  <li 
                  key={task.id}  
                  className=" rounded-sm h-15 w-full flex flex-row border-b-2 items-center justify-left gap-4"

                  >
                  <input 
                    type="checkbox" 
                    checked={task.done}
                    onChange={()=> toggleComplete(task.id)}
                    className='ml-4 h-5 w-5 accent-purple-500 rounded-full cursor-pointer'
                    style={{accentColor: '#a78bfa', borderRadius: '50%'}}
                    />
                  {
                    task.done ? 
                    <span className='line-through'>{titleCase(task.title)}</span>
                    : 
                    <span className=''>{titleCase(task.title)}</span>
                  } 
                  <span
                    onClick={()=>{ deleteTask(task.id) }}
                    className='cursor-pointer hover:text-lg'

                    >🗑️</span> 
                  <span className='bg-blue-200 p-1 rounded-sm'>
                    {/* write a statement to write that  */}
                    {/*if the task is completed Pending in Red is written otherwise Completed in green */}
                    {task.done ? 
                    <span className='text-green-500'>Completed</span>
                    :
                    <span className='text-red-500'>Pending</span>
                    }
                  </span>

                  <span className='text-gray-500 ml-4'>
                    {task.date}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>
      </div>    
      </div>
      
      <div className='ml-90 mt-12 flex flex-col justify-center items-start'>
        <h2>Total Tasks: {tasks.length}</h2>
        <h2>Completed Tasks: {tasks.reduce((cnt, task)=> task.done ? cnt + 1: cnt , 0)}</h2>
      </div>
      
    </div>
    </>
  )
}

export default App
