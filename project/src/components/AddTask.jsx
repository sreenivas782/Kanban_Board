import React, { useState } from 'react';
import { Pencil, BookmarkX, BookUser, Menu, CalendarDays, Activity } from 'lucide-react';

const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');

  const addHandler = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(), // this will generate unique id 
      title,
      description,
      date,
      priority,
    };
    setTaskList({
      ...taskList,
      todo: [...taskList.todo, newTask], 
    });
    setAddModal(false);
    setTitle('');
    setDescription('');
    setDate('');
    setPriority('');
  };

  return (
    <div>
      <div>
        <h1 className="bg-black text-white px-4 py-2 rounded-lg flex gap-2 relative" onClick={() => setAddModal(true)}>
          <button>Add-Task</button>
          <Pencil />
        </h1>
      </div>

      {addModal && (
        <div className="absolute flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 bg-black bg-opacity-80">

          <div className="border-2 border-blue-600 lg:w-[35%] lg:h-[95%] bg-white shadow-2xl text-black rounded-xl p-3">
            <div className="items-center justify-around flex text-red-700">
              <h1 className="text-3xl font-medium text-indigo-600">Add New Task</h1>
              <button onClick={() => setAddModal(false)}>
                <BookmarkX />
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={addHandler}>
                <label className="flex text-green-600">
                  <BookUser />
                  Titel
                </label>
                <input
                  type="text"
                  placeholder="enter your title"
                  className="bg-slate-100 w-full py-4 rounded-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label className="flex text-green-600 mt-4">
                  <Menu />
                  Description
                </label>
                <textarea
                  placeholder="enter your description"
                  rows="3"
                  className="bg-slate-100 w-full py-3 rounded-lg"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <label className="flex text-green-600 mt-4">
                  <CalendarDays />
                  Select date
                </label>
                <input
                  type="date"
                  className="bg-slate-100 w-full py-3 rounded-lg"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <label className="flex text-green-600 mt-4">
                  <Activity />
                  Priority
                </label>
                <select
                  className="bg-slate-100 w-full py-3 rounded-lg"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="">select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <button type="submit" className="bg-blue-500 px-6 mt-4 rounded-xl ml-40">
                  add
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
