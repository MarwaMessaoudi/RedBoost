import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCol,
  CContainer,
  CRow,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react';
import { HiMagnifyingGlassCircle } from 'react-icons/hi2';
import { CChart } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import { cilCalendar, cilUser } from '@coreui/icons';
import EditTask from './EditTask';
import TaskView from './TaskView';
import AddTask from './AddTask';
import { createTask } from '../../app/features/task/taskSlice';
import { loadUserById } from '../../app/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Activity({ activity, tasks }) {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedtask] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [userNames, setUserNames] = useState({});
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAndStoreUserNames = async () => {
      const userNamesMap = {};
      const promises = [];
  
      for (const task of tasks) {
        if (!userNamesMap[task.taskOwner]) {
          console.log(`Fetching user details for user ID: ${task.taskOwner}`);
          const userDetailsPromise = fetchUserDetails(task.taskOwner)
            .then(userDetails => {
              if (userDetails) {
                userNamesMap[task.taskOwner] = userDetails.username;
                console.log(`Fetched user details:`, userDetails);
              } else {
                console.log(`No user details found for user ID: ${task.taskOwner}`);
              }
            })
            .catch(error => {
              console.error('Error fetching user details:', error);
            });
          promises.push(userDetailsPromise);
        }
      }
  
      await Promise.all(promises); // Wait for all user details promises to resolve
      setUserNames(userNamesMap); // Update user names map after all details are fetched
      console.log('Updated user names map:', userNamesMap);
    };
  
    if (tasks.length > 0) {
      fetchAndStoreUserNames();
    }
  }, [tasks]);
  

  const fetchUserDetails = async (userId) => {
    try {
      const result = await dispatch(loadUserById(userId));
      console.log('Dispatch result:', result);
      return result.payload;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddTask = (Data) => {
    const taskData = {
      ...Data,
      xpPoints: 0,
      resources: [],
      deliverables: [],
      kpis: [],
      activityId: activity._id,
    };
    console.log(taskData);
    dispatch(createTask(taskData));
    setAddModalVisible(false);
  };

  const getValidTasks = () => tasks.filter((task) => task.status === 'valid').length;
  const getProgressTasks = () => tasks.filter((task) => task.status === 'inProgress').length;
  const getCompletedTasks = () => tasks.filter((task) => task.status === 'completed').length;
  const getNotStartedTasks = () => tasks.filter((task) => task.status === 'notStarted').length;
  const getCancelledTasks = () => tasks.filter((task) => task.status === 'cancelled').length;
  const getExpiredTasks = () => tasks.filter((task) => task.status === 'expired').length;

  const handleViewTask = (task) => {
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/${task._id}`);
  };

  const TaskStatusCard = ({ status, tasks, color }) => {
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
                return (
                  <div className="Card_into_card" key={index}>
                    <div
                      onClick={() => handleViewTask(task)}
                      className="card border border-success shadow mb-3"
                      style={{ maxWidth: '400px', cursor: 'pointer' }}
                    >
                      <div className="card-header">
                        <strong>{task.taskName}</strong>
                      </div>
                      <div className="card-body">
                        <div className="text-muted mb-2">
                          <CIcon icon={cilUser} className="mr-1" />
                          Assigned to: {userNames[task.taskOwner] || 'Loading...'}
                        </div>
                        <div className="text-muted mb-2">
                          <CIcon icon={cilCalendar} className="mr-1" />
                          Start Date: {new Date(task.startDate).toLocaleDateString()}
                        </div>
                        <div className="text-muted mb-2">
                          <CIcon icon={cilCalendar} className="mr-1" />
                          End Date: {new Date(task.endDate).toLocaleDateString()}
                        </div>
                        <div className="text-muted">
                          {task.description}
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
    <>
      {addModalVisible && (
        <AddTask
          setOpen={setAddModalVisible}
          open={addModalVisible}
          handleAddTask={handleAddTask}
          activity={activity}
        />
      )}
      <CContainer style={{ padding: '20px' }} className="mt-4">
        {selectedTask && (
          <EditTask
            visible={visible}
            setVisible={setVisible}
            selectedTask={selectedTask}
            setSelectedtask={setSelectedtask}
          />
        )}
        {selectedTask && <TaskView open={open} setOpen={setOpen} selectedTask={selectedTask} />}
        <CRow>
          <CCol>
            <CButton
              onClick={() => setAddModalVisible(true)}
              className="mb-3"
              rounded="lg"
              color="primary"
              style={{ float: 'right' }}
            >
              Add Task
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <TaskStatusCard status={'notStarted'} tasks={tasks} color={'#006666'} />
          <TaskStatusCard status="inProgress" tasks={tasks} color={'#fb5858'} />
          <TaskStatusCard status={'completed'} tasks={tasks} color={'#0ca279'} />
          <TaskStatusCard status={'valid'} tasks={tasks} color={'#074a38'} />
          <TaskStatusCard status={'expired'} tasks={tasks} color={'#dab600'} />
          <TaskStatusCard status={'cancelled'} tasks={tasks} color={'grey'} />
        </CRow>
        <CRow>
          <CCol>
            <CCard className="mb-3">
              <CCardHeader className="bg-dark text-light">Recent Tasks</CCardHeader>
              <CCardBody>
                <style>
                  {`
                    .table-row:hover {
                      cursor: pointer; /* Change the cursor to pointer */
                      transform: scale(1.05); /* Slightly increase the size */
                      transition: transform 0.8s ease; /* Smooth transition */
                      background-color: #e0e0e0; /* Change the background color on hover */
                      transition: background-color 0.8s ease; /* Smooth transition */
                    }
                    .Card_into_card:hover .card {
                      transform: scale(1.05); /* Slightly increase the size */
                      transition: transform 0.3s ease; /* Smooth transition */
                    }
                    
                  `}
                </style>
                <CTable striped responsive className="text-center">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Target Date</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Task Name</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                      <CTableHeaderCell scope="col">View</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentTasks.map((task, index) => (
                      <CTableRow
                        key={index}
                        onClick={() => handleViewTask(task)}
                        className="table-row rows_of_table"
                      >
                        <CTableDataCell>
                          {new Date(task.endDate).toLocaleDateString()}
                        </CTableDataCell>
                        <CTableDataCell>{task.taskName}</CTableDataCell>
                        <CTableDataCell>{task.status}</CTableDataCell>
                        <CTableDataCell>
                          <HiMagnifyingGlassCircle
                            role="button"
                            style={{ fontSize: '25px', color: '#4CAF50' }}
                            onClick={(e) => {
                              e.stopPropagation() // Prevent the click event from bubbling up to the row
                              handleViewTask(task)
                            }}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <CPagination align="center">
                  <CPaginationItem
                    onClick={goToPreviousPage}
                    disabled={currentPage <= 1}
                    aria-label="Previous"
                  >
                    Previous
                  </CPaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <CPaginationItem
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    onClick={goToNextPage}
                    disabled={currentPage >= totalPages}
                    aria-label="Next"
                  >
                    Next
                  </CPaginationItem>
                </CPagination>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol>
            <CCard className="mb-3">
              <CCardHeader className="bg-dark text-light">Task Progress</CCardHeader>
              <CCardBody>
                <CChart
                  type="bar"
                  data={{
                    labels: [
                      'Total Tasks',
                      'In Progress',
                      'Completed',
                      'Valid',
                      'Expired',
                      'Cancelled',
                      'Not Started',
                    ],
                    datasets: [
                      {
                        label: 'Task Progress',
                        backgroundColor: ['pink', 'lightgreen', 'green', 'yellow', 'grey', 'blue'],
                        data: [
                          tasks.length,
                          getProgressTasks(),
                          getCompletedTasks(),
                          getValidTasks(),
                          getExpiredTasks(),
                          getCancelledTasks(),
                          getNotStartedTasks(),
                        ],
                      },
                    ],
                  }}
                  labels="Status"
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#adb7c5',
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: '#adb7c5',
                        },
                        ticks: {
                          color: '#adb7c5',
                        },
                      },
                      y: {
                        grid: {
                          color: '#adb7c5',
                        },
                        ticks: {
                          color: '#adb7c5',
                        },
                      },
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}

export default Activity
