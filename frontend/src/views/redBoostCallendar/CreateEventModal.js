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
  CFormCheck,
  CCol,
  CRow,
} from '@coreui/react';

const CreateEventModal = ({ visible, onClose, onCreateEvent, projectCalendars }) => {
  const [eventData, setEventData] = useState({
    summary: '',
    description: '',
    start: '',
    end: '',
    selectedCalendars: {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCalendarSelection = (calendarId) => {
    setEventData(prev => ({
      ...prev,
      selectedCalendars: {
        ...prev.selectedCalendars,
        [calendarId]: !prev.selectedCalendars[calendarId]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCalendarIds = Object.entries(eventData.selectedCalendars)
      .filter(([_, isSelected]) => isSelected)
      .map(([calendarId]) => calendarId);

    if (selectedCalendarIds.length === 0) {
      alert('Please select at least one calendar');
      return;
    }

    const eventDetails = {
      summary: eventData.summary,
      description: eventData.description,
      start: {
        dateTime: new Date(eventData.start).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(eventData.end).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    await onCreateEvent(eventDetails, selectedCalendarIds);
    setEventData({
      summary: '',
      description: '',
      start: '',
      end: '',
      selectedCalendars: {},
    });
    onClose();
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Create New Event</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol>
              <CFormInput
                type="text"
                name="summary"
                label="Event Title"
                value={eventData.summary}
                onChange={handleInputChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <CFormTextarea
                name="description"
                label="Description"
                value={eventData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                type="datetime-local"
                name="start"
                label="Start Date & Time"
                value={eventData.start}
                onChange={handleInputChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="datetime-local"
                name="end"
                label="End Date & Time"
                value={eventData.end}
                onChange={handleInputChange}
                required
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol>
              <div className="mb-2">Select Calendars:</div>
              {Object.entries(projectCalendars).map(([project, calendarId]) => (
                <CFormCheck
                  key={calendarId}
                  id={`calendar-${calendarId}`}
                  label={project}
                  checked={eventData.selectedCalendars[calendarId] || false}
                  onChange={() => handleCalendarSelection(calendarId)}
                />
              ))}
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancel
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Create Event
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default CreateEventModal;
