import React, { useState } from 'react'
import {Pencil} from 'lucide-react';
import AddTask from './components/AddTask';
import ToDo from './components/ToDo';


const App = () => {

  const [taskList , setTaskList] = useState([])


  return (
    <div>

      <div className='flex justify-around bg-white shadow-2xl p-4 '>
        <h1 className='text-2xl text-orange-500 font-semibold'> <span className='text-blue-600'>KANBAN</span> BOARD</h1>
       <AddTask  taskList={taskList} setTaskList={setTaskList}/>
      </div>


      <div>
        {taskList.map((task,i)=>(

          <>
        <ToDo key={i}  task={task}/>
          
          </>
          
        ))
        }
      </div>
      

    </div>
  )
}

export default App
