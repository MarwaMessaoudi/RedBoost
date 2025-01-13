import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CPagination,
  CPaginationItem,
  CSpinner,
} from '@coreui/react'
import EventInfoModal from './EventInfoModal'
import axiosInstance from '../../axiosInstance'
import { useSelector } from 'react-redux'
const EventList = ({ events }) => {
  const itemsPerPage = 8
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(events.length / itemsPerPage)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <CCard>
      <CCardHeader className="text-center">Events</CCardHeader>
      <CCardBody>
        <CTable striped responsive className="text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Event</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentEvents.map((event, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{event.title}</CTableDataCell>
                <CTableDataCell>{new Date(event.start).toLocaleString()}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CPagination pages={totalPages} align="center">
          <CPaginationItem
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
            aria-label="Previous"
          >
            Previous
          </CPaginationItem>
          <CPaginationItem
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
            aria-label="Next"
          >
            Next
          </CPaginationItem>
        </CPagination>
      </CCardBody>
    </CCard>
  )
}

const Calendar = () => {
  // const [events, setEvents] = useState()
  const [selectedEvent, setSelectedEvent] = useState(null)
  const events = useSelector((state) => state.events.events)
  console.log('events from events :', events)
  const handleEventClick = (clickInfo) => {
    const event = clickInfo.event
    setSelectedEvent(event)
  }
  if (!events) {
    return (
      <CContainer style={{ padding: '20px' }} className="mt-4">
        <CRow>
          <CCol xs="auto">
            <CSpinner color="primary" />
          </CCol>
        </CRow>
      </CContainer>
    )
  }
  const eventsData = events.map((event, index) => {
    return {
      id: event._id,
      title: event.eventName,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      location: event.location,
      capacity: event.capacity,
      organizer: event.organizer,
      startingHour: event.startingHour,
      duartion: event.duration,
    }
  })
  return (
    <CContainer style={{ padding: '20px' }} className="mt-4">
      <EventInfoModal selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
      <CRow>
        <CCol xs="12" lg="9">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={eventsData}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek,dayGridDay',
            }}
            initialDate={new Date()}
            eventClick={handleEventClick}
          />
        </CCol>
        <CCol xs="12" lg="3">
          <EventList events={eventsData} />
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Calendar
