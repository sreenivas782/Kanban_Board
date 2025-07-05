import React,{useState ,useEffect} from 'react'
import {Trash2,FilePenLine,CalendarFold  } from 'lucide-react';
import {Pencil ,BookmarkX,BookUser,Menu ,CalendarDays,Activity} from 'lucide-react';


const EditTask = ({task,index,taskList,setTaskList}) => {

        const [editModal , setEditModal] =useState(false)

        const[title ,setTitle] =useState("")
        const[description , setDescription] = useState("")
        const[date , setDate] =useState("")
        const[priority , setPriority] = useState("")

       
        const updateHandler =(e)=>{

          e.preventDefault();

           let taskIndex =taskList.indexOf(task);
           taskList.splice(taskIndex ,1)


           setTaskList([...taskList, {title,description,date,priority}])
           setEditModal(false)
           setTitle("")
           setDescription("")
           setDate("")
           setPriority("")

        }

        useEffect(()=>{
          setTitle(task.title);
          setDescription(task.description)
          setDate(task.date)
          setPriority(task.priority) 

        },[task])


  return (
    <div>
         <button className='flex bg-blue-300 px-4 rounded-xl font-extralight' onClick={()=>setEditModal(true)}><FilePenLine />Edit </button>

        {editModal ? 
        <>

            <div className=' absolute flex justify-center items-center overflow-x-hidden overflow-y-auto inset-0 bg-black bg-opacity-80 '>
                 <div className='  border-2 border-blue-600 w-[35%] h-[95%] bg-white shadow-2xl text-black rounded-xl p-3 '>


                          {/* add new task heading */}
                <div className='items-center justify-around flex text-red-700'>
                   
                     <h1 className=' text-3xl font-medium text-indigo-600'>Add New Task</h1>
                     <button onClick={()=>setEditModal(false)}>   <BookmarkX /> </button>
                    
                </div>


                <div className='p-4 '>
                    <form  onSubmit={updateHandler} >
                        <label className='flex text-green-600' > <BookUser />Titel</label> <br />
                        <input type="text" placeholder='enter your title' className='bg-slate-100 w-full py-4 rounded-lg' value={title} onChange={(e)=>setTitle(e.target.value)} /> <br /> <br />


                         <label className='flex text-green-600' ><Menu />Description</label> <br />
                        <textarea type="text" placeholder='enter your description' rows='3' className='bg-slate-100 w-full py-3  rounded-lg' value={description} onChange={(e)=>setDescription(e.target.value)} />


                        <label className='flex text-green-600' ><CalendarDays />Select date</label> <br />
                        <input type="date" placeholder='enter your title' className='bg-slate-100 w-full py-3  rounded-lg' value={date} onChange={(e)=>setDate(e.target.value)} /><br />


                        <label className='flex text-green-600' ><Activity />Priority</label>
                        <select name="Priority"  placeholder='enter your title' className='bg-slate-100 w-full py-3  rounded-lg' value={priority} onChange={(e)=>setPriority(e.target.value)}>
                             <option value=" ">select</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>

                          <button type='submit' className="bg-blue-500 px-6 rounded-xl ml-40" onClick={updateHandler}>update</button>
                    </form>


                    
                </div>

                <div>

                </div>
               
            </div>

            </div>

           
            </> :null
        }
      
    </div>
  )
}

export default EditTask
