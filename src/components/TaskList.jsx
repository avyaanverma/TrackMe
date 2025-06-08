import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react'
import Footer from './Footer';

function TaskList() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const [tasks, setTasks] = useState(storedTasks || []);
  const [newTask, setNewTask] = useState({
    title : '',
    category: '',
    date: ''
  });
  const [draggedTask, setDraggedTask] = useState(null);
  const [showAddForm, setShowAddForm] = useState(true);
  const categories = [
    { name: 'Work', color: 'bg-blue-100 text-blue-800', bgColor: 'bg-blue-50' },
    { name: 'Personal', color: 'bg-green-100 text-green-800', bgColor: 'bg-green-50' },
    { name: 'Urgent', color: 'bg-red-100 text-red-800', bgColor: 'bg-red-50' },
    { name: 'Study', color: 'bg-purple-100 text-purple-800', bgColor: 'bg-purple-50' }
  ];
  /*
  const [theme, setTheme] = useState({dark : ""});
  Future Work
    theme - {
        dark : {
          bg : bg-black,
          text : text-white
          theme : text-purple-800
        }, 
        
        light : {
          bg : bg-white,
          text : text-black
          theme : text-purple-500
        }
    
    }
  */
  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
  }, [tasks])


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
    if(newTask.title && newTask.title.trim() != ''){
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask.title,
        done: false,
        date : formatDateForInput(newTask.date),
        category : newTask.category
      }]);
      setNewTask({
        title : '',
        category: '',
        date: ''
      });
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


  // function is used to properly format the Date. 
  // by this function the dates are in proper format
  const formatDateForInput = (inputDate)=> {
    if(!inputDate) return '';
    const date = new Date(inputDate).toISOString().split('T')[0];
    return date;
  }

  const updateDate = (id, inputDate)=> {
    setTasks(tasks.map((task)=>{
      return (id==task.id) ? {...task, date: inputDate} : task ; 
    }))
  }
  return (
    <>
    <div className=" relative w-full font-mono text-white min-h-screen bg-gradient-to-r from-purple-500 via-purple-400 to-blue-500">
      <div className='p-4 max-w-4xl mx-auto text-purple-500'>
        <div className='bg-white rounded-lg p-2 '>
          <div className='flex justify-around items-center '>
          <h1 className='text-3xl tracking-[5x] font-bold m-10'>Track Me</h1>
          <button
              className="cursor-pointer bg-purple-600 pt-0 pb-0 pl-4 pr-4 h-10 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              onClick={() => {
                setShowAddForm((prevState) => !prevState);
                }
              }
            >
              +
              Add Task
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h1 className='text-2xl  font-bold text-white m-5'>
          Date: {new Date().toLocaleDateString()}
        </h1>
      </div>
      <div className='todo  flex flex-col justify-start items-center '>
      <div className='w-150 text-black '>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg p-6 mb-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter task description..."
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="cursor-pointer block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  {/* // select tag has been used for drop-down menu */}
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                    className="cursor-pointer w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map(cat => (
                      <option className='cursor-pointer' key={cat.name} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={()=> {addTask()}}
                  className="cursor-pointer px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowAddForm(false)}

                  className="cursor-pointer px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="rounded-sm p-6 mt-10 drop-shadow-xl  bg-white">
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

                  <span className='bg-green-200 text-violet-800 p-1 rounded-sm'>
                    {/* write a statement to write that  */}
                    {/*if the task is completed Pending in Red is written otherwise Completed in green */}
                    {task.category}
                  
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

                  <input 
                  type='date'
                  className='cursor-pointer text-gray-500 
                  border-none
                  "
                  '
                  value= {formatDateForInput(task.date)}
                  // !! don't use e , use e.target.value
                  onChange={(e)=> {updateDate(task.id, e.target.value)}}
                  />
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
      
      <Footer tasks = {tasks} />
      
    </div>
    </>
  )
}

export default TaskList
