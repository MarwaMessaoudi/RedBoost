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
  CTable,
  CTableBody,
  CAlert,
} from '@coreui/react'
function ViewUser({ view, setView, selectedUser }) {
  return (
    <CModal
      visible={view}
      onClose={() => setView(false)}
      aria-labelledby="LiveDemoExampleLabel"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle id="LiveDemoExampleLabel">View History</CModalTitle>
      </CModalHeader>
      <CModalBody className="modal-body"></CModalBody>
      <CTable responsive style={{ height: '450px', overflow: 'auto' }}>
        <CTableBody style={{ alignContent: 'center' }}>
          {selectedUser && selectedUser.logs && selectedUser.logs.length > 0 ? (
            // Render logs only if user and user.logs are not undefined
            selectedUser.logs.map((log, index) => (
              <CAlert style={{ margin: '10px 10px' }} key={index} color={getColorByIndex(index)}>
                {log.date} :{' '}
                {log.events.map((event, eventIndex) => (
                  <span style={{ backgroundColor: 'transparent' }} key={eventIndex}>
                    {event}
                  </span>
                ))}
              </CAlert>
            ))
          ) : (
            <CAlert style={{ margin: '10px 10px' }} color="warning">
              No logs found.
            </CAlert>
          )}
        </CTableBody>
      </CTable>
      <CModalFooter>
        <CButton color="danger">Clear History</CButton>
      </CModalFooter>
    </CModal>
  )
}
const getColorByIndex = (index) => {
  const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

  // Use modulo to cycle through colors based on index
  return colors[index % colors.length]
}

export default ViewUser
