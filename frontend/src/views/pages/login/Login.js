import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTooltip,
  CAlert,
} from '@coreui/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cibMailRu, cilWarning } from '@coreui/icons'
import { useFormik } from 'formik'
import signinValidation from './signinValidation'
import axiosInstance from '../../../axiosInstance'
import { handleLogin } from '../../../app/features/login/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useDebouncedCallback } from 'use-debounce'
import { setUserData } from '../../../app/features/userData/userData'
import { setAuthentication } from '../../../app/features/auth/authSlice'
const Login = () => {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const isLogged = useSelector((state) => state.auth.isLogged)
  console.log('is logged login', isLogged)
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signinValidation,
    onSubmit: async (values) => {
      axiosInstance
        .post('/login', values)
        .then((response) => {
          console.log('response', response)
          console.log('Authentication successful', response.data)
          const { password, confirmation, _id, ...userDataWithoutPassword } = response.data.user
          dispatch(setUserData(userDataWithoutPassword))
          setError('')
          dispatch(setAuthentication(true))
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.error)
          }
          console.log('Authentication failed', error)
        })
    },
  })
  const handleStore = useDebouncedCallback((key, value) => {
    dispatch(handleLogin({ key, value }))
  }, 250)
  useEffect(() => {
    if (isLogged) {
      navigate('/dash')
    }
  }, [isLogged, navigate])
  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{ backgroundColor: '#044c54' }}
    >
      {visible && <ForgetPass setVisible={setVisible} visible={visible} />}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error.length > 0 ? <CAlert color="danger">{error}</CAlert> : null}
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cibMailRu} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        value={values.email}
                        onChange={(e) => {
                          handleChange(e)
                          handleStore('email', e.target.value)
                        }}
                        placeholder="Email"
                        autoComplete="email"
                      />
                      {errors.email && touched.email && (
                        <CTooltip content={errors.email} placement="top">
                          <CInputGroupText>
                            <CIcon style={{ color: 'red' }} icon={cilWarning} />
                          </CInputGroupText>
                        </CTooltip>
                      )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        value={values.password}
                        onChange={(e) => {
                          handleChange(e)
                          handleStore('password', e.target.value)
                        }}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                      <CInputGroupText onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </CInputGroupText>
                      {errors.password && touched.password && (
                        <CTooltip content={errors.password} placement="top">
                          <CInputGroupText>
                            <CIcon style={{ color: 'red' }} icon={cilWarning} />
                          </CInputGroupText>
                        </CTooltip>
                      )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          type="submit"
                          style={{ backgroundColor: '#044c54', color: 'white' }}
                          className="px-4"
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          onClick={() => navigate('/password-reset')}
                          color="link"
                          className="px-0"
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                style={{ backgroundColor: '#cc2c44', width: '44%' }}
                className="text-white py-5"
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Join us today to unlock exciting features and personalized experiences!
                      Register now to start exploring.
                    </p>
                    <Link to="/register">
                      <CButton
                        style={{ backgroundColor: '#044c54', color: 'white' }}
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
