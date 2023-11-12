import { useReducer, useState } from "react"
import { tasksReducer } from "./home.module.reducer"
let nextId = 1
const taskList = [
  {
    taskInfo: '这个一个计划任务',
    isDone: false,
    id: 1
  }
]
// 把state逻辑迁移至reducer中
export default function Bottom(){
  const [tasks, dispatch] = useReducer(tasksReducer, taskList)
  // useReducer 同state不能直接修改，需返回一个新数组
  // const [tasks, dispatch] = useImmerReducer(taskList)
  // useImmerReducer 让你可以通过 push 或 arr[i] = 来修改 state 

  function handleEdit(task){
    dispatch({
      type: 'add',
      task: task
    })
  }

  return (
    <div>
      <TaskList list={tasks} onChangeTask={handleEdit} />
    </div>
  )
}

function TaskList({ list, onChangeTask }) {
  return (
    <div>
      {
        list.map(item=>{
          return (
            <Task task={item} key={item.id} onChangeTask={onChangeTask} />
          )
        })
      }
    </div>
  )
}

function Task({task, onChangeTask}){
  const [isEdit, setIsEdit] = useState(false)
  return (
    <div>
      <input type="checkbox" value={task.isDone} disabled={!isEdit} />
      <input type="text" value={task.taskInfo}  disabled={!isEdit} />
      <button onClick={()=>{
        setIsEdit(!isEdit);
        onChangeTask(task)
      }}>
        {isEdit? '完成' : '编辑'}
      </button>
    </div>
  )
}