import React, { useState } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CInputGroup,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
} from '@coreui/react'
import UploadComponent from './UploadFiles'
import axiosInstance from '../../axiosInstance'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { setEvents } from '../../app/features/events/events'
import { useDispatch } from 'react-redux'
const CreateEventForm = ({}) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [eventData, setEventData] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    status: '',
    capacity: '',
    eventType: '',
    eventLink: '',
    organizer: '',
    phoneNumber: '',
    email: '',
    expertName: '',
    sections: [
      {
        title: '',
        startingHour: '',
        duration: '',
        speakers: '',
      },
    ],
    tasks: [
      {
        taskName: '',
        deadline: '',
        status: 'Not Started',
        workers: [],
      },
    ],
  })
  const notifySuccess = () => {
    toast.success('Event Created successfully', {
      autoClose: 3000,
    })
  }
  const notifyError = () => {
    toast.error('Failed to Create Event', {
      autoClose: 3000,
    })
  }
  const notifyError2 = () => {
    toast.error('Please fill out all required fields before submitting.', {
      autoClose: 3000,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventData({
      ...eventData,
      [name]: value,
    })
  }

  const handleFileDrop = (e) => {
    const files = Array.from(e.target.files)
    setEventData({
      ...eventData,
      files: files,
    })
  }

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target
    const updatedSections = [...eventData.sections]
    updatedSections[index] = {
      ...updatedSections[index],
      [name]: value,
    }
    setEventData({
      ...eventData,
      sections: updatedSections,
    })
  }

  const handleTaskChange = (index, e) => {
    const { name, value } = e.target
    const updatedTasks = [...eventData.tasks]
    if (name === 'workers') {
      updatedTasks[index] = {
        ...updatedTasks[index],
        workers: value.split(',').map((worker) => worker.trim()), // Split and trim workers into an array
      }
    } else {
      updatedTasks[index] = {
        ...updatedTasks[index],
        [name]: value,
      }
    }
    setEventData({
      ...eventData,
      tasks: updatedTasks,
    })
  }

  const addSection = () => {
    setEventData({
      ...eventData,
      sections: [
        ...eventData.sections,
        { title: '', startingHour: '', duration: '', speakers: '' },
      ],
    })
  }

  const addTask = () => {
    setEventData({
      ...eventData,
      tasks: [
        ...eventData.tasks,
        {
          taskName: '',
          deadline: '',
          status: '',
          workers: [],
        },
      ],
    })
  }

  const removeTask = () => {
    const newTasks = [...eventData.tasks]
    newTasks.splice(1, newTasks.length - 1)
    setEventData({
      ...eventData,
      tasks: newTasks,
    })
  }

  const removeSection = () => {
    const newSections = [...eventData.sections]
    newSections.splice(1, newSections.length - 1)
    setEventData({
      ...eventData,
      sections: newSections,
    })
  }

  const handleSubmit = async () => {
    const isFormEmptyOrUnchanged = Object.values(eventData).some((value) => {
      if (typeof value === 'string') {
        return value.trim() === '' // Trim only if it's a string
      }
      if (Array.isArray(value)) {
        return value.some((item) => typeof item === 'string' && item.trim() === '') // Check array items
      }
      // Add additional checks if needed for other types (e.g., objects)
      return false // Return false for non-string, non-array types
    })

    if (isFormEmptyOrUnchanged) {
      notifyError2()
      return
    }
    try {
      // Filter out tasks that are incomplete or empty
      const filteredTasks = eventData.tasks.filter(
        (task) =>
          task.taskName.trim() !== '' && task.deadline.trim() !== '' && task.workers.length > 0,
      )

      // Update eventData with filtered tasks
      const eventDataWithTasks = {
        ...eventData,
        tasks: filteredTasks,
      }

      // Make a POST request to save eventDataWithTasks to the backend
      const response = await axiosInstance.post('/events', eventDataWithTasks)

      if (response.status === 200) {
        dispatch(setEvents(eventDataWithTasks))
        notifySuccess()
        setEventData({
          eventName: '',
          startDate: '',
          endDate: '',
          location: '',
          description: '',
          status: '',
          capacity: '',
          eventType: '',
          eventLink: '',
          organizer: '',
          phoneNumber: '',
          email: '',
          expertName: '',
          sections: [
            {
              title: '',
              startingHour: '',
              duration: '',
              speakers: '',
            },
          ],
          tasks: [
            {
              taskName: '',
              deadline: '',
              status: 'Not Started',
              workers: [],
            },
          ],
        })
      } else {
        notifyError()
      }
    } catch (error) {
      console.error('Failed to create event:', error)
      notifyError()
    }
  }

  return (
    <CContainer className="my-4">
      <ToastContainer />
      <CCard>
        <CCardHeader className="bg-dark text-light">Create New Event</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <h2 style={{ textAlign: 'center', margin: '20px' }}>Event Information</h2>
            <FormGroupRow label="Event Name">
              <CFormInput
                type="text"
                name="eventName"
                value={eventData.eventName}
                onChange={handleInputChange}
                required
              />
            </FormGroupRow>
            <FormGroupRow label="Start Date">
              <CFormInput
                type="datetime-local"
                name="startDate"
                value={eventData.startDate}
                onChange={handleInputChange}
                required
              />
            </FormGroupRow>
            <FormGroupRow label="End Date">
              <CFormInput
                type="datetime-local"
                name="endDate"
                value={eventData.endDate}
                onChange={handleInputChange}
                required
              />
            </FormGroupRow>
            <FormGroupRow label="Location">
              <CFormInput
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <FormGroupRow label="Description">
              <CFormTextarea
                name="description"
                value={eventData.description}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <h2 style={{ textAlign: 'center', margin: '20px' }}>Program</h2>
            <FormGroupRow label="Status">
              <CFormSelect name="status" value={eventData.status} onChange={handleInputChange}>
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </CFormSelect>
            </FormGroupRow>
            <FormGroupRow label="Capacity">
              <CFormInput
                type="number"
                name="capacity"
                value={eventData.capacity}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <FormGroupRow label="Event Type">
              <CFormInput
                type="text"
                name="eventType"
                value={eventData.eventType}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <FormGroupRow label="Event Link">
              <CFormInput
                type="url"
                name="eventLink"
                value={eventData.eventLink}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <FormGroupRow label="Organizer">
              <CFormInput
                type="text"
                name="organizer"
                value={eventData.organizer}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <FormGroupRow label="Phone Number">
              <CFormInput
                type="tel"
                name="phoneNumber"
                value={eventData.phoneNumber}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <FormGroupRow label="Email">
              <CFormInput
                type="email"
                name="email"
                value={eventData.email}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <FormGroupRow label="Expert Name">
              <CFormInput
                type="text"
                name="expertName"
                value={eventData.expertName}
                onChange={handleInputChange}
              />
            </FormGroupRow>
            <h2 style={{ textAlign: 'center', margin: '20px' }}>Sections</h2>
            {eventData.sections.map((section, index) => (
              <div key={index}>
                <h5 style={{ margin: '20px', color: 'green' }}>Section {index + 1} :</h5>
                <FormGroupRow label="Section Title">
                  <CFormInput
                    type="text"
                    name="title"
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, e)}
                  />
                </FormGroupRow>
                <FormGroupRow label="Starting Hour">
                  <CFormInput
                    type="time"
                    name="startingHour"
                    value={section.startingHour}
                    onChange={(e) => handleSectionChange(index, e)}
                  />
                </FormGroupRow>
                <FormGroupRow label="Duration (in minutes)">
                  <CFormInput
                    type="number"
                    name="duration"
                    value={section.duration}
                    onChange={(e) => handleSectionChange(index, e)}
                  />
                </FormGroupRow>
                <FormGroupRow label="Speakers">
                  <CFormTextarea
                    name="speakers"
                    value={section.speakers}
                    onChange={(e) => handleSectionChange(index, e)}
                  />
                </FormGroupRow>
              </div>
            ))}
            <CRow className="justify-content-center">
              <CCol xs="auto">
                <CButton
                  style={{ margin: '20px' }}
                  type="button"
                  color="info"
                  onClick={addSection}
                  className="mb-3 ml-3"
                >
                  Add Section
                </CButton>
                <CButton
                  style={{ margin: '20px' }}
                  type="button"
                  color="danger"
                  onClick={removeSection}
                  className="mb-3 ml-3"
                >
                  Remove the last Section
                </CButton>
              </CCol>
            </CRow>
            <h2 style={{ textAlign: 'center', margin: '20px' }}>Tasks</h2>
            {eventData.tasks.map((task, index) => (
              <div key={index}>
                <h5 style={{ margin: '20px', color: 'green' }}>Task {index + 1} :</h5>
                <FormGroupRow label="Task Name">
                  <CFormInput
                    type="text"
                    name="taskName"
                    value={task.taskName}
                    onChange={(e) => handleTaskChange(index, e)}
                  />
                </FormGroupRow>
                <FormGroupRow label="Deadline">
                  <CFormInput
                    type="datetime-local"
                    name="deadline"
                    value={task.deadline}
                    onChange={(e) => handleTaskChange(index, e)}
                  />
                </FormGroupRow>
                <FormGroupRow label="Status">
                  <CFormSelect
                    name="status"
                    value={task.status}
                    onChange={(e) => handleTaskChange(index, e)}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </CFormSelect>
                </FormGroupRow>
                <FormGroupRow label="Workers">
                  <CFormTextarea
                    name="workers"
                    value={task.workers.join(', ')}
                    onChange={(e) => handleTaskChange(index, e)}
                  />
                </FormGroupRow>
              </div>
            ))}
            <CRow className="justify-content-center">
              <CCol xs="auto">
                <CButton
                  style={{ margin: '20px' }}
                  type="button"
                  color="info"
                  onClick={addTask}
                  className="mb-3 ml-3"
                >
                  Add Task
                </CButton>
                <CButton
                  style={{ margin: '20px' }}
                  type="button"
                  color="danger"
                  onClick={removeTask}
                  className="mb-3 ml-3"
                >
                  Remove the last Task
                </CButton>
              </CCol>
            </CRow>
            <h2 style={{ textAlign: 'center', margin: '20px' }}>Media</h2>
            <UploadComponent />
            <CRow className="justify-content-center">
              <CCol xs="auto">
                <CButton onClick={handleSubmit} type="submit" color="primary" className="mt-3">
                  Create Event
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

const FormGroupRow = ({ label, children }) => (
  <CRow className="mb-3">
    <CCol md="3">
      <CFormLabel>{label}</CFormLabel>
    </CCol>
    <CCol md="9">{children}</CCol>
  </CRow>
)

export default CreateEventForm
