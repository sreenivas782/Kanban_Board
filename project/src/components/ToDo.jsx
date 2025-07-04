import React from 'react';
import {Trash2,FilePenLine,CalendarFold  } from 'lucide-react';
import EditTask from './EditTask';


const ToDo = ({task,index,taskList,setTaskList}) => {

  const deleteHandler =()=>{

    const updatedTasks = taskList.filter((_, i) => i !== index);
    setTaskList(updatedTasks);

  }


  return (
    <div>

        <div className='bg-white shadow-xl mt-2 flex flex-col items-start justify-start w-1/4 my-3 py-5 ml-2'>

        <h1 className='text-xl font-bold'>{task.title}</h1>
        <p className="break-words whitespace-pre-wrap w-full max-h-32 overflow-y-auto">
              {task.description}
        </p>

        <h1 className='text-sm flex underline'><CalendarFold />{task.date}</h1>
        <h1
  className={`text-xs font-mono text-white w-80  rounded  justify-center items-center flex
    ${task.priority === 'High' ? 'bg-red-500' : 
      task.priority === 'Medium' ? 'bg-yellow-500' : 
      task.priority === 'Low' ? 'bg-green-500' : 'bg-gray-300'}`}
>
  {task.priority}
</h1>


        <div className=' flex gap-32 mt-4'>

            <EditTask task={task} index={index} taskList={taskList} setTaskList={setTaskList}/>
           
            <button className='flex bg-red-600 px-4 rounded-xl font-extralight' onClick={deleteHandler}><Trash2 />Delete</button>
        </div>

        </div>


        

        
      
    </div>
  )
}

export default ToDo
