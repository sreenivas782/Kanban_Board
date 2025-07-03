import React from 'react'

const ToDo = ({task}) => {
  return (
    <div>

        <div className='bg-white shadow-xl mt-2 flex flex-col items-start justify-start w-1/4 my-3 py-5 ml-2'>

        <h1 className='text-xl font-bold'>{task.title}</h1>
        <p className="break-words whitespace-pre-wrap w-full max-h-32 overflow-y-auto">
              {task.description}
        </p>

        <h1 className='text-lg'>{task.date}</h1>
        <h1
  className={`text-lg font-serif text-white px-3 py-1 rounded 
    ${task.priority === 'High' ? 'bg-red-500' : 
      task.priority === 'Medium' ? 'bg-yellow-500' : 
      task.priority === 'Low' ? 'bg-green-500' : 'bg-gray-300'}`}
>
  {task.priority}
</h1>

        </div>

        
      
    </div>
  )
}

export default ToDo
