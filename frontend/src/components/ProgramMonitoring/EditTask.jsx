import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../app/features/task/taskSlice';

function EditTask({ visible, setVisible, selectedTask, setSelectedtask }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.task);
  const users = useSelector((state) => state.usersSlice.users); // Fetch users from Redux store
  const [formData, setFormData] = useState({
    taskName: '',
    startDate: '',
    endDate: '',
    taskOwner: '',
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        taskName: selectedTask.taskName,
        startDate: formatDate(selectedTask.startDate),
        endDate: formatDate(selectedTask.endDate),
        taskOwner: selectedTask.taskOwner, // Should already be an ObjectId
      });
    }
  }, [selectedTask]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!selectedTask?._id) {
      console.error('No task selected');
      return;
    }

    const taskData = {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
    };

    dispatch(updateTask({ taskId: selectedTask._id, taskData }))
      .then(() => {
        setVisible(false);
        setSelectedtask(null);
      })
      .catch((error) => {
        console.error('Update error:', error);
      });
  };

  return (
    <CModal
      visible={visible}
      onClose={() => {
        setVisible(false);
        setSelectedtask(null);
      }}
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle>Edit Task</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ height: '450px', overflow: 'auto' }}>
        <div className="mb-3">
          <CFormInput
            type="text"
            name="taskName"
            placeholder="Task Title"
            value={formData.taskName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <CFormInput
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <CFormInput
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          
        <CFormSelect
  name="userId"
  value={formData.userId}
  onChange={handleChange}
>
  <option value="">
    {selectedTask?.userId
      ? ` ${users.find((u) => u._id === selectedTask.userId)?.username || 'Unknown'}`
      : 'Select a Task Owner'}
  </option>
  {users.map((user) => (
    <option key={user._id} value={user._id}>
      {user.username}
    </option>
  ))}
</CFormSelect>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => setVisible(false)}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update'}
        </CButton>
      </CModalFooter>
      {error && <div className="alert alert-danger">{error}</div>}
    </CModal>
  );
}

export default EditTask;