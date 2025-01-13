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
  CFormLabel,
} from '@coreui/react'

function EditUser({ visible, setVisible, selectedUser }) {
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="LiveDemoExampleLabel"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle id="LiveDemoExampleLabel">Edit User</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ height: '450px', overflow: 'auto' }} className="modal-body">
        <div className="mb-3">
          <CFormLabel htmlFor="username">Username :</CFormLabel>
          <CFormInput
            type="text"
            id="username"
            placeholder="Username"
            aria-describedby="usernameHelpInline"
            value={selectedUser.username}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="email">Email :</CFormLabel>
          <CFormInput
            type="text"
            id="email"
            placeholder="Email"
            aria-describedby="emailHelpInline"
            value={selectedUser.email}
          />
        </div>
        {/* Add labels and inputs for other fields */}
        <div className="mb-3">
          <CFormLabel htmlFor="birthday">Exp Points :</CFormLabel>
          <CFormInput type="number" id="exp" placeholder="exp" value={selectedUser.exp}/>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="birthday">Birthday :</CFormLabel>
          <CFormInput
            type="date"
            id="birthday"
            placeholder="Birthday"
            value={selectedUser.birthday}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="department">Department :</CFormLabel>
          <CFormInput
            type="text"
            id="department"
            placeholder="Department"
            value={selectedUser.department}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="address">Address :</CFormLabel>
          <CFormInput type="text" id="address" placeholder="Address" value={selectedUser.adress} />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="primary">Save</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditUser
