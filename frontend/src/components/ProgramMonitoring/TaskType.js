import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
} from '@coreui/react';
function TaskType({ onSelectTaskType }) {
  const [taskTypes, setTaskTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    const fetchTaskTypes = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasktypes');
        if (!response.ok) {
          throw new Error('Failed to fetch task types');
        }
        const data = await response.json();
        setTaskTypes(data.taskTypes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskTypes();
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSelectTaskType = (taskType) => {
    onSelectTaskType(taskType); // Pass the full task type object to the parent
    handleCloseModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error}
        <CButton color="primary" onClick={() => window.location.reload()}>
          Retry
        </CButton>
      </div>
    );
  }

  return (
    <CModal visible={modalVisible} onClose={handleCloseModal} backdrop="static">
      <CModalHeader>
        <CModalTitle>Choose Task Type</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          {taskTypes.map((type) => (
            <CCol key={type._id} sm={6} className="mb-3">
              <CCard
                color="primary"
                textColor="white"
                className="text-center task-card"
                onClick={() => handleSelectTaskType(type)} // Pass the full type object
                style={{ cursor: 'pointer' }}
              >
                <CCardBody>{type.name}</CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={handleCloseModal}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default TaskType;
