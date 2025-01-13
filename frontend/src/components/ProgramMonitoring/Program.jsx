import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiMiniProgramFill } from 'react-icons/ri';
import { FaHourglassStart, FaHourglassEnd } from 'react-icons/fa';
import { AiFillDollarCircle } from 'react-icons/ai';
import { GiPirateCaptain } from 'react-icons/gi';
import {
  createActivity,
  updateActivity,
  loadActivitiesByProgramId,
} from '../../app/features/activity/activitySlice';
import { addRoutes } from '../../app/features/routeSlice/routeSlice';
import { loadPrograms } from '../../app/features/programs/programsSlice';
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CPagination,
  CPaginationItem,
  CSpinner,
  CTooltip,
} from '@coreui/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddActivity from './AddActivity';
import { useNavigate } from 'react-router-dom';

const EventList = ({ events, program, navigate }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDateClickList = (activity) => {
    console.log('activity', activity);
    // Navigate to the activity details page without reloading the entire app
    navigate(`/Dash/Monitoring/${program._id}/${activity._id}`);
  };

  return (
    <>
      <CTable striped responsive className="text-center">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">Activities</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentEvents.map((event, index) => (
            <CTableRow
              key={index}
              onClick={() => handleDateClickList(event)}
              style={{ cursor: 'pointer' }}
              className="hover-effect"
            >
              <CTableDataCell>
                <div
                  className="rounded-circle shadow-1-strong me-3 d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: event.color, height: '20px', width: '20px' }}
                ></div>
              </CTableDataCell>
              <CTableDataCell>{event.name}</CTableDataCell>
              <CTableDataCell>{new Date(event.startDate).toLocaleDateString()}</CTableDataCell>
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
    </>
  );
};

function Program({ program, activities }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  console.log('activities', activities);

  const handleAddActivity = (activityData) => {
    console.log('activityData', activityData);
    console.log('program id', program._id);
    const finalActivityData = {
      ...activityData,
      programId: program._id,
      createdBy: program.authorizedUsers[0],
    };
    console.log('finalActivityData', finalActivityData);
    dispatch(createActivity(finalActivityData)).then((activity) => {
      console.log('activity dispatch', activity);
      dispatch(
        addRoutes([
          {
            path: `/Monitoring/${encodeURIComponent(program._id)}/${encodeURIComponent(activity.payload._id)}`,
            name: activity.payload.name,
            activityId: activity.payload._id,
          },
        ])
      );
    });
    setOpen(false);
  };

  if (!program) {
    return (
      <CContainer style={{ padding: '20px' }} className="mt-4">
        <CRow>
          <CCol xs="auto">
            <CSpinner color="primary" />
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  const programInfo = [
    {
      icon: <RiMiniProgramFill />,
      name: 'Program Name',
      value: program.programTitle,
    },
    {
      icon: <FaHourglassStart />,
      name: 'Start Date',
      value: new Date(program.startDate).toLocaleDateString(),
    },
    {
      icon: <FaHourglassEnd />,
      name: 'End Date',
      value: new Date(program.endDate).toLocaleDateString(),
    },

    { icon: <AiFillDollarCircle />, name: 'Budget', value: program.budget },
    {
      icon: <GiPirateCaptain />,
      name: 'Program Lead',
      value: JSON.stringify(program.authorizedUsers).split('"')[1],
    },
    {
      icon: <FaHourglassEnd />,
      name: 'Description',
      value: program.programDescription,
    },
  ];

  const handleDateClick = (activity) => {
    console.log('activity', activity);
    // Navigate to the activity details page without reloading the entire app
    navigate(`/Dash/Monitoring/${program._id}/${activity.id}`);
  };

  return (
    <CContainer style={{ padding: '20px' }} className="mt-4">
      <AddActivity
        open={open}
        setOpen={setOpen}
        handleAddActivity={handleAddActivity}
        program={program}
      />
      <CRow className="mb-3">
        <CCol xs={12} md={8}>
          <CCard className="text-center mb-3">
            <CCardHeader className="bg-dark text-light">Activities Calendar</CCardHeader>
            <CCardBody>
              <FullCalendar
                plugins={[dayGridPlugin]}
                events={activities.map((activity) => ({
                  id: activity._id,
                  title: activity.name,
                  start: new Date(activity.startDate),
                  end: new Date(activity.endDate),
                  color: activity.color,
                  allDay: activity.allDay,
                }))}
                eventClick={(activity) => handleDateClick(activity.event)}
                initialView="dayGridWeek"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,dayGridDay',
                }}
                initialDate={new Date()}
                eventMouseEnter={(info) => {
                  info.el.style.borderColor = 'red';
                }}
                eventMouseLeave={(info) => {
                  info.el.style.borderColor = '';
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={4}>
          <CCard className="text-center mb-3">
            <CCardHeader className="bg-dark text-light">Activities List</CCardHeader>
            <CCardBody>
              <div className="text-center flex flex-end mb-3">
                <CButton
                  onClick={() => setOpen(true)}
                  style={{ textAlign: 'center' }}
                  color="primary"
                >
                  Add Activity
                </CButton>
              </div>
              <EventList events={activities} navigate={navigate} program={program} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard style={{ display: 'flex', justifyContent: 'space-between' }}>
            <CCardHeader
              style={{ textAlign: 'center', fontSize: '120%' }}
              className="bg-dark text-light"
            >
              Program Information
            </CCardHeader>
            <CCardBody style={{ paddingTop: '2%', marginLeft: '6%' }}>
              <CTable responsive="sm">
                <CTableBody>
                  {programInfo.map((detail, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ paddingRight: '8%' }}>
                          <CTooltip content={detail.name}>
                            {detail.icon}
                          </CTooltip>
                        </div>
                        {detail.name}:
                      </CTableHeaderCell>
                      <CTableDataCell>{detail.value}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default Program;
