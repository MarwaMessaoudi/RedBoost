import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormCheck
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilOptions, cilUser, cilBriefcase, cilPeople, cilCalendar } from '@coreui/icons'

const WidgetsDropdown = ({ className }) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  const entrepreneurs = useSelector((state) => state.entrepreneurs.entrepreneurs)
  const programs = useSelector((state) => state.programsSlice.programs)
  const sessions = useSelector((state) => state.sessionsSlice.sessions)
  const users = useSelector((state) => state.usersSlice.users)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const handleColorSchemeChange = () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)
    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      <CRow>
        <CCol>
          <CButton color="primary" onClick={toggleModal}>Add new key indicator</CButton>
          <CModal visible={modalVisible} onClose={toggleModal}>
            <CModalHeader closeButton>Input Form</CModalHeader>
            <CModalBody>
              <CForm>
                <div className="mb-3">
                  <CFormInput id="label" placeholder="Enter label" label="Label" />
                </div>
                <div className="mb-3">
                  <CFormInput id="value" placeholder="Enter value" label="Value"/>
                </div>
                <div className="mb-3">
                  <CFormCheck inline id="inlineCheckbox1" value="Green'it 2.0" label="Green'it 2.0"/>
                  <CFormCheck inline id="inlineCheckbox2" value="WomenGoGreen" label="WomenGoGreen"/>
                  <CFormCheck inline id="inlineCheckbox3" value="Creact4Med" label="Creact4Med"/>
                </div>
              </CForm>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary">
                Save
              </CButton>
            </CModalFooter>
          </CModal>
        </CCol>
      </CRow>

      <CCol sm={6} xl={4} xxl={3}>
        <Link to="/statistics/users" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            color="primary"
            value={users.length}
            title="Users"
            icon={<CIcon icon={cilUser} size="xl" />}
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                  <CIcon icon={cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                    <CIcon icon={cilUser} className="me-2" />
                    View Details
                  </CDropdownItem>
                  <CDropdownItem>
                    <CIcon icon={cilBriefcase} className="me-2" />
                    Manage Users
                  </CDropdownItem>
                  <CDropdownItem>
                    <CIcon icon={cilPeople} className="me-2" />
                    User Reports
                  </CDropdownItem>
                  <CDropdownItem disabled>
                    <CIcon icon={cilCalendar} className="me-2" />
                    Schedule
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                ref={widgetChartRef1}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-primary'),
                      data: [65, 59, 84, 84, 51, 55, 40],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { display: false },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: { display: false, drawBorder: false },
                      ticks: { display: false },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      grid: { display: false },
                      ticks: { display: false },
                    },
                  },
                  elements: {
                    line: { borderWidth: 1, tension: 0.4 },
                    point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                  },
                }}
              />
            }
          />
        </Link>
      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <Link to="/Dash/statistics/entrepreneurs" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            color="info"
            value={entrepreneurs.length}
            title="Entrepreneurs"
            icon={<CIcon icon={cilPeople} size="xl" />}
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                  <CIcon icon={cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                    <CIcon icon={cilPeople} className="me-2" />
                    View Details
                  </CDropdownItem>
                  <CDropdownItem>
                    <CIcon icon={cilBriefcase} className="me-2" />
                    Manage Entrepreneurs
                  </CDropdownItem>
                  <CDropdownItem>
                    <CIcon icon={cilCalendar} className="me-2" />
                    Schedule
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                ref={widgetChartRef2}
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-info'),
                      data: [1, 18, 9, 17, 34, 22, 11],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { display: false },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: { display: false, drawBorder: false },
                      ticks: { display: false },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      grid: { display: false },
                      ticks: { display: false },
                    },
                  },
                  elements: {
                    line: { borderWidth: 1 },
                    point: { radius: 4, hitRadius: 10, hoverRadius: 4 },
                  },
                }}
              />
            }
          />
        </Link>
      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <Link to="/Dash/statistics/startupsAccelerated" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            color="success"
            value={programs.length}
            title="Startups Accelerated"
            icon={<CIcon icon={cilBriefcase} size="xl" />}
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                  <CIcon icon={cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                    <CIcon icon={cilBriefcase} className="me-2" />
                    View Details
                  </CDropdownItem>
                  <CDropdownItem>
                    <CIcon icon={cilCalendar} className="me-2" />
                    Schedule
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartBar
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: [5, 10, 6, 8, 15, 12, 10],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { display: false },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { display: false },
                    },
                    y: {
                      min: 0,
                      max: 20,
                      grid: { display: false },
                      ticks: { display: false },
                    },
                  },
                }}
              />
            }
          />
        </Link>
      </CCol>

      <CCol sm={6} xl={4} xxl={3}>
        <Link to="/Dash/statistics/sessions" style={{ textDecoration: 'none' }}>
          <CWidgetStatsA
            color="warning"
            value={sessions.length}
            title="Sessions"
            icon={<CIcon icon={cilCalendar} size="xl" />}
            action={
              <CDropdown alignment="end">
                <CDropdownToggle color="transparent" caret={false} className="text-white p-0">
                  <CIcon icon={cilOptions} />
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem>
                    <CIcon icon={cilCalendar} className="me-2" />
                    View Details
                  </CDropdownItem>
                  <CDropdownItem>
                    <CIcon icon={cilBriefcase} className="me-2" />
                    Manage Sessions
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            }
            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                  datasets: [
                    {
                      label: 'My First dataset',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-warning'),
                      data: [15, 12, 22, 15, 10, 18, 14],
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: { display: false },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: { display: false },
                    },
                    y: {
                      min: 5,
                      max: 25,
                      grid: { display: false },
                      ticks: { display: false },
                    },
                  },
                }}
              />
            }
          />
        </Link>
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
}

export default WidgetsDropdown
