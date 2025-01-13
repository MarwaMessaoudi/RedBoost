import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CInputGroup,
  CFormSelect,
  CInputGroupText,
} from '@coreui/react'
import { useSelector } from 'react-redux'
const formatDate = (date) => {
  let month = '' + (date.getMonth() + 1), // getMonth() is zero-based
    day = '' + date.getDate(),
    year = date.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

function AddTask({ open, setOpen, handleAddTask, activity }) {
  const [taskName, setTaskName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [taskOwner, setTaskOwner] = useState('')
  const users = useSelector((state) => state.usersSlice.users)

  const handleChangeStartDate = (date) => {
    if (endDate && date > endDate) {
      alert('Start date must be less than end date')
      setStartDate(endDate)
    } else if (date < activity.startDate) {
      alert('Start date must be greater than activity start date')
    } else if (date > activity.endDate) {
      alert('Start date must be less than activity end date')
    } else {
      setStartDate(date)
    }
  }

  const handleChangeEndDate = (date) => {
    if (date < startDate) {
      alert('End date must be greater than start date')
      setEndDate(startDate)
    } else if (date > activity.endDate) {
      alert('End date must be less than activity end date')
    } else if (date < activity.startDate) {
      alert('End date must be greater than activity start date')
    } else {
      setEndDate(date)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskName || !startDate || !endDate || !taskOwner) {
      alert('All fields are required')
    } else {
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0)

      const taskStartDate = new Date(startDate)
      taskStartDate.setHours(0, 0, 0, 0)
      const taskData = {
        taskName: taskName,
        startDate: startDate,
        endDate: endDate,
        status: taskStartDate > currentDate ? 'notStarted' : 'inProgress',
        color: taskStartDate > currentDate ? 'blue' : 'pink',
        taskOwner: taskOwner,
      }
      handleAddTask(taskData)
      setOpen(false)
    }
  }

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-')
    return `${day}/${month}/${year}`
  }
  return (
    <>
      <CModal
        visible={open}
        onClose={() => setOpen(false)}
        aria-labelledby="LiveDemoExampleLabel"
        backdrop="static"
      >
        <CModalHeader onClose={() => setOpen(false)}>
          <CModalTitle id="LiveDemoExampleLabel">Add Task</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            label="Task Name:"
            className="mb-3"
            type="text"
            id="name"
            name="name"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon2">Start Date</CInputGroupText>
            <CFormInput
              type="date"
              id="start date"
              placeholder="Enter start date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon2">End Date</CInputGroupText>
            <CFormInput
              type="date"
              id="end date"
              placeholder="Enter end date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CFormSelect
              aria-label="The Task Owner"
              onChange={(e) => setTaskOwner(e.target.value)}
              value={taskOwner}
            >
              <option>Choose The Task Owner</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
                </option>
              ))}
            </CFormSelect>
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setOpen(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSubmit}>
            Add
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AddTask