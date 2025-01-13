import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import { cibEventStore } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const EventModal = ({ selectedEvent, setSelectedEvent }) => {
  return (
    <>
      <CModal
        backdrop="static"
        visible={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader
          style={{
            backgroundColor: '#1A233B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CModalTitle style={{ color: 'white' }} id="StaticBackdropExampleLabel">
            <CIcon style={{ marginRight: '10px' }} icon={cibEventStore} />
            {selectedEvent?.title}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedEvent && (
            <>
              <p>
                <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
              </p>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="danger">Delete Event</CButton>
          <CButton style={{ backgroundColor: '#1A233B', color: 'white' }}>Update Event</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EventModal
