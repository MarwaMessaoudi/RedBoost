import React, { useState } from 'react';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormLabel,
} from '@coreui/react';

const AddEventModal = ({ visible, onClose, onAddEvent }) => {
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      summary: eventDetails.summary,
      description: eventDetails.description,
      start: {
        dateTime: new Date(eventDetails.startDateTime).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(eventDetails.endDateTime).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    });
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Add Calendar Event</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel>Event Title</CFormLabel>
            <CFormInput
              type="text"
              value={eventDetails.summary}
              onChange={(e) => setEventDetails({ ...eventDetails, summary: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Description</CFormLabel>
            <CFormTextarea
              value={eventDetails.description}
              onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <CFormLabel>Start Date & Time</CFormLabel>
            <CFormInput
              type="datetime-local"
              value={eventDetails.startDateTime}
              onChange={(e) => setEventDetails({ ...eventDetails, startDateTime: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel>End Date & Time</CFormLabel>
            <CFormInput
              type="datetime-local"
              value={eventDetails.endDateTime}
              onChange={(e) => setEventDetails({ ...eventDetails, endDateTime: e.target.value })}
              required
            />
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Add Event
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddEventModal;
