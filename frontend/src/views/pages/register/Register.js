import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
  CTooltip,
  CAlert,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilPhone, cilWarning } from '@coreui/icons'
import { useFormik } from 'formik'
import signupValidation from './signupValidation'
import axiosInstance from '../../../axiosInstance'
import { useDebouncedCallback } from 'use-debounce'
import { useDispatch, useSelector } from 'react-redux'
import { handleRegister } from '../../../app/features/register/registerSlice'
import { Link } from 'react-router-dom'
const Register = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      username: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      password: '',
      confirmation: '',
    },
    validationSchema: signupValidation,
    onSubmit: async (values, actions) => {
      try {
        console.log(values)
        const sendData = await axiosInstance.post('/register', values)
        setError('')
        setSuccess(sendData.data.info.message)
        actions.resetForm()
      } catch (error) {
        setError(error.response.data.error.error)
        setSuccess('')
        console.log(error)
      }
    },
  })
  const dispatch = useDispatch()
  const state = useSelector((state) => state.registerSlice)
  const handleStore = useDebouncedCallback((key, value) => {
    dispatch(handleRegister({ key, value }))
  }, 250)
  useEffect(() => {
    const timeout = setTimeout(console.log(state), 100000)
    return () => {
      clearTimeout(timeout)
    }
  }, [state])
  return (
    <div
      style={{ backgroundColor: '#044c54' }}
      className=" min-vh-100 d-flex flex-row align-items-center"
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <div>
                    <h1>Register</h1>
                  </div>
                  <p className="text-body-secondary">Create your account</p>
                  {success ? <CAlert color="success">{success}</CAlert> : null}
                  {error ? <CAlert color="danger">{error}</CAlert> : null}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Full Name"
                      name="username"
                      value={values.username}
                      onChange={(e) => {
                        handleChange(e)
                        handleStore('username', e.target.value)
                      }}
                      autoComplete="fullname"
                    />
                    {errors.username && touched.username && (
                      <CTooltip content={errors.username} placement="top">
                        <CInputGroupText>
                          <CIcon style={{ color: 'red' }} icon={cilWarning} />
                        </CInputGroupText>
                      </CTooltip>
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      name="email"
                      placeholder="Email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => {
                        handleChange(e)
                        handleStore('email', e.target.value)
                      }}
                    />
                    {errors.email && touched.email && (
                      <CTooltip content={errors.email} placement="top">
                        <CInputGroupText>
                          <CIcon style={{ color: 'red' }} icon={cilWarning} />
                        </CInputGroupText>
                      </CTooltip>
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      name="phone"
                      placeholder="Phone"
                      autoComplete="Phone"
                      value={values.phone}
                      onChange={(e) => {
                        handleChange(e)
                        handleStore('phone', e.target.value)
                      }}
                    />
                    {errors.phone && touched.phone && (
                      <CTooltip content={errors.phone} placement="top">
                        <CInputGroupText>
                          <CIcon style={{ color: 'red' }} icon={cilWarning} />
                        </CInputGroupText>
                      </CTooltip>
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormSelect
                      aria-label="Default select example"
                      value={values.role}
                      onChange={(e) => {
                        handleChange(e)
                        handleStore('role', e.target.value)
                      }}
                      name="role"
                    >
                      <option>Select Your Role</option>
                      <option value="superAdmin">IT Manager</option>
                      <option value="CEO">CEO</option>
                      <option value="regionalManager">Regional Manager</option>
                      <option value="projectEmployee">Project Employee</option>
                      <option value="marcomManager">Marcom Manager</option>
                      <option value="financialManager">Financial Manager</option>
                    </CFormSelect>
                    {errors.role && touched.role && (
                      <CTooltip content={errors.role} placement="top">
                        <CInputGroupText>
                          <CIcon style={{ color: 'red' }} icon={cilWarning} />
                        </CInputGroupText>
                      </CTooltip>
                    )}
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormSelect
                      aria-label="Default select example"
                      value={values.department}
                      onChange={(e) => {
                        handleChange(e)
                        handleStore('department', e.target.value)
                      }}
                      name="department"
                    >
                      <option>Select Your Department</option>
                      <option value="MANAGER">Management</option>
                      <option value="MARCOM">Marketing & Communication</option>
                      <option value="FINANCE">Finance & Logistics</option>
                      <option value="REGIONALS">Regional Manager</option>
                    </CFormSelect>
                    {errors.department && touched.department && (
                      <CTooltip content={errors.department} placement="top">
                        <CInputGroupText>
                          <CIcon style={{ color: 'red' }} icon={cilWarning} />
                        </CInputGroupText>
                      </CTooltip>
                    )}
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      autoComplete="new-password"
                      onChange={(e) => {
                        handleChange(e)
                        handleStore('passowrd', e.target.value)
                      }}
                    />
                    {errors.password && touched.password && (
                      <CTooltip content={errors.password} placement="top">
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
                      type="password"
                      name="confirmation"
                      value={values.confirmation}
                      onChange={(e) => {
                        handleChange(e)
                        handleStore('confirmation', e.target.value)
                      }}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                    {errors.confirmation && touched.confirmation && (
                      <CTooltip content={errors.confirmation} placement="top">
                        <CInputGroupText>
                          <CIcon style={{ color: 'red' }} icon={cilWarning} />
                        </CInputGroupText>
                      </CTooltip>
                    )}
                  </CInputGroup>
                  <div className="form-check d-flex justify-content-center mb-5">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3cg"
                    />
                    <label className="form-check-label" htmlFor="form2Example3g">
                      I agree to all statements in{' '}
                      <a href="#!" className="text-body">
                        <u>Terms of service</u>
                      </a>
                    </label>
                  </div>

                  <div className="d-grid">
                    <CButton type="submit" style={{ backgroundColor: '#cc2c44', color: 'white' }}>
                      Create Account
                    </CButton>
                  </div>
                  <div className="mt-3 text-center">
                    <span>Already have an account? </span>
                    <Link to="/" className="text-decoration-none">
                      Login here
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
