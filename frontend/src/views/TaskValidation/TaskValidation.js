import React, { useState } from 'react'
import userImg from '../../components/Images/user.png'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableDataCell,
  CFormInput,
  CButton,
} from '@coreui/react'
import { MdDone } from 'react-icons/md'
import { HiMagnifyingGlassCircle } from 'react-icons/hi2'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { FaListCheck } from 'react-icons/fa6'
import ViewModal from './ViewModal'
import { useDispatch, useSelector } from 'react-redux'
import { loadTasks, updateTask } from '../../app/features/task/taskSlice'
import { updateUser } from '../../app/features/users/usersSlice'
import { setUserData } from '../../app/features/userData/userData'

ChartJS.register(ArcElement, Tooltip, Legend)

const TaskValidation = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const dispatch = useDispatch()
  const users = useSelector((state) => state.usersSlice.users)
  const tasks = useSelector((state) => state.task.allTasks)

  const filterTasks = tasks.filter((task) => {
    return task.status === 'completed' || task.status === 'valid' || task.status === 'cancelled'
  })

  const currentUser = useSelector((state) => state.userData.userData)

  const handleViewTask = (task) => {
    setSelectedTask(task)
    setShowModal(true)
  }

  const handleTaskDone = (task) => {
    const user = users.find((user) => user._id === task.taskOwner)
    dispatch(updateTask({ taskId: task._id, taskData: { ...task, status: 'valid' } }))
    dispatch(
      updateUser({ userId: task.taskOwner, userData: { exp: task.xpPoints + Number(user.exp) } }),
    )
    if (task.taskOwner === currentUser._id) {
      dispatch(setUserData({ ...currentUser, exp: task.xpPoints + Number(currentUser.exp) }))
    }
  }
  

  const getCompletedTasks = () => {
    return filterTasks.filter((task) => task.status === 'completed').length
  }

  const getCanceledTasks = () => {
    return filterTasks.filter((task) => task.status === 'cancelled').length
  }

  const getValidTasks = () => {
    return filterTasks.filter((task) => task.status === 'valid').length
  }

  const chartData = {
    labels: ['Valid', 'Completed', 'Cancelled'],
    datasets: [
      {
        label: 'Tasks',
        data: [getValidTasks(), getCompletedTasks(), getCanceledTasks()],
        backgroundColor: ['#28a745', 'blue', 'gray'],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'inProgress':
        return 'bg-warning'
      case 'expired':
        return 'bg-danger'
      case 'valid':
        return 'bg-success'
      case 'cancelled':
        return 'bg-secondary'
      default:
        return 'bg-info'
    }
  }

  const filteredTasks = filterTasks.filter((task) => {
    const searchTermLowerCase = searchTerm.toLowerCase()
    const taskStatus = task.status.toLowerCase()

    // Filter based on active filter
    if (activeFilter === 'valid') {
      return taskStatus === 'valid'
    } else if (activeFilter === 'completed') {
      return taskStatus === 'completed'
    } else if (activeFilter === 'cancelled') {
      return taskStatus === 'cancelled'
    } else {
      // Filter based on search term
      return (
        task.taskName.toLowerCase().includes(searchTermLowerCase) ||
        users
          .find((user) => user._id === task.taskOwner)
          ?.username.toLowerCase()
          .includes(searchTermLowerCase) ||
        taskStatus.includes(searchTermLowerCase) ||
        task.xpPoints.toString().includes(searchTermLowerCase) ||
        task.endDate.includes(searchTermLowerCase)
      )
    }
  })

  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle sortOrder
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      // Set new sortBy column and default sortOrder to 'asc'
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const renderSortIcon = (column) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>
    }
  }

  const sortedTasks = sortBy
    ? filteredTasks.slice().sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
    : filteredTasks

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {selectedTask && (
        <ViewModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
        />
      )}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <CButton
          className={`btn ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </CButton>
        <CButton
          className={`btn ${activeFilter === 'valid' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveFilter('valid')}
        >
          Valid
        </CButton>
        <CButton
          className={`btn ${activeFilter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveFilter('completed')}
        >
          Completed
        </CButton>
        <CButton
          className={`btn ${activeFilter === 'cancelled' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveFilter('cancelled')}
        >
          Cancelled
        </CButton>
      </div>

      <CCard>
        <CCardHeader
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <FaListCheck style={{ marginRight: '10px' }} />
            Task List
          </h2>
          <CFormInput
            type="text"
            placeholder="Search Task"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginTop: '10px', width: '300px' }}
          />
        </CCardHeader>
        <CCardBody style={{ maxHeight: '500px', overflow: 'auto' }}>
          <CTable responsive hover>
            <CTableHead>
              <CTableRow>
                <CTableDataCell onClick={() => handleSort('taskName')}>
                  Task Name {sortBy === 'taskName' && renderSortIcon('taskName')}
                </CTableDataCell>
                <CTableDataCell onClick={() => handleSort('username')}>
                  Team Member {sortBy === 'username' && renderSortIcon('username')}
                </CTableDataCell>
                <CTableDataCell onClick={() => handleSort('status')}>
                  Status {sortBy === 'status' && renderSortIcon('status')}
                </CTableDataCell>
                <CTableDataCell onClick={() => handleSort('xpPoints')}>
                  Points {sortBy === 'xpPoints' && renderSortIcon('xpPoints')}
                </CTableDataCell>
                <CTableDataCell onClick={() => handleSort('endDate')}>
                  Release Date {sortBy === 'endDate' && renderSortIcon('endDate')}
                </CTableDataCell>
                <CTableDataCell>Actions</CTableDataCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sortedTasks.map((task, index) => {
                const user = users.find((user) => user._id === task.taskOwner)
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{task.taskName}</CTableDataCell>
                    <CTableDataCell>
                    <img
                      src={user?.image ? user.image : userImg}
                      alt="avatar 1"
                      style={{ width: '45px', height: 'auto',borderRadius: '50%' }}
                    />
                    <span className="ms-2">{user?.username}</span>
                  </CTableDataCell>
                    <CTableDataCell>
                      <span className="ms-2">{user?.username}</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <span className={`badge ${getStatusColor(task.status)}`}>{task.status}</span>
                    </CTableDataCell>
                    <CTableDataCell>{task.xpPoints}XP</CTableDataCell>
                    <CTableDataCell>
                      {new Date(task.endDate).toLocaleDateString()}
                    </CTableDataCell>
                    <CTableDataCell>
                      {task.status !== 'valid' && (
                        <MdDone
                          onClick={() => handleTaskDone(task)}
                          style={{
                            color: 'green',
                            fontSize: '25px',
                            cursor: 'pointer',
                            marginRight: '10px',
                          }}
                        />
                      )}
                      <HiMagnifyingGlassCircle
                        onClick={() => handleViewTask(task)}
                        style={{ color: 'blue', fontSize: '25px', cursor: 'pointer' }}
                      />
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody style={{ maxHeight: '400px', padding: '10px' }}>
          <Doughnut style={{ margin: '0 auto' }} data={chartData} options={chartOptions} />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default TaskValidation
