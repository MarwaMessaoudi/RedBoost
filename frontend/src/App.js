import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import axiosInstance from './axiosInstance'
import ResetPassword from './components/ResetPassword'
// import { setUserData } from './app/features/userData/userData'
import { setEvents } from './app/features/events/events'
import { setAuthentication } from './app/features/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { loadUserData } from './app/features/userData/userData'
// import ProtectedRoute from './ProtectedRoute'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const [loading, setLoading] = useState(true)
  const isLogged = useSelector((state) => state.auth.isLogged)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    } else if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
    // Make sure to include all dependencies that are used inside the effect and can change over time.
  }, [isColorModeSet, setColorMode, storedTheme])

  useEffect(() => {
    console.log('useEffect render')
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get('/login')
        console.log('response data', response.data)
        if (response.data.authenticated) {
          console.log('authenticated success')
          dispatch(loadUserData(response.data.email))
          dispatch(setAuthentication(true))
        } else {
          dispatch(setAuthentication(false))
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])
  if (loading) {
    return (
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      ></Suspense>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <Routes>
        <Route exact path="/" name="Login Page" element={<Login />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/*" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route exact path="/password-reset" name=" Account Recovery" element={<ResetPassword />} />
        <Route path="/Dash/*" element={isLogged ? <DefaultLayout /> : <Navigate to="/" />} />
        
      </Routes>
    </Suspense>
  )
}

export default App
