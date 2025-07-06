import React, { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import ToDo from './components/ToDo';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

const App = () => {
  const getInitialTasks = () => {
    try {
      const saved = localStorage.getItem('taskList');
      const parsed = saved ? JSON.parse(saved) : null;
      return {
        todo: parsed?.todo ?? [],
        inProgress: parsed?.inProgress ?? [],
        done: parsed?.done ?? [],
      };
    } catch {
      return { todo: [], inProgress: [], done: [] };
    }
  };

  const [taskList, setTaskList] = useState(getInitialTasks);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromColumn = findColumnByTaskId(active.id);
    const toColumn = over.id;

    if (!fromColumn || !toColumn || fromColumn === toColumn) return;

    const fromTasks = [...taskList[fromColumn]];
    const taskIndex = fromTasks.findIndex((task) => task.id === active.id);
    const task = fromTasks.splice(taskIndex, 1)[0];

    const updatedTaskList = {
      ...taskList,
      [fromColumn]: fromTasks,
      [toColumn]: [task, ...taskList[toColumn]],
    };

    setTaskList(updatedTaskList);
  };

  const findColumnByTaskId = (taskId) => {
    return Object.keys(taskList).find((col) =>
      taskList[col].some((task) => task.id === taskId)
    );
  };

  const DroppableColumn = ({ columnKey, children }) => {
    const { setNodeRef } = useDroppable({ id: columnKey });

    return (
      <div
        ref={setNodeRef}
        className='lg:w-1/3 min-h-[500px] bg-gray-50 p-3 rounded-lg  '
      >
        <h1
          className={`text-white lg:text-2xl font-bold lg:p-2 rounded text-center lg:flex 
            ${columnKey === 'todo' ? 'bg-black' : columnKey === 'inProgress' ? 'bg-yellow-300' : 'bg-green-700'}`}
        >
          {columnKey === 'todo' ? 'To Do' : columnKey === 'inProgress' ? 'In Progress' : 'Done'}
        </h1>
        {children}
      </div>
    );
  };

  return (
    <div>
                 {/* --------- Nav-Div--------------- */}
      <div className='flex justify-around bg-white shadow-2xl p-4'>
        <h1 className='text-2xl text-orange-500 font-semibold'>
          <span className='text-blue-600'>KANBAN</span> BOARD
        </h1>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className='flex justify-between items-start mt-4 gap-4 px-4'>
          {['todo', 'inProgress', 'done'].map((columnKey) => (
            <DroppableColumn columnKey={columnKey} key={columnKey}>
              <SortableContext items={taskList[columnKey].map(t => t.id)} strategy={verticalListSortingStrategy}>
                {taskList[columnKey].map((task, index) => (
                  <ToDo
                    key={task.id}
                    task={task}
                    index={index}
                    columnKey={columnKey}
                    taskList={taskList}
                    setTaskList={setTaskList}
                  />
                ))}
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default App;
