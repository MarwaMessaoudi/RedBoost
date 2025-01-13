import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axiosInstance from '../../axiosInstance'
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CBadge, CContainer } from '@coreui/react'
import { Link } from 'react-router-dom'

const TaskList = () => {
  const currentUser = useSelector((state) => state.userData.userData)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axiosInstance
      .post('/tasksByUser', { userId: currentUser._id })
      .then((response) => {
        const fetchedTasks = response.data.map((task) => {
          let color
          switch (task.status) {
            case 'completed':
              color = 'success'
              break
            case 'inProgress':
              color = 'primary'
              break
            case 'notStarted':
              color = 'secondary'
              break
            case 'cancelled':
              color = 'danger'
              break
            case 'expired':
              color = 'warning'
              break
            case 'valid':
              color = 'info'
              break
            default:
              color = 'dark'
          }

          const formattedStartDate = new Date(task.startDate).toLocaleDateString()
          const formattedEndDate = new Date(task.endDate).toLocaleDateString()

          return {
            ...task,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            color,
          }
        })
        setTasks(fetchedTasks)
      })
      .catch((error) => {
        console.error('Error fetching tasks', error)
      })
  }, [currentUser])

  return (
    <CContainer>
      <CTable hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Task Name</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Start Date</CTableHeaderCell>
            <CTableHeaderCell>End Date</CTableHeaderCell>

          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tasks.map((task, index) => (
            <CTableRow key={index}>
              <CTableDataCell>
                <Link to={`/Dash/${task._id}`} style={{ textDecoration: 'none' }}>
                  {task.taskName}
                </Link>
              </CTableDataCell>
              <CTableDataCell>
                <CBadge color={task.color}>{task.status}</CBadge>
              </CTableDataCell>
              <CTableDataCell>{task.startDate}</CTableDataCell>
              <CTableDataCell>{task.endDate}</CTableDataCell>

            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </CContainer>
  )
}

export default TaskList
