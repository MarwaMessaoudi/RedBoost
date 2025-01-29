import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
} from '@coreui/react';
import { useSelector } from 'react-redux';

function AddTask({ taskType, onAddTask, onCancel,activityId }) {
  const [taskName, setTaskName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setTaskOwner] = useState('');
  const users = useSelector((state) => state.usersSlice.users);

  const handleSubmit = () => {
    if (!taskName || !startDate || !endDate || !userId) {
      alert('All fields are required');
      return;
    }
    console.log('Task Owner:', userId); // Debugging line

    // Determine the task state based on dates
    const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD
    let taskState = 'Not Started';

    if (startDate <= today && endDate >= today) {
      taskState = 'In Progress';
    } else if (endDate < today) {
      taskState = 'Completed';
    }

    // Add the task with its determined state
    onAddTask({ 
      taskName ,
      startDate, 
      endDate,
      userId ,
      typeId: taskType._id,
      activityId, // Include activityId here
    });
  };

  const handleOwnerChange = (e) => {
    const selectedUsername = e.target.value;
    setTaskOwner(selectedUsername);
    if (!users || users.length === 0) {
      console.log('No users available');
      return;
    }

    // Find the user object by username
    const selectedUser = users.find((user) => user.username === selectedUsername);

    if (selectedUser) {
      console.log('Selected User ID:', selectedUser._id); // Use _id instead of id
      setTaskOwner(selectedUser._id); // Store the user ID instead of username
    } else {
      console.log('User not found');
    }
  };

  return (
    <CModal visible={true} onClose={onCancel}>
      <CModalHeader>
        <CModalTitle>Add Task</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          label="Task Name:"
          className="mb-3"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <CFormInput
          label="Start Date:"
          className="mb-3"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <CFormInput
          label="End Date:"
          className="mb-3"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <CFormSelect
          label="Assign Task Owner:"
          value={userId}
          onChange={handleOwnerChange}
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user._id} value={user.username}>
              {user.username} (ID: {user._id})
            </option>
          ))}
        </CFormSelect>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={handleSubmit}>
          Save Task
        </CButton>
        <CButton color="secondary" onClick={onCancel}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default AddTask;
