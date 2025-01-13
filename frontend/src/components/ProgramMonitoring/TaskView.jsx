import React from 'react'
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
  CRow,
  CCol,
} from '@coreui/react'
import { useSelector } from 'react-redux'
import StatisticsSection from './StaticSection'
import CommentSection from './CommentSection'
import Uploader from './Uploader'
function TaskView({ open, setOpen, selectedTask }) {
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <CModal fullscreen visible={open} onClose={handleClose} aria-labelledby="FullscreenExample1">
      <CModalHeader>
        <CModalTitle id="FullscreenExample1">{selectedTask.title}</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ backgroundColor: '#eee' }}>
        <CRow className="mb-0">
          <CCol xs={12} md={6}>
            <StatisticsSection selectedTask={selectedTask} />
          </CCol>
          <CCol xs={12} md={6}>
            <Uploader />
          </CCol>
        </CRow>
        <CRow  className="mb-0">
          <CommentSection />
        </CRow>
      </CModalBody>
    </CModal>
  )
}

export default TaskView
