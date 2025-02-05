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
import TaskType from './TaskType'; // Import the TaskType component
import { createTask, deleteTask } from '../../app/features/task/taskSlice';
import { loadUserById } from '../../app/features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import stylo from '../../assets/icons/stylo.png';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Activity({ activity, tasks }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedtask] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [taskTypeModalVisible, setTaskTypeModalVisible] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [userNames, setUserNames] = useState({});
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAndStoreUserNames = async () => {
      const userNamesMap = {};
      const promises = [];

      for (const task of tasks) {
        if (!userNamesMap[task.userId]) {
          const userDetailsPromise = fetchUserDetails(task.userId)
            .then(userDetails => {
              if (userDetails) {
                userNamesMap[task.userId] = userDetails.username;
              } else {
                console.log(`No user details found for user ID: ${task.userId}`);
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

  const fetchUserDetails = async (userId) => {
    try {
      const result = await dispatch(loadUserById(userId));
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

  const handleUpdateTask = (task) => {
    setSelectedtask(task);
    setVisible(true);
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

  
  const handleViewTask = (task) => {
    navigate(`/Dash/${task._id}`);
  };

  const handleDeleteTask = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteTask(taskId))
          .unwrap()
          .then(() => {
            Swal.fire('Deleted!', 'Task has been deleted.', 'success');
          })
          .catch(error => {
            Swal.fire('Error!', error.message || 'Failed to delete task', 'error');
          });
      }
    });
  };

  const handleSelectTaskType = (taskType) => {
    setSelectedTaskType(taskType);
    setTaskTypeModalVisible(false);
    setAddModalVisible(true);
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
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <strong>{task.taskName}</strong>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          {/* Edit Icon */}
                          <img
                            src={stylo}
                            alt="Update Icon"
                            style={{
                              width: '20px',
                              height: '20px',
                              cursor: 'pointer',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateTask(task);
                            }}
                          />
                          {/* Delete Icon */}
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{
                              cursor: 'pointer',
                              width: '20px',
                              height: '20px',
                              color: 'black',
                              transition: 'transform 0.2s',
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTask(task._id);
                            }}
                          />
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="text-muted mb-2">
                          <CIcon icon={cilUser} className="mr-1" />
                          Assigned to: {userNames[task.userId] || 'Loading...'}
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

  const getValidTasks = () => tasks.filter((task) => task.status === 'valid').length;
  const getProgressTasks = () => tasks.filter((task) => task.status === 'inProgress').length;
  const getCompletedTasks = () => tasks.filter((task) => task.status === 'completed').length;
  const getNotStartedTasks = () => tasks.filter((task) => task.status === 'notStarted').length;
  const getCancelledTasks = () => tasks.filter((task) => task.status === 'cancelled').length;
  const getExpiredTasks = () => tasks.filter((task) => task.status === 'expired').length;

  return (
    <>
      {taskTypeModalVisible && (
        <TaskType onSelectTaskType={handleSelectTaskType} />
      )}
     {addModalVisible && (
  <AddTask
    setOpen={setAddModalVisible}
    open={addModalVisible}
    onAddTask={handleAddTask} // Corrected prop name
    activity={activity}
    taskType={selectedTaskType}
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
              onClick={() => setTaskTypeModalVisible(true)}
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
                      cursor: pointer;
                      transform: scale(1.05);
                      transition: transform 0.8s ease;
                      background-color: #e0e0e0;
                      transition: background-color 0.8s ease;
                    }
                    .Card_into_card:hover .card {
                      transform: scale(1.05);
                      transition: transform 0.3s ease;
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
                              e.stopPropagation();
                              handleViewTask(task);
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
  );
}

export default Activity;