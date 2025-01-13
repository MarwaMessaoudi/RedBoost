import React, { useState, useEffect } from 'react'
import { storage } from '../../firebase';
import 'firebase/storage';
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CButton,
  CFormInput,
  CFormCheck,
  CFormTextarea,
  CForm,
  CProgressBar,
  CProgress,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody
} from '@coreui/react'
import { updateTask } from '../../app/features/task/taskSlice'
import { useDispatch } from 'react-redux'
import CommentSection from './CommentSection'
import img from '../Images/details.webp'
import { IoClose } from 'react-icons/io5'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loadUserById } from '../../app/features/users/usersSlice'
import axios from 'axios'
import { FcFullTrash } from "react-icons/fc";

const Task = ({ task }) => {
  const dispatch = useDispatch()
  const [currentTask, setCurrentTask] = useState(task)
  const [user, setUser] = useState(null) // Add state to store user data
  const [newKpiLabel, setNewKpiLabel] = useState('')
  const [newKpiValue, setNewKpiValue] = useState('')
  const [newDeliverableName, setNewDeliverableName] = useState('')
  const [newRapportTitle, setNewRapportTitle] = useState('')
  const [newRapportText, setNewRapportText] = useState('')
  const [newComment, setNewComment] = useState('')
  const [deliverableFile, setDeliverableFile] = useState(null)
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    task.status === 'completed' ? 'Task completed' : 'Task in progress',
  )

  useEffect(() => {
    console.log('Task Prop:', task) // Debugging log
    console.log('Current Task:', currentTask) // Debugging log

    // Fetch the user data when the component mounts
    const fetchUser = async (userId) => {
      try {
        // Dispatch the loadUserById action

        const result = await dispatch(loadUserById(userId))
        const userData = result.payload // Extract the payload containing the user data

        console.log('User Data:', userData) // Debugging log
        setUser(userData) // Update the user state with the fetched user data
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    // Check if task has a taskOwner and then fetch the user data
    if (task.taskOwner) {
      console.log('Fetching user data for task owner:', task.taskOwner) // Debugging log
      fetchUser(task.taskOwner)
    }
  }, [task.taskOwner, currentTask, dispatch])

  // Log the user state whenever it changes
  useEffect(() => {
    console.log('User State:', user) // Debugging log
  }, [user])

  const handleToggleTaskStatus = () => {
    if (task.status === 'inProgress' && task.deliverables.length === 0) {
      alert('Please add a deliverable before changing the status')
      return
    }

    let updatedStatusMessage = ''
    if (task.status === 'completed') {
      updatedStatusMessage = 'Task in progress'
    } else {
      updatedStatusMessage = 'Task completed'
    }

    const updatedTask = {
      ...task,
      status: task.status === 'completed' ? 'inProgress' : 'completed',
    }

    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )

    setCurrentTask(updatedTask)
    setStatusMessage(updatedStatusMessage)
  }

  const notifyError = (field) => {
    toast.error(`The ${field} field is required.`, {
      autoClose: 3000,
    })
  }

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank')
  }

  const handleAddKpi = () => {
    if (newKpiLabel === '') {
      return notifyError('Kpi Label')
    } else if (newKpiValue === '') {
      return notifyError('Kpi Value')
    }
    const updatedTask = {
      ...task,
      kpis: [...task.kpis, { label: newKpiLabel, count: newKpiValue }],
    }
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )
    setCurrentTask(updatedTask)
  }

  const handleAddDeliverable = async (e) => {
    e.preventDefault();

    if (deliverableFile) {
      const storageRef = ref(storage, `deliverables/${deliverableFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, deliverableFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate upload progress
          const progress = parseFloat(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2));
          setProgress(progress);
        },
        (error) => {
          // Log error details for debugging
          console.error('Error uploading file:', error.code, error.message);
        },
        async () => {
          try {
            // Get the file download URL after the upload completes
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // No parentheses needed

            console.log('File available at', downloadURL);

            // Create a new deliverable object
            const newDeliverable = {
              fileName: newDeliverableName,
              fileUrl: downloadURL,
            };

            // Optimistically update local state
            const updatedTask = {
              ...currentTask,
              deliverables: [...currentTask.deliverables, newDeliverable],
            };
            setCurrentTask(updatedTask);  // Update local state immediately

            // Dispatch the updated task to MongoDB after file upload is complete
            dispatch(
              updateTask({
                taskId: task._id,
                taskData: updatedTask,
              })
            );

            // Reset form fields after dispatch
            setNewDeliverableName('');  // Clear the file name input
            setDeliverableFile(null);  // Clear the file input
            setProgress(0);            // Reset progress bar
          } catch (err) {
            console.error('Error getting download URL:', err);
          }
        }
      );
    }
  };



  const handleDeleteDeliverable = async (deliverableId, fileUrl) => {
    try {
      // Create a reference to the file to delete
      const fileRef = ref(storage, fileUrl);

      // Delete the file from Firebase Storage
      await deleteObject(fileRef);

      console.log('File deleted successfully from Firebase Storage.');

      // Now, remove the deliverable from your application's state
      setCurrentTask((prevTask) => ({
        ...prevTask,
        deliverables: prevTask.deliverables.filter((deliverable) => deliverable.id !== deliverableId),
      }));

      // Optionally, also delete from your database if you're storing deliverables there
      // Example: await deleteDeliverableFromDatabase(deliverableId);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleAddRapport = () => {
    if (newRapportTitle === '') {
      return notifyError('Rapport Title')
    } else if (newRapportText === '') {
      return notifyError('Rapport Text')
    }
    const updatedTask = {
      ...task,
      reports: [...task.reports, { label: newRapportTitle, count: newRapportText }],
    }
    dispatch(
      updateTask({
        taskId: task._id,
        taskData: updatedTask,
      }),
    )
    setCurrentTask(updatedTask)
  }


  const getColorByIndex = (index) => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
    return colors[index % colors.length]
  }

  const isValidDate = (date) => {
    return !isNaN(Date.parse(date))
  }

  const formatDate = (date) => {
    if (isValidDate(date)) {
      return new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    }
    return '' // Fallback for invalid date
  }

    // hundle delete KPIS
    const handleDeleteKpi = (index) => {
      const updatedKpis = currentTask.kpis.filter((_, i) => i !== index)
      const updatedTask = {
        ...currentTask,
        kpis: updatedKpis,
      }
      dispatch(
        updateTask({
          taskId: task._id,
          taskData: updatedTask,
        })
      )
      window.location.reload()
    }
    const handleDeleteReport = (index) => {
      const updatedReports = currentTask.reports.filter((_, i) => i !== index);
      const updatedTask = {
        ...currentTask,
        reports: updatedReports,
      };

      dispatch(
        updateTask({
          taskId: task._id,
          taskData: updatedTask,
        })
      );

      // Reload the page or update the state if you don't want a full reload
      window.location.reload();
    };

  return (
    <>
      <ToastContainer />
      <CRow>
        <CCol>
          <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={img} alt="Trendy Pants and Shoes" className="img-fluid rounded-start" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Task Details</h5>
                  <p className="card-text">
                    <strong>Task Name:</strong> {currentTask.taskName}
                  </p>
                  <p className="card-text">
                    <strong>Task Owner:</strong> {user ? user.username || 'Unknown' : 'Loading...'}
                  </p>

                  <p className="card-text">
                    <strong>Target Date:</strong>{' '}
                    {currentTask.endDate
                      ? formatDate(currentTask.endDate)
                      : 'No target date set'}
                  </p>

                  <p className="card-text">
                    <strong>Status:</strong> {currentTask.status}
                  </p>
                  {task.status === 'inProgress' ? (
                    <CFormCheck
                      className="mb-3"
                      style={{ display: task.status === 'notStarted' ? 'none' : 'block' }}
                      id="flexCheckChecked"
                      label={'I have Completed The Task'}
                      checked={task.status === 'completed' ? true : false}
                      onChange={handleToggleTaskStatus}
                    />
                  ) : (
                    <p className=" text-center text-success">this Task is {currentTask.status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader className="bg-dark text-light">Resourceshhhh</CCardHeader>
            <CCardBody>
              <div>
                <h5>{currentTask.taskName} Resources:</h5>
                <CListGroup>
                  {currentTask.resources.map((resource, index) => (
                    <CListGroupItem key={index}>
                      <CButton href={resource.url} download color="link">
                        {resource.fileName}
                      </CButton>
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCard className="mt-3 mb-3">
        <CCardHeader className="bg-dark text-light">Sections</CCardHeader>
        <CCardBody>
        <CCard className="mt-3 mb-3">
          <CCardHeader className="bg-info text-light">KPIs</CCardHeader>
          <CCardBody>
            <CListGroupItem>
              <div className="form-group d-flex align-items-center mt-3 mb-3">
                <label htmlFor="newKpiLabel" className="me-2">Label:</label>
                <CFormInput
                  id="newKpiLabel"
                  placeholder="KPI Label"
                  value={newKpiLabel}
                  onChange={(e) => setNewKpiLabel(e.target.value)}
                  className="me-3"
                  style={{ maxWidth: '200px' }}
                />
                <label htmlFor="newKpiValue" className="me-2">Value:</label>
                <CFormInput
                  id="newKpiValue"
                  placeholder="KPI Value"
                  value={newKpiValue}
                  onChange={(e) => setNewKpiValue(e.target.value)}
                  className="me-3"
                  style={{ maxWidth: '150px' }}
                />
                <CButton
                  style={{ backgroundColor: '#00cc99' }}
                  onClick={() => handleAddKpi()}
                >
                  Add KPI
                </CButton>
              </div>
            </CListGroupItem>
            <CListGroup>
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">KPI Label</th>
                    <th scope="col">KPI Value</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTask.kpis &&
                    currentTask.kpis.map((kpi, index) => (
                      <tr key={index}>
                        <th scope="row">KPI-{index}</th>
                        <td>{kpi.label}</td>
                        <td>{kpi.count}</td>
                        <td>
                          <IoClose
                            onClick={() => handleDeleteKpi(index)}
                            style={{ cursor: 'pointer', color: 'red' }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </CListGroup>
          </CCardBody>
        </CCard>


        <CCard className="mt-3 mb-3">
          <CCardHeader className="bg-info text-light">Documents</CCardHeader>
          <CCardBody>
            {/* Input fields on a single line */}
            <CForm onSubmit={handleAddDeliverable} className="d-flex justify-content-between align-items-center mb-4">
              <CFormInput
                id="newDeliverableName"
                placeholder="Deliverable Name"
                value={newDeliverableName}
                onChange={(e) => setNewDeliverableName(e.target.value)}
                className="me-2"
              />
              <input
                id="newDeliverableFile"
                name="deliverableFile"
                type="file"
                onChange={(e) => {
                  console.log('Selected deliverable file:', e.target.files[0]);
                  setDeliverableFile(e.target.files[0]);
                }}
                className="me-2"
              />
              <CButton style={{ backgroundColor: '#00cc99' }} type="submit">
                Add Deliverable
              </CButton>
            </CForm>

            {/* Display Upload Progress as a Bar */}
            {progress > 0 && (
              <CProgress className="mt-2 mb-3" style={{ height: '20px' }}>
                <CProgressBar value={progress} color="success" animated striped className="text-center">
                  {progress}%
                </CProgressBar>
              </CProgress>
            )}

            {/* Table to display deliverables */}
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <th>Name</th>
                  <th>Actions</th>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentTask.deliverables &&
                  currentTask.deliverables.map((deliverable, index) => (
                    <CTableRow key={index}>
                      <td>{deliverable.fileName}</td>
                      <td>
                        <CButton
                          onClick={() => handleDownload(deliverable.fileUrl)}
                          color="link"
                          className="d-inline-flex align-items-center"
                        >
                          Download
                        </CButton>
                        <CButton color="warning" className="ms-2">
                          <FcFullTrash
                            style={{ fontSize: '16px' }}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the download
                              handleDeleteDeliverable(deliverable.id, deliverable.fileUrl); // Pass the deliverable ID and file URL
                            }}
                          />
                        </CButton>
                      </td>
                    </CTableRow>
                  ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>


          <CCard className="mt-3 mb-3">
            <CCardHeader className="bg-info text-light">Reporting Section</CCardHeader>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              {currentTask.reports.map((report, index) => (
                <div
                  style={{ minWidth: '300px', margin: '10px' }}
                  className={`card radius-10 border-start border-0 border-3 border-${getColorByIndex(index)} shadow`}
                >
                  <IoClose onClick={() => handleDeleteReport(index)} // Call the delete handler
                      style={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        fontSize: '20px',
                        margin: '5px',
                        cursor: 'pointer',
                      }}
                    />
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="mb-0 text-secondary">{report.label}</p>
                        <p className="mb-0 font-13">{report.count}</p>
                      </div>
                      <div className="widgets-icons-2 rounded-circle bg-gradient-ohhappiness text-white ms-auto">
                        <i className="fa fa-bar-chart"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CCardBody>
              <CFormInput
                placeholder="Title"
                value={newRapportTitle}
                onChange={(e) => setNewRapportTitle(e.target.value)}
                className="mb-3"
              />
              <CFormTextarea
                placeholder="Text"
                value={newRapportText}
                onChange={(e) => setNewRapportText(e.target.value)}
                className="mt-3 mb-3"
              />
              <CButton
                style={{ backgroundColor: '#00cc99' }}
                onClick={() => handleAddRapport()}
                className="mt-3 mb-3"
              >
                Add Reporting Section
              </CButton>
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Task
