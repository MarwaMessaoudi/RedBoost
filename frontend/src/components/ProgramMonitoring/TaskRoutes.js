import React, { useEffect } from 'react'
import Task from './Task'
import Activity from './Activity'
import { Routes, Route } from 'react-router-dom'
import { loadTasksByActivityId } from '../../app/features/task/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function TaskRoutes({ activity }) {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.task.tasksByActivityId)
  useEffect(() => {
    dispatch(loadTasksByActivityId(activity._id))
  }, [dispatch, activity._id])
  return (
    <Routes>
      <Route path={`/`} element={<Activity activity={activity} tasks={tasks} />} />
      {tasks.map((task) => (

       <Route key={task._id} path={`${task._id}/*`} element={<Task task={task} />} />

      ))}
    </Routes>
  )
}
