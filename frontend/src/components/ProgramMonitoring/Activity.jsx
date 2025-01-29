import React, { useState, useEffect } from 'react'; 
import {
  CCard,
  CCol,
  CContainer,
  CRow,
  CCardHeader,
  CCardBody,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCalendar, cilUser } from '@coreui/icons';
import TaskType from './TaskType';
import AddTask from './AddTask';
import { createTask } from '../../app/features/task/taskSlice';
import { loadUserById } from '../../app/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { loadTasksByActivityId } from '../../app/features/task/taskSlice';

function Activity({ activity }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasksByActivityId); // Get tasks from Redux store
  const [addTaskStep, setAddTaskStep] = useState(null);
  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [userNames, setUserNames] = useState({});
  const [taskTypes, setTaskTypes] = useState([]);

  useEffect(() => {
    if (activity._id) {
      dispatch(loadTasksByActivityId(activity._id));
    }
  }, [dispatch, activity._id]);
  useEffect(() => {
    if (tasks.length > 0) {
      console.log('Fetched tasks:', tasks);
    }
  }, [tasks]); // Watch for changes in tasks

  useEffect(() => {
    const fetchAndStoreUserNames = async () => {
      const userNamesMap = {};
      const promises = [];

      for (const task of tasks) {
        if (!userNamesMap[task.userId]) {
          console.log('Fetching user details for taskOwner:', task.userId);
          const userDetailsPromise = fetchUserDetails(task.userId)
            .then(userDetails => {
              if (userDetails) {
                console.log('User details fetched:', userDetails);
                userNamesMap[task.userId] = userDetails.username;
              }
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
            });
          promises.push(userDetailsPromise);
        }
      }

      await Promise.all(promises);
      setUserNames(userNamesMap);
    };

    if (tasks.length > 0) {
      fetchAndStoreUserNames();
    }
  }, [tasks]);

  // Fetch task types from the backend
  useEffect(() => {
    const fetchTaskTypes = async () => {
      try {
        const response = await fetch('/tasktypes'); // Adjust the API endpoint as needed
        const data = await response.json();
        setTaskTypes(data);
      } catch (error) {
        console.error('Error fetching task types:', error);
      }
    };

    fetchTaskTypes();
  }, []);

  const fetchUserDetails = async (userId) => {
    try {
      console.log('Fetching user details for userId:', userId);
      const result = await dispatch(loadUserById(userId));
      return result.payload;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const handleTaskTypeSelect = (type) => {
    console.log('Task type selected:', type);
    setSelectedTaskType(type);
    setAddTaskStep('form');
  };
  const getTaskTypeName = (typeId) => {
    const taskType = taskTypes.find((type) => type._id === typeId);
    return taskType ? taskType.name : 'Unknown Type';
  };
  
  tasks.forEach((task) => {
    console.log(`Task Name: ${task.taskName}, Type: ${getTaskTypeName(task.typeId)}`);
  });
  

  

  const handleAddTask = (data) => {
    console.log('Adding task with data:', data);
    const taskData = {
      ...data,
      taskType: selectedTaskType._id, // Send the taskTypeId in the request body
      xpPoints: 0,
      resources: [],
      deliverables: [],
      activityId: activity._id,
    };
    dispatch(createTask(taskData));
    setAddTaskStep(null);
  };




  const TaskStatusCard = ({ status, tasks, color }) => {
    console.log('Rendering TaskStatusCard for status:', status);
    console.log('Tasks passed:', tasks);

    return (
      <CCol xs={12} md={4}>
        <CCard className="mb-3 card" style={{ height: '400px' }}>
          <CCardHeader
            className="text-light"
            style={{
              backgroundColor: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {status}
          </CCardHeader>
          <CCardBody style={{ overflow: 'auto' }}>
            {tasks.map((task, index) => {
              if (task.status === status) {
                console.log(`Rendering task with ID: ${task._id} and status: ${status}`);
                return (
                  <div className="Card_into_card" key={index}>
                    <div
                      onClick={() => navigate(`/Dash/Monitoring/${activity.programId}/${activity._id}/${task._id}`)} // Navigate to task details page
                      className="card border border-success shadow mb-3"
                      style={{ maxWidth: '400px', cursor: 'pointer' }}
                    >
                      <div className="card-header">
                        <strong>{task.taskName}</strong>
                      </div>
                      <div className="card-body">
                        <div className="text-muted mb-2">
                          <CIcon icon={cilUser} className="mr-1" />
                          Assigned to: {userNames[task.userId] || 'Loading...'}
                        </div>
                        <div className="text-muted mb-2">
                        <CIcon icon={cilUser} className="mr-1" />
                        Task Type: {getTaskTypeName(task.typeId)}
                      </div>
                        <div className="text-muted mb-2">
                          <CIcon icon={cilCalendar} className="mr-1" />
                          Start Date: {new Date(task.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-muted mb-2">
                          <CIcon icon={cilCalendar} className="mr-1" />
                          End Date: {new Date(task.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </CCardBody>
        </CCard>
      </CCol>
    );
  };

  return (
    <CContainer style={{ padding: '20px' }} className="mt-4">
      <CRow>
        <CCol>
          <CButton
            onClick={() => {
              console.log('Add Task button clicked');
              setAddTaskStep('select');
            }}
            className="mb-3"
            shape="rounded"
            color="primary"
            style={{ float: 'right' }}
          >
            Add Task
          </CButton>
        </CCol>
      </CRow>

      {addTaskStep === 'select' && (
        <TaskType
          taskTypes={taskTypes} // Pass taskTypes to the TaskType component
          onSelectTaskType={handleTaskTypeSelect}
        />
      )}

      {addTaskStep === 'form' && (
        <AddTask
          taskType={selectedTaskType}
          onAddTask={handleAddTask}
          onCancel={() => setAddTaskStep(null)}
          activityId={activity._id} // Pass activityId
        />
      )}

      <CRow className="mb-3">
        <TaskStatusCard status="notStarted" tasks={tasks} color="#006666" />
        <TaskStatusCard status="inProgress" tasks={tasks} color="#fb5858" />
        <TaskStatusCard status="completed" tasks={tasks} color="#0ca279" />
        <TaskStatusCard status="valid" tasks={tasks} color="#074a38" />
        <TaskStatusCard status="expired" tasks={tasks} color="#dab600" />
        <TaskStatusCard status="cancelled" tasks={tasks} color="grey" />
      </CRow>
    </CContainer>
  );
}

export default Activity;
