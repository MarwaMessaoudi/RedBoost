import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useSelector } from 'react-redux'
import axiosInstance from '../../axiosInstance'
import { useNavigate } from 'react-router-dom'
import './TaskCalendar.css'

const TaskCalendar = () => {
  const currentUser = useSelector((state) => state.userData.userData)
  const [events, setEvents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axiosInstance
      .post('/tasksByUser', { userId: currentUser._id })
      .then((response) => {
        const tasks = response.data.map((task) => {
          let color
          switch (task.status) {
            case 'completed':
              color = 'green'
              break
            case 'inProgress':
              color = 'blue'
              break
            case 'notStarted':
              color = 'gray'
              break
            case 'cancelled':
              color = 'red'
              break
            case 'expired':
              color = 'orange'
              break
            case 'valid':
              color = 'purple'
              break
            default:
              color = 'black'
          }

          return {
            id: task._id,
            title: task.taskName,
            start: task.startDate,
            end: task.endDate,
            color: color,
            extendedProps: {
              description: task.description,
              status: task.status,
            },
          }
        })
        setEvents(tasks)
      })
      .catch((error) => {
        console.error('Error fetching tasks', error)
      })
  }, [currentUser])

  const handleEventClick = (clickInfo) => {
    const taskId = clickInfo.event.id
    navigate(`/dash/${taskId}`)
  }

  const renderEventContent = (eventInfo) => {
    return (
      <div className="event-content">
        <b>{eventInfo.event.title}</b>
      </div>
    )
  }

  return (
    <div className="fullcalendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        eventMouseEnter={(mouseEnterInfo) => {
          mouseEnterInfo.el.style.cursor = 'pointer'
          mouseEnterInfo.el.style.transition =
            'transform 0.2s, box-shadow 0.2s'
          mouseEnterInfo.el.style.transform = 'scale(1.05)'
          mouseEnterInfo.el.style.boxShadow =
            '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}
        eventMouseLeave={(mouseLeaveInfo) => {
          mouseLeaveInfo.el.style.transform = 'none'
          mouseLeaveInfo.el.style.boxShadow = 'none'
        }}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        height="auto"
        contentHeight="auto"
      />
    </div>
  )
}

export default TaskCalendar
