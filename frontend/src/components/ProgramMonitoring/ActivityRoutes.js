import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadActivitiesByProgramId } from '../../app/features/activity/activitySlice';
import Program from './Program';
import { addRoutes } from '../../app/features/routeSlice/routeSlice';
import TaskRoutes from './TaskRoutes';
import TaskType from './TaskType'; // Import TaskType
import AddTask from './AddTask'; // Import AddTask
import Task from './Task';

const ActivityRoutes = ({ program }) => {
  console.log('ProgramWithActivities rendered');
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activity.activitiesByProgramId || []);

  useEffect(() => {
    dispatch(loadActivitiesByProgramId(program._id)).then((result) => {
      if (result?.payload) {
        dispatch(
          addRoutes(
            result.payload.map((activity) => ({
              path: `/Monitoring/${encodeURIComponent(program._id)}/${encodeURIComponent(activity._id)}`,
              name: activity.name,
              activityId: activity._id,
            }))
          )
        );
      }
    });
  }, [dispatch, program._id, program.programTitle]);

  return (
    <Routes>
      <Route path={`/`} element={<Program activities={activities} program={program} />} />
      {activities.map((activity) => (
        <Route key={activity._id} path={`${activity._id}/*`} element={<TaskRoutes activity={activity} />}>
          <Route path="tasktype" element={<TaskType activityId={activity._id} programId={program._id} />} />
          <Route path="addtask" element={<AddTask activityId={activity._id} programId={program._id} />} />
          <Route path="task/:taskId" element={<Task />} />
        </Route>
      ))}
    </Routes>
  );
};

export default ActivityRoutes;
