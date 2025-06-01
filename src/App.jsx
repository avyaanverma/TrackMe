import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react'
function App() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState(storedTasks || []);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
  }, [tasks])

  const handleInputChange = (e) => {
    setValue(e.target.value);
  }

  // making draggable methods
  const handleDragStart = (e, taskId, index) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.setData('application/json', JSON.stringify({taskId, index}));
    e.dataTransfer.effectAllowed = 'move';
    setDraggedTask(taskId);
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }
 
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData('application/json'));
    const dragIndex =dragData.index;

    if( dragIndex !== dropIndex){
      const newTasks = [...tasks];
      const draggedTask = newTasks[dragIndex];
      newTasks.splice(dragIndex, 1);
      newTasks.splice(dropIndex, 0, draggedTask );
      setTasks(newTasks);
    }

  }

  const handleDragEnd = () => {
    setDraggedTask(null);
  }

  const deleteTask = (index)=>{
    
    setTasks(tasks.filter((task)=>{
      return task.id!==index;
    }));
    console.log(tasks);
  }

  const addTask = ()=> {
    console.log();
    
    if(value && value.trim() != ''){
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
    if(task.id === id){
      return {...task, done: !task.done}
    } else{
      return task;
    }
   }));
  }

  const editTask = (id, input)=> {
    // map function takes a callback where it performs function on the elements of the tasks array
    setTasks(tasks.map((task)=>{
      if(task.id == id){
        return {...task, title: input}
      }else{
        return task;
      }
    }))
  }

  return (
    <>
    <div className="font-mono text-white min-h-screen bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500">
      <div className='w-screen h-20 flex flex-col justify-center items-center'>
        <h1 className='text-3xl tracking-[25px] font-bold text-white m-10'>TODO</h1>
      </div>
      
      <div>
        <h1 className='text-2xl  font-bold text-white m-5'>
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
              tasks && tasks.map((task, index)=> 
                (
                  <li 
                  key={task.id}  
                  className={` rounded-sm h-15 w-full flex flex-row border-b-2 items-center justify-left gap-4 draggedTask === task.id ? 'opacity-50 bg-gray-100' : 'hover:bg-gray-50`}
                  
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id, index)}
                  onDragOver = {handleDragOver}
                  onDrop = {(e) => handleDrop(e, index)}
                  onDragEnd= {handleDragEnd}
                  
                  // Removed onDragEnter and onDragLeave handlers as draggedTask state is unused
                  >
                  <div className="flex items-center ml-2 gap-2 cursor-move">
                      <span className="text-gray-400">⋮⋮</span>
                    </div>
                  
                  <input 
                    type="checkbox" 
                    checked={task.done}
                    onChange={()=> toggleComplete(task.id)}
                    className='ml-4 h-5 w-5 accent-purple-500 rounded-full cursor-pointer'
                    style={{accentColor: '#a78bfa', borderRadius: '50%'}}
                    />
                  
                    <span 
                    className={`cursor-pointer ${task.done ? 'line-through text-gray-500' : ''}`}
                    contentEditable={!task.done}
                    suppressContentEditableWarning={true}
                    // on Blur event is triggered when we have lost focus from the element 
                    // eg: when you have edited and you exit task
                    onBlur={(e)=>{
                      const newTitle =e.target.textContent.trim();
                      if(newTitle && newTitle!=task.title) {
                        editTask(task.id, newTitle);
                      }
                    }}

                    onKeyDown={(e)=>{
                      if(e.key=='Enter'){
                        e.preventDefault();
                        // target property is reference to the object 
                        // onto which the event was dispatched
                        // 
                        e.target.blur();
                      }
                    }}
                    
                    >
                      {titleCase(task.title)}
                    
                    </span>
                  
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
                  <span
                    onClick={()=>{ deleteTask(task.id) }}
                    className='cursor-pointer hover:text-lg'
      
                    >🗑️</span> 
                </li>
              )
            )}
          </ul>

          {tasks.length===0 && (
            <div>
              <p>No tasks yet. Add one above!</p>
            </div>
          )}  
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
