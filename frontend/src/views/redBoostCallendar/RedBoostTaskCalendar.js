import React, { useEffect, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  CRow,
  CCol,
  CFormInput,
  CFormCheck,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import './RedBoostTaskCalendar.css';
import CreateEventModal from './CreateEventModal';

const projectCalendars = {
  IPTIC: 'c97b1ce91482334df9e9dc7e26a88e2694517c61f59b18c8734c39eab1807a23@group.calendar.google.com',
  Widu: '11ed05ca8bd2a6897944129fea7301f8de84e866411114fd6ec81d286218881b@group.calendar.google.com',
  "WGG 2": 'f6db8bc3d9c65d7ac01eb698fa9cb1ac2e6d650c49ee7dfae9df92468af367a9@group.calendar.google.com'

};

const RedBoostTaskCalendar = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState(() => {
    const initial = {};
    Object.keys(projectCalendars).forEach(project => {
      initial[project] = true;
    });
    return initial;
  });
  const calendarRef = useRef(null);
  const navigate = useNavigate();
  const session = useSession();
  const supabase = useSupabaseClient();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    console.log('Initial selectedProjects:', selectedProjects);
  }, []);

  useEffect(() => {
    if (session?.provider_token) {
      loadProjectCalendars();
    }
  }, [selectedProjects, session]);

  useEffect(() => {
    console.log('Session state:', {
      exists: !!session,
      providerToken: !!session?.provider_token,
      user: session?.user?.email,
    });
  }, [session]);

  useEffect(() => {
    console.log('Current search term:', searchTerm);
    const results = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Filtered events:', results);
    setFilteredEvents(results);
  }, [searchTerm, events]);

  const loadProjectCalendars = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const accessToken = session?.provider_token;
      if (!accessToken) {
        throw new Error('No access token found. Please sign in again.');
      }

      console.log('Starting calendar fetch with token:', accessToken.substring(0, 20) + '...');

      let allEvents = [];
      for (const [project, calendarId] of Object.entries(projectCalendars)) {
        if (selectedProjects[project]) {
          const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (!response.ok) {
            const errorData = await response.text();
            console.error(`Error response for ${project}:`, errorData);
            throw new Error(`Failed to fetch calendar for ${project}`);
          }

          const data = await response.json();
          console.log(`Received ${data.items?.length || 0} events for ${project}`);

          if (data.items?.length > 0) {
            const projectEvents = data.items.map(event => ({
              id: event.id,
              title: event.summary,
              start: event.start.date || event.start.dateTime,
              end: event.end.date || event.end.dateTime,
              description: event.description,
              url: event.htmlLink,
              project,
              location: event.location,
              creator: event.creator,
              attendees: event.attendees,
              extendedProps: {
                project: project,
              },
            }));
            allEvents = [...allEvents, ...projectEvents];
          }
        }
      }

      console.log('Total events found:', allEvents.length);
      console.log('Loaded events:', allEvents);
      setEvents(allEvents);
    } catch (error) {
      console.error('Error loading calendars:', error);
    }
  };

  const handleEventClick = (clickInfo) => {
    clickInfo.jsEvent.preventDefault();
    setSelectedEvent(clickInfo.event);
    setShowEventModal(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProjectFilterChange = (project) => {
    setSelectedProjects((prev) => ({
      ...prev,
      [project]: !prev[project]
    }));
  };

  const updateCurrentMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const date = calendarApi.getDate();
      return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }
  };

  const googleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: [
            'email',
            'profile',
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/calendar.events',
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/calendar.events.readonly'
          ].join(' '),
          redirectTo: `${window.location.origin}`
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleCreateEvent = async (eventDetails, selectedCalendarIds) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) throw sessionError;

      const accessToken = session?.provider_token;
      if (!accessToken) {
        throw new Error('No access token found. Please sign in again.');
      }

      const createPromises = selectedCalendarIds.map(async (calendarId) => {
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventDetails),
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(`Failed to create event: ${errorData}`);
        }

        return response.json();
      });

      await Promise.all(createPromises);
      loadProjectCalendars();
    } catch (error) {
      console.error('Error creating events:', error);
      alert('Failed to create events: ' + error.message);
    }
  };

  const handleSearchResultClick = (event) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  return (
    <div className="calendar-wrapper">
      <CRow>
        <CCol>
          <h1 className="redboost-title">RedBoost Agenda</h1>
        </CCol>
      </CRow>

      <CRow className="mb-4">
        <CCol>
          {session ? (
            <>
              <h2 className="welcome-text">Hello {session.user.user_metadata.name}</h2>
              {!session.provider_token && (
                <div className="alert alert-warning">
                  Calendar access not authorized. Please sign in with Google again.
                  <CButton onClick={googleSignIn} color="primary" className="ms-3">
                    Sign In with Google
                  </CButton>
                </div>
              )}

            </>
          ) : (
            <CButton onClick={googleSignIn} color="primary">
              Sign In with Google
            </CButton>
          )}
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <p className="agenda-description">
            This agenda displays events from Google Calendars for selected projects.
          </p>
        </CCol>
      </CRow>

      <CRow className="agenda-header mb-4">
        <CCol md={2}>
          <CFormInput
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </CCol>
        <CCol md={6}>
          <div className="project-filters">
            {Object.keys(projectCalendars).map((project) => (
              <CFormCheck
                key={project}
                inline
                id={project}
                label={project}
                checked={selectedProjects[project] || false}
                onChange={() => handleProjectFilterChange(project)}
              />
            ))}
          </div>
        </CCol>
        <CCol md={4} className="d-flex justify-content-end align-items-center">
        <CButton onClick={signOut} color="danger" className="float-end me-2">
                Sign Out
              </CButton>
          <CButton
            color="primary"
            onClick={() => setShowCreateModal(true)}
          >
           + Create Event
          </CButton>
        </CCol>
      </CRow>

      {searchTerm && filteredEvents.length > 0 && (
        <CListGroup className="mb-4">
          {filteredEvents.map((event) => (
            <CListGroupItem
              key={event.id}
              onClick={() => handleSearchResultClick(event)}
              className="search-result-item"
              style={{ cursor: 'pointer' }}
            >
              {event.title} - {new Date(event.start).toLocaleString()}
            </CListGroupItem>
          ))}
        </CListGroup>
      )}

      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          height="auto"
          contentHeight="auto"
          eventInteractive={true}
          navLinks={false}
        />
      </div>

      <CModal
        visible={showEventModal}
        onClose={() => setShowEventModal(false)}
      >
        <CModalHeader>
          <CModalTitle>
            {selectedEvent?.title}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedEvent && (
            <div>
              <p><strong>Project:</strong> {selectedEvent.extendedProps.project}</p>
              <p><strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}</p>
              <p><strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}</p>
              {selectedEvent.description && (
                <p><strong>Description:</strong> {selectedEvent.description}</p>
              )}
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setShowEventModal(false)}
          >
            Close
          </CButton>
          {selectedEvent && (
            <CButton
              color="primary"
              onClick={() => window.open(selectedEvent.url, '_blank')}
              disabled={!selectedEvent.url}
            >
              View in Google Calendar
            </CButton>
          )}
        </CModalFooter>
      </CModal>

      <CreateEventModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateEvent={handleCreateEvent}
        projectCalendars={projectCalendars}
      />
    </div>
  );
};

export default RedBoostTaskCalendar;
