import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axiosInstance from '../../axiosInstance'
import { createProgram } from '../../app/features/programs/programsSlice'
import { ProgramCard } from '../../components/ProgramCard'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CListGroup,
  CListGroupItem,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
} from '@coreui/react'
const MAX_FILE_SIZE = 2097152 // 2 MB
export default function ProgramCards() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.usersSlice.users)
  const currentUser = useSelector((state) => state.userData.userData)
  const programs = useSelector((state) => state.programsSlice.programs)
  console.log('users', users)
  console.log('currentUser', currentUser)
  const [logoName, setLogoName] = useState('')
  const [logo, setLogo] = useState(null)
  const [programTitle, setProgramTitle] = useState('')
  const [programDescription, setProgramDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [budget, setBudget] = useState('')
  const [programLead, setProgramLead] = useState('')
  const [visible, setVisible] = useState(false)

  console.log('programs', programs)

  const fileInputRef = useRef(null)

  const handleChangeEndDate = (date) => {
    if (date < startDate) {
      alert('End date must be greater than start date')
    } else {
      setEndDate(date)
    }
  }
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }
  // Dispatch createProgram and then loadPrograms after the program is successfully created
  const addNewProgram = () => {
    if (
      logo === null ||
      programTitle === '' ||
      programDescription === '' ||
      startDate === '' ||
      endDate === '' ||
      budget === '' ||
      programLead === ''
    ) {
      alert('Please fill all the fields')
      return
    }
    const formData = new FormData()
    console.log('logo', logo)
    formData.append('logo', logo)
    axiosInstance
  .post('/uploadLogo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response) => {
    if (response.status === 200) {
      console.log('response', response)
      const programData = {
        programTitle,
        programDescription,
        startDate,
        endDate,
        budget,
        authorizedUsers: [programLead],
        logo: response.data.secure_url,
      }
      dispatch(createProgram(programData))
    }
  })
  .catch((error) => {
    console.log('error', error)
  })

    setVisible(false)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size > MAX_FILE_SIZE) {
      alert('File size exceeds the maximum limit of 2MB')
      return
    }
    setLogo(file)
    setLogoName(file.name)
  }
  return (
    <>
      <CModal
        fullscreen-md-down="true"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="FullscreenExample1"
      >
        <CModalHeader>
          <CModalTitle id="FullscreenExample1">Add Program</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CInputGroup className="mb-3 border rounded">
              <CButton color="primary" onClick={handleButtonClick}>
                Choose Logo
              </CButton>
              <CCol className="d-flex align-items-center justify-content-center">
                <CFormInput
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: 'none' }}
                  type="file"
                  id="logo"
                  name="logo"
                  placeholder="Enter logo"
                  onChange={handleImageChange}
                />
                {!logoName && <span className="logo-name">...</span>}
                {logoName && <span className="logo-name">{logoName}</span>}
              </CCol>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText id="basic-addon2">@</CInputGroupText>
              <CFormInput
                id="program name"
                placeholder="Program Name"
                aria-label="Program Name"
                aria-describedby="basic-addon2"
                onChange={(e) => setProgramTitle(e.target.value)}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CFormTextarea
                type="text-area"
                id="program description"
                placeholder="Program Description"
                aria-label="Program Description"
                aria-describedby="basic-addon2"
                onChange={(e) => setProgramDescription(e.target.value)}
              />
            </CInputGroup>

            <CCol className="mb-3 d-flex gap-3">
              <CInputGroup>
                <CInputGroupText id="basic-addon2">Start Date</CInputGroupText>
                <CFormInput
                  type="date"
                  id="start date"
                  placeholder="Enter start date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
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
            </CCol>
            <CInputGroup className="mb-3">
              <CInputGroupText>$</CInputGroupText>
              <CFormInput
                type="number"
                id="budget"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              <CInputGroupText>.00</CInputGroupText>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CFormSelect
                aria-label="The Program Lead"
                onChange={(e) => setProgramLead(e.target.value)}
              >
                <option>Choose The Program Lead</option>
                {users.map((user) => (
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
            <CRow xs={{ cols: 'auto' }}>
              <CCol xs className="m-auto">
                <CButton color="primary" onClick={addNewProgram}>
                  Add Program
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
      </CModal>

      <div className="text-end">
        <CButton
          className=" mb-3"
          color="primary"
          style={currentUser.role === 'superAdmin' ? {} : { display: 'none' }}
          onClick={() => setVisible(!visible)}
        >
          Add Program
        </CButton>
      </div>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {programs.map((program, index) => (
              <CCol key={index} xs={12} sm={6} md={4} lg={3}>
                <ProgramCard
                  logo={program.logo}
                  title={program.programTitle}
                  path={`${window.location.pathname}/${program._id}`}
                />
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}