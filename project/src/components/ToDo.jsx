import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Trash2, CalendarFold, GripVertical } from 'lucide-react';
import EditTask from './EditTask';

const ToDo = ({ task, index, columnKey, taskList, setTaskList }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
  };

  const deleteHandler = (e) => {
    e.stopPropagation();
    const updated = { ...taskList };
    updated[columnKey] = taskList[columnKey].filter((_, i) => i !== index);
    setTaskList(updated);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className='bg-black bg-opacity-10 shadow-xl mt-2 flex flex-col items-start justify-start my-3 py-5 ml-2 rounded-lg p-3 xl:w-auto  '>

     
        <div className='flex justify-between items-center w-full cursor-move' {...listeners} {...attributes}>
          <h1 className='text-xl font-bold'>{task.title}</h1>
          <GripVertical className='text-gray-500' />
        </div>

        <p className="break-words whitespace-pre-wrap w-full max-h-32 overflow-y-auto mt-1">
          {task.description}
        </p>

        <h1 className='text-sm xl:flex underline items-center mt-2'>
          <CalendarFold className="mr-1" />
          {task.date}
        </h1>

        <h1
          className={`text-xs font-mono text-white lg:w-80 rounded justify-center items-center flex mt-2
            ${task.priority === 'High' ? 'bg-red-500' :
              task.priority === 'Medium' ? 'bg-yellow-500' :
              task.priority === 'Low' ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          {task.priority}
        </h1>

        <div className='lg:flex lg:gap-36 mt-4'>
          <EditTask
            task={task}
            index={index}
            taskList={taskList}
            setTaskList={setTaskList}
            columnKey={columnKey}
          />


                         {/* -------------Delete - button ---------- */}
          <button
            className='flex bg-red-600 lg:px-4   rounded-xl font-extralight items-center gap-1'
            onClick={(e) => {
              e.stopPropagation();
              deleteHandler(e);
            }}
          >
            <Trash2  /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default ToDo;
