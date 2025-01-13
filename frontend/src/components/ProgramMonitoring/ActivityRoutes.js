import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadActivitiesByProgramId } from '../../app/features/activity/activitySlice'
import Program from './Program'
import { addRoutes } from '../../app/features/routeSlice/routeSlice'
import TaskRoutes from './TaskRoutes'
const ActivityRoutes = ({ program }) => {
  console.log('ProgramWithActivities rendered')
  const dispatch = useDispatch()
  const activities = useSelector((state) => state.activity.activitiesByProgramId || [])

  useEffect(() => {
    dispatch(loadActivitiesByProgramId(program._id)).then((result) => {
      if (result?.payload) {
        dispatch(
          addRoutes(
            result.payload.map((activity) => ({
              path: `/Monitoring/${encodeURIComponent(program._id)}/${encodeURIComponent(activity._id)}`,
              name: activity.name,
              activityId: activity._id,
            })),
          ),
        )
      }
    })
  }, [dispatch, program._id, program.programTitle])

  return (
    <Routes>
      <Route path={`/`} element={<Program activities={activities} program={program} />} />
      {activities.map((activity) => (
        <Route
          key={activity._id}
          path={`${activity._id}/*`}
          element={<TaskRoutes activity={activity} />}
        />
      ))}
    </Routes>
  )
}

export default ActivityRoutes
