import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import axiosInstance from '../../axiosInstance.js'
function AddActivity({ open, setOpen, handleAddActivity, program }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleChangeStartDate = (date) => {
    if (endDate && date > endDate) {
      alert('Start date must be less than end date')
      setStartDate(endDate)
    } else if (date < program.startDate) {
      alert('Start date must be greater than program start date')
    } else if (date > program.endDate) {
      alert('Start date must be less than program end date')
    } else {
      setStartDate(date)
    }
  }

  const handleChangeEndDate = (date) => {
    if (date < startDate) {
      alert('End date must be greater than start date')
      setEndDate(startDate)
    } else if (date > program.endDate) {
      alert('End date must be less than program end date')
    } else if (date < program.startDate) {
      alert('End date must be greater than program start date')
    } else {
      setEndDate(date)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !description || !startDate || !endDate) {
      alert('All fields are required')
    } else {
      const currentDate = new Date()
      currentDate.setHours(0, 0, 0, 0)

      const activityStartDate = new Date(startDate)
      activityStartDate.setHours(0, 0, 0, 0)

      const activityData = {
        name,
        description,
        startDate,
        endDate,
        color: activityStartDate > currentDate ? 'blue' : 'pink',
        status: activityStartDate > currentDate ? 'notStarted' : 'inProgress',
      }
      handleAddActivity(activityData)
      setOpen(false)
    }
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
          <CModalTitle id="LiveDemoExampleLabel">Add an Activity</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            id="name"
            name="name"
            placeholder="Activity Name"
            text="Must be 6-20 characters long."
            aria-describedby="exampleFormControlInputHelpInline"
            onChange={(e) => setName(e.target.value)}
          />
          <CFormTextarea
            id="description"
            name="description"
            placeholder="Description"
            rows={3}
            text="Must be 8-20 words long."
            onChange={(e) => setDescription(e.target.value)}
          ></CFormTextarea>

          <CInputGroup className="mb-3">
            <CInputGroupText id="basic-addon2">Start Date</CInputGroupText>
            <CFormInput
              type="date"
              id="start date"
              placeholder="Enter start date"
              value={startDate}
              onChange={(e) => handleChangeStartDate(e.target.value)}
            />
          </CInputGroup>
          <CInputGroup>
            <CInputGroupText id="basic-addon2">End Date</CInputGroupText>
            <CFormInput
              type="date"
              id="end date"
              placeholder="Enter end date"
              value={endDate}
              onChange={(e) => handleChangeEndDate(e.target.value)}
            />
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

export default AddActivity
