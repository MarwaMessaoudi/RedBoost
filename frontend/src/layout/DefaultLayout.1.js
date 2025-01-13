import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components'
import ExpiryModal from './ExpiryModal'
import { useDispatch } from 'react-redux'
import { loadPrograms } from '../app/features/programs/programsSlice'
import { loadUsers } from '../app/features/users/usersSlice'
import { loadTasks } from '../app/features/task/taskSlice'
import { CProgress } from '@coreui/react'
import { loadEvents } from '../app/features/events/events'
import {loadEntrepreneurs} from '../app/features/entrepreneursData/entrepreneursSlice'
import axiosInstance from '../axiosInstance'
import { loadSessions } from '../app/features/sessions/sessions'

const LOAD_PROGRAMS_PROGRESS = 20
const LOAD_EVENTS_PROGRESS = 40
const LOAD_USERS_PROGRESS = 60
const LOAD_ENTREPRENEURS_PROGRESS =80
const LOAD_TASKS_PROGRESS = 100

export const DefaultLayout = () => {
  console.log("render defaultLayout")
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/events')
      if (response.data) {
        dispatch(loadEvents(response.data))
      }
    } catch (error) {
      console.log('Failed to fetch events ;', error)
    }
  }
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        dispatch(loadPrograms())
        setProgress(LOAD_PROGRAMS_PROGRESS)
        await fetchData()
        setProgress(LOAD_EVENTS_PROGRESS)
        dispatch(loadUsers())
        setProgress(LOAD_USERS_PROGRESS)
        dispatch(loadSessions())
        dispatch(loadEntrepreneurs())
        setProgress(LOAD_ENTREPRENEURS_PROGRESS)
        dispatch(loadTasks())
        setProgress(LOAD_TASKS_PROGRESS)
      } catch (error) {
        console.error('An error occurred while loading data:', error)
        // Optionally set an error state here
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [dispatch])
  if (loading) {
    return (
      <div className="progress-wrapper">
        <CProgress value={progress} color="success" variant="striped" animated>
          {progress}%
        </CProgress>
        {error && <p className="text-danger">{error}</p>}
      </div>
    )
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <ExpiryModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  )
}
