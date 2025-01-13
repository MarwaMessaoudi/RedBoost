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
} from '@coreui/react'
import Uploader from './Uploader'

function EditTask({ visible, setVisible, selectedTask, setSelectedtask }) {
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="LiveDemoExampleLabel"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle id="LiveDemoExampleLabel">Edit Card</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ height: '450px', overflow: 'auto' }} className="modal-body">
        <div className="mb-3">
          <CFormInput
            type="text"
            id="taskTitle"
            placeholder="Task Title"
            aria-describedby="taskTitleHelpInline"
            value={selectedTask.taskName}
          />
        </div>
        <div className="mb-3">
          <CFormInput type="date" id="taskDate" placeholder="Task Date" value={selectedTask.targetDate} />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger">cancel</CButton>
        <CButton color="primary">Save</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditTask
