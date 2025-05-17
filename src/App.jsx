import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [value, setValue] = useState();
  const [taskList, setTaskList] = useState([]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setValue(e.target.value)
    console.log(value);
    
  }
  const addTask = ()=> {
    if(value.trim() != ''){
      setTaskList([...taskList, value]);
      setValue("");
    }else{
      alert("add sth in input box");
    }
  };
 

  return (
    <>
    <div>
      <label >
        Title:
        <input type="text" name='title' value={value} onChange={handleInputChange}/> 
      </label>
      <button onClick={addTask}>add task</button>


      <h2>tasks</h2>

      <div>
        <ul>          
          {
          taskList && taskList.map((task, index)=> 
            (
              <li key={index}>{task}</li>
            )
          )}
        </ul>
      </div>
      
    </div>
    </>
  )
}

export default App
