import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CSpinner,
  CAlert,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CPagination,
  CPaginationItem,
  CBadge,
} from '@coreui/react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import CIcon from '@coreui/icons-react';
import { cilCalendar, cilClock, cilLocationPin } from '@coreui/icons';
import './GoogleTasksUI.css';

const ITEMS_PER_PAGE = 10;
const DATE_FILTERS = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  ALL: 'all'
};

const GoogleTasksUI = () => {
  const session = useSession();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState(DATE_FILTERS.WEEK);
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    if (session?.provider_token) {
      fetchCalendarEvents();
    }
  }, [session, dateFilter]);

  const getTimeRange = () => {
    const now = new Date();
    const start = new Date();
    const end = new Date();

    switch (dateFilter) {
      case DATE_FILTERS.TODAY:
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case DATE_FILTERS.WEEK:
        start.setDate(now.getDate() - now.getDay());
        end.setDate(start.getDate() + 6);
        break;
      case DATE_FILTERS.MONTH:
        start.setDate(1);
        end.setMonth(now.getMonth() + 1, 0);
        break;
      default:
        start.setMonth(now.getMonth() - 1);
        end.setMonth(now.getMonth() + 2);
    }

    return { start, end };
  };
  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      const { start, end } = getTimeRange(); // Ensure this provides proper start and end ISO strings

      // Use the shared calendar's ID instead of 'primary'
      const calendarId = '9bee62qtsn0lncq6k0lh7so7jk@group.calendar.google.com'; // Replace with your shared calendar ID
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?` +
        new URLSearchParams({
          timeMin: start.toISOString(),
          timeMax: end.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
          maxResults: 100,
        }),
        {
          headers: {
            Authorization: `Bearer ${session.provider_token}`, // Ensure this token is valid
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch calendar events: ${response.statusText}`);
      }

      const data = await response.json();

      // Sort events by start time
      const sortedEvents = data.items.sort((a, b) =>
        new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date)
      );

      setEvents(sortedEvents); // Update your state with fetched events
      setTotalEvents(sortedEvents.length);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const formatEventTime = (event) => {
    const start = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
    if (event.start.date) {
      return 'All day';
    }
    return start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'tentative':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary'; // Fallback color
    }
  };


  const formatEventDate = (event) => {
    const start = event.start.dateTime ? new Date(event.start.dateTime) : new Date(event.start.date);
    return start.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric' // Include the year
    });
  };

  const getPaginatedEvents = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return events.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const totalPages = Math.ceil(totalEvents / ITEMS_PER_PAGE);

  if (!session) {
    return (
      <CAlert color="warning">
        Please sign in to view your calendar events
      </CAlert>
    );
  }

  return (
    <CCard className="calendar-tasks-container">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Calendar Events</h3>
        <CDropdown>
          <CDropdownToggle color="primary">
            {dateFilter.charAt(0).toUpperCase() + dateFilter.slice(1)}
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={() => setDateFilter(DATE_FILTERS.TODAY)}>
              Today
            </CDropdownItem>
            <CDropdownItem onClick={() => setDateFilter(DATE_FILTERS.WEEK)}>
              This Week
            </CDropdownItem>
            <CDropdownItem onClick={() => setDateFilter(DATE_FILTERS.MONTH)}>
              This Month
            </CDropdownItem>
            <CDropdownItem onClick={() => setDateFilter(DATE_FILTERS.ALL)}>
              All
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CCardHeader>

      <CCardBody>
        {error && (
          <CAlert color="danger" dismissible onClose={() => setError(null)}>
            {error}
          </CAlert>
        )}

        {loading ? (
          <div className="text-center p-3">
            <CSpinner color="primary" />
          </div>
        ) : (
          <>
            <CListGroup>
              {getPaginatedEvents().length === 0 ? (
                <CListGroupItem className="text-center text-muted">
                  No events found for this period
                </CListGroupItem>
              ) : (
                getPaginatedEvents().map((event) => (
                  <CListGroupItem key={event.id} className="event-item">
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="event-main">
                        <h5 className="mb-1">{event.summary}</h5>
                        <div className="event-details">
                          <span className="me-3">
                            <CIcon icon={cilCalendar} className="me-1" />
                            {formatEventDate(event)}
                          </span>
                          <span className="me-3">
                            <CIcon icon={cilClock} className="me-1" />
                            {formatEventTime(event)}
                          </span>
                          {event.location && (
                            <span>
                              <CIcon icon={cilLocationPin} className="me-1" />
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                      {event.status && (
                        <CBadge color={getStatusBadgeColor(event.status)}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </CBadge>
                      )}
                    </div>
                  </CListGroupItem>
                ))
              )}
            </CListGroup>

            {totalPages > 1 && (
              <CPagination className="mt-3 justify-content-center" aria-label="Calendar events navigation">
                <CPaginationItem
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  First
                </CPaginationItem>
                <CPaginationItem
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </CPaginationItem>
                <CPaginationItem active>{currentPage}</CPaginationItem>
                <CPaginationItem
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </CPaginationItem>
                <CPaginationItem
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last
                </CPaginationItem>
              </CPagination>
            )}
          </>
        )}
      </CCardBody>
    </CCard>
  );
};

export default GoogleTasksUI;
