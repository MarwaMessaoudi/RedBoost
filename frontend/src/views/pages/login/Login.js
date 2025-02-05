import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@coreui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cibMailRu, cilWarning } from '@coreui/icons';
import { useFormik } from 'formik';
import signinValidation from './signinValidation';
import axiosInstance from '../../../axiosInstance';
import { handleLogin } from '../../../app/features/login/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { setUserData } from '../../../app/features/userData/userData';
import { setAuthentication } from '../../../app/features/auth/authSlice';
import backlogin from "../../../assets/images/backlogin.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signinValidation,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post('/login', values);
        console.log('Authentication successful', response.data);
        const { password, confirmation, _id, ...userDataWithoutPassword } = response.data.user;
        dispatch(setUserData(userDataWithoutPassword));
        setError('');
        dispatch(setAuthentication(true));
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error);
        }
        console.log('Authentication failed', error);
      }
    },
  });

  const handleStore = useDebouncedCallback((key, value) => {
    dispatch(handleLogin({ key, value }));
  }, 250);

  if (isLogged) {
    navigate('/dash');
  }

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: `url(${backlogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay for opacity */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity here (0.5 = 50% opacity)
        }}
      ></div>

      <CContainer style={{ position: 'relative', zIndex: 1 }}>
        <CRow className="justify-content-center">
          <CCol md={6} lg={4}>
            <CCard className="p-4 shadow">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <div className="text-center mb-4">
                    <h2>Welcome Back</h2>
                    <p className="text-body-secondary">Sign in to continue</p>
                  </div>
                  {error.length > 0 && <CAlert color="danger">{error}</CAlert>}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cibMailRu} />
                    </CInputGroupText>
                    <CFormInput
                      name="email"
                      value={values.email}
                      onChange={(e) => {
                        handleChange(e);
                        handleStore('email', e.target.value);
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
                        handleChange(e);
                        handleStore('password', e.target.value);
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
                        className="w-100"
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
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;