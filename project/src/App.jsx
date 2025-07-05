import React, { useEffect, useState } from 'react'
import {Pencil} from 'lucide-react';
import AddTask from './components/AddTask';
import ToDo from './components/ToDo';



const App = () => {

  const getInitialTasks = () => {
  const saved = localStorage.getItem('taskList');
  return saved ? JSON.parse(saved) : [];
};

const [taskList, setTaskList] = useState(getInitialTasks);

 


  useEffect(()=>{

    localStorage.setItem("taskList", JSON.stringify(taskList))

  },[taskList])


  return (
    <div>
      
                          {/* Nav elements div */}
      <div className='flex justify-around bg-white shadow-2xl p-4 '>
        <h1 className='text-2xl text-orange-500 font-semibold'> <span className='text-blue-600'>KANBAN</span> BOARD</h1>
       <AddTask  taskList={taskList} setTaskList={setTaskList}/>
      </div>


            {/* todo , in progress , done divs */}

      <div  className=' flex justify-between items-start mt-4'>

        <div>

        <h1 className='bg-black rounded-lg  text-white  flex justify-center font-medium text-2xl px-32 h-auto'>To Do</h1>

        {taskList.map((task,i)=>(

          <>
        <ToDo key={i}  task={task} index={i} taskList={taskList} setTaskList={setTaskList}/>
          
          </>
          
        ))
        }
      </div>


      <div>
        <h1  className='bg-yellow-300 rounded-lg text-white  flex justify-center font-bold text-2xl px-32 h-auto '>In Progress</h1>
      </div>


       <div>
        <h1 className='bg-green-700 rounded-xl text-white   flex justify-center font-bold text-2xl px-32 h-auto'>Done</h1>
      </div>

      </div>


      
      

    </div>
  )
}

export default App
