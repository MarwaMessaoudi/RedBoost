import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase';
import 'firebase/storage';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
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
} from '@coreui/react';
import { updateTask } from '../../app/features/task/taskSlice';
import { useDispatch } from 'react-redux';
import CommentSection from './CommentSection';
import img from '../Images/details.webp';
import { IoClose } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadUserById } from '../../app/features/users/usersSlice';
import axios from 'axios';
import { FcFullTrash } from "react-icons/fc";
import { useParams } from 'react-router-dom';

const Task = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const [user, setUser] = useState(null);
  const [currentTask, setCurrentTask] = useState({
    taskName: '',
    userId: '',
    endDate: '',
    status: '',
    resources: [], // Default empty array
    deliverables: [], // Default empty array
    reports: [], // Default empty array
    kpis: [], // Default empty array
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [newDeliverableName, setNewDeliverableName] = useState('');
  const [newRapportTitle, setNewRapportTitle] = useState('');
  const [newRapportText, setNewRapportText] = useState('');
  const [newComment, setNewComment] = useState('');
  const [deliverableFile, setDeliverableFile] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);













  // Fetch task details by taskId when component mounts
  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/taskbyid/${taskId}`);
        const data = await response.json();

        if (response.ok) {
          // Ensure arrays are initialized if they are undefined
          const taskData = {
            ...data.task,
            resources: data.task.resources || [],
            deliverables: data.task.deliverables || [],
            reports: data.task.reports || [],
            kpis: data.task.kpis || [],
          };
          setCurrentTask(taskData);

          if (data.task.userId) {
            const result = await dispatch(loadUserById(data.task.userId));
            setUser(result.payload);
          }
        } 
        else {
          console.error('Failed to fetch task:', data.message);
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId, dispatch]);

  if (loading) {
    return <div>Loading task details...</div>;
  }

  if (!currentTask) {
    return <div>Task not found</div>;
  }

  const handleToggleTaskStatus = () => {
    if (currentTask.status === 'inProgress' && currentTask.deliverables.length === 0) {
      alert('Please add a deliverable before changing the status');
      return;
    }

    const updatedStatusMessage = currentTask.status === 'completed' ? 'Task in progress' : 'Task completed';
    const updatedTask = {
      ...currentTask,
      status: currentTask.status === 'completed' ? 'inProgress' : 'completed',
    };

    dispatch(updateTask({ taskId: currentTask._id, taskData: updatedTask }));
    setCurrentTask(updatedTask);
  };

  const notifyError = (field) => {
    toast.error(`The ${field} field is required.`, { autoClose: 3000 });
  };

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleAddKpi = (kpiLabel) => {
    if (!kpiLabel) return;

    const existingKpi = currentTask.kpis.find((kpi) => kpi.kpiId.label === kpiLabel);
    if (!existingKpi) {
      const updatedKpis = [...currentTask.kpis, { kpiId: { label: kpiLabel }, count: 0 }];
      const updatedTask = { ...currentTask, kpis: updatedKpis };
      setCurrentTask(updatedTask);
      dispatch(updateTask({ taskId: currentTask._id, taskData: updatedTask }));
    }
  };

  const handleAddDeliverable = async (e) => {
    e.preventDefault();

    if (deliverableFile) {
      const storageRef = ref(storage, `deliverables/${deliverableFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, deliverableFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = parseFloat(((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2));
          setProgress(progress);
        },
        (error) => {
          console.error('Error uploading file:', error.code, error.message);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const newDeliverable = { fileName: newDeliverableName, fileUrl: downloadURL };
            const updatedTask = { ...currentTask, deliverables: [...currentTask.deliverables, newDeliverable] };
            setCurrentTask(updatedTask);
            dispatch(updateTask({ taskId: currentTask._id, taskData: updatedTask }));
            setNewDeliverableName('');
            setDeliverableFile(null);
            setProgress(0);
          } catch (err) {
            console.error('Error getting download URL:', err);
          }
        }
      );
    }
  };

  const handleDeleteDeliverable = async (deliverableId, fileUrl) => {
    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);
      setCurrentTask((prevTask) => ({
        ...prevTask,
        deliverables: prevTask.deliverables.filter((deliverable) => deliverable.id !== deliverableId),
      }));
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleAddRapport = () => {
    if (newRapportTitle === '') {
      return notifyError('Rapport Title');
    } else if (newRapportText === '') {
      return notifyError('Rapport Text');
    }
    const updatedTask = {
      ...currentTask,
      reports: [...currentTask.reports, { label: newRapportTitle, count: newRapportText }],
    };
    dispatch(updateTask({ taskId: currentTask._id, taskData: updatedTask }));
    setCurrentTask(updatedTask);
  };

  const getColorByIndex = (index) => {
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
    return colors[index % colors.length];
  };

  const formatDate = (date) => {
    if (!isNaN(Date.parse(date))) {
      return new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return '';
  };

  const handleDeleteKpi = async (kpiLabel) => {
    try {
      // Reset the KPI count to 0 in the local state
      const updatedKpis = currentTask.kpis.map((kpi) =>
        kpi.kpiId.label === kpiLabel ? { ...kpi, count: 0 } : kpi
      );
  
      // Update the local state
      const updatedTask = { ...currentTask, kpis: updatedKpis };
      setCurrentTask(updatedTask);
  
      // Find the KPI to reset its count in the backend
      const kpiToReset = updatedKpis.find((kpi) => kpi.kpiId.label === kpiLabel);
  
      if (kpiToReset) {
        // Send a request to the backend to reset the KPI count
        const response = await axios.put(
          `http://localhost:5000/${taskId}/kpis/reset`, // Backend endpoint for resetting KPI count
          { kpiId: kpiToReset.kpiId._id, count: 0 } // Send the KPI ID and reset count to 0
        );
  
        if (response.status === 200) {
          toast.success('KPI count reset successfully');
        } else {
          toast.error('Failed to reset KPI count');
        }
      }
    } catch (error) {
      console.error('Error resetting KPI count:', error);
      toast.error('Error resetting KPI count');
    }
  };

  const handleKpiValueChange = (kpiLabel, value) => {
    const updatedKpis = currentTask.kpis.map((kpi) =>
      kpi.kpiId.label === kpiLabel ? { ...kpi, count: value } : kpi
    );
    setCurrentTask({ ...currentTask, kpis: updatedKpis });
  };

  const handleUpdateKpis = async () => {
    try {
      // Prepare the data for the backend
      const kpiUpdates = currentTask.kpis.map((kpi) => ({
        kpiId: kpi.kpiId._id, // Use the _id field of kpiId
        count: kpi.count,     // Use the updated count from the input field
      }));

      // Call the backend endpoint to update the KPI counts
      const response = await axios.put(
        `http://localhost:5000/${taskId}/kpis`,
        { kpis: kpiUpdates } // Send all KPI updates
      );

      if (response.status === 200) {
        // Update the local state with the new KPI counts
        setCurrentTask(response.data.task); // Assuming the backend returns the updated task
        toast.success('KPIs updated successfully');
      } else {
        toast.error('Failed to update KPIs');
      }
    } catch (error) {
      console.error('Error updating KPIs:', error);
      toast.error('Error updating KPIs');
    }
  };
useEffect(() => {
    axios.get("/allkpi") // Replace with your actual API endpoint
      .then((response) => {
        setKpiList(response.data); // Set KPI list from API response
      })
      .catch((error) => console.error("Error fetching KPIs:", error));
  }, []);
  

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
                    <strong>Target Date:</strong> {formatDate(currentTask.endDate)}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong> {currentTask.status}
                  </p>
                  {currentTask.status === 'inProgress' ? (
                    <CFormCheck
                      className="mb-3"
                      style={{ display: currentTask.status === 'notStarted' ? 'none' : 'block' }}
                      id="flexCheckChecked"
                      label={'I have Completed The Task'}
                      checked={currentTask.status === 'completed'}
                      onChange={handleToggleTaskStatus}
                    />
                  ) : (
                    <p className="text-center text-success">This Task is {currentTask.status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader className="bg-dark text-light">Resources</CCardHeader>
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
              <div className="form-group d-flex align-items-center mt-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search KPIs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {searchTerm && (
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
                    {currentTask.kpis
                      .filter((kpi) => {
                        if (!kpi || !kpi.kpiId || !kpi.kpiId.label) return false;
                        return kpi.kpiId.label.toLowerCase().includes(searchTerm.toLowerCase());
                      })
                      .map((kpi, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{kpi.kpiId.label}</td>
                          <td>
                            <input
                              type="number"
                              value={kpi.count}
                              onChange={(e) =>
                                handleKpiValueChange(kpi.kpiId.label, parseInt(e.target.value, 10))
                              }
                            />
                          </td>
                          <td>
                            <CButton
                              color="danger"
                              onClick={() => handleDeleteKpi(kpi.kpiId.label)}
                            >
                              Delete
                            </CButton>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
              <CButton
                color="primary"
                onClick={handleUpdateKpis}
                className="mt-3"
              >
                Update KPI
              </CButton>
            </CCardBody>
          </CCard>

          <CCard className="mt-3 mb-3">
            <CCardHeader className="bg-info text-light">Documents</CCardHeader>
            <CCardBody>
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
                  onChange={(e) => setDeliverableFile(e.target.files[0])}
                  className="me-2"
                />
                <CButton style={{ backgroundColor: '#00cc99' }} type="submit">
                  Add Deliverable
                </CButton>
              </CForm>
              {progress > 0 && (
                <CProgress className="mt-2 mb-3" style={{ height: '20px' }}>
                  <CProgressBar value={progress} color="success" animated striped className="text-center">
                    {progress}%
                  </CProgressBar>
                </CProgress>
              )}
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <th>Name</th>
                    <th>Actions</th>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentTask.deliverables.map((deliverable, index) => (
                    <CTableRow key={index}>
                      <td>{deliverable.fileName}</td>
                      <td>
                        <CButton onClick={() => handleDownload(deliverable.fileUrl)} color="link" className="d-inline-flex align-items-center">
                          Download
                        </CButton>
                        <CButton color="warning" className="ms-2">
                          <FcFullTrash
                            style={{ fontSize: '16px' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDeliverable(deliverable.id, deliverable.fileUrl);
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

          {/* <CCard className="mt-3 mb-3">
            <CCardHeader className="bg-info text-light">Reporting Section</CCardHeader>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
              {currentTask.reports.map((report, index) => (
                <div
                  style={{ minWidth: '300px', margin: '10px' }}
                  className={`card radius-10 border-start border-0 border-3 border-${getColorByIndex(index)} shadow`}
                  key={index}
                >
                  <IoClose
                    onClick={() => handleDeleteReport(index)}
                    style={{ position: 'absolute', top: '0', right: '0', fontSize: '20px', margin: '5px', cursor: 'pointer' }}
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
              <CButton style={{ backgroundColor: '#00cc99' }} onClick={handleAddRapport} className="mt-3 mb-3">
                Add Reporting Section
              </CButton>
            </CCardBody>
          </CCard> */}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Task;