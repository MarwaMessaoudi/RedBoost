import React, { useEffect, useRef } from 'react';
import { 
    CRow, 
    CButton, 
    CCol,
    CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
    CWidgetStatsA,
    CTable,
CTableBody,
CTableHead, 
CTableRow,
CTableHeaderCell,
CTableDataCell,CBadge} from '@coreui/react';
    
import { CChart, CChartLine } from '@coreui/react-chartjs'
import { Link } from 'react-router-dom';
import { getStyle } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilOptions ,cilArrowTop } from '@coreui/icons';

export default function marketingDashboard() {
  const sentEmailsChartRef = useRef(null);
  const newSubscribersChartRef = useRef(null);

  const categories = {
    "Empower Her": "danger",
    "Tech": "success",
    "Entrepreneurship": "warning",
    "Green": "info"
  };
  
  // Badge component
  const Badge = ({ category }) => {
    const color = categories[category];
    return <CBadge color={color} >{category}</CBadge>;
  };
  const tableData = [
    { email: 'example1@example.com', target: 'Target 1', category: 'Tech' },
    { email: 'example2@example.com', target: 'Target 2', category: 'Entrepreneurship' },
    { email: 'example3@example.com', target: 'Target 3', category: 'Green' },
    { email: 'example4@example.com', target: 'Target 4', category: 'Empower Her' },
    { email: 'example5@example.com', target: 'Target 5', category: 'Entrepreneurship' },
  ];
  const emailtableData = [
    { email: 'example1@example.com', theme: 'Target 1', Date: '02/03/2024 at 10am' },
    { email: 'example2@example.com', theme: 'Target 2', Date: '02/03/2024 at 10am' },
    { email: 'example3@example.com', theme: 'Target 3', Date: '02/03/2024 at 10am' },
    { email: 'example4@example.com', theme: 'Target 4', Date: '02/03/2024 at 10am' },
    { email: 'example5@example.com', theme: 'Target 5', Date: '02/03/2024 at 10am' },
  ];

  // Function to render table rows
  const renderTableRows = () => {
    return emailtableData.map((row, index) => (
        
      <CTableRow key={index}>
        <CTableDataCell>{row.email}</CTableDataCell>
        <CTableDataCell>{row.theme}</CTableDataCell>
        <CTableDataCell >{row.Date}</CTableDataCell>
        
      </CTableRow>
    ));
  };
  // Function to render table rows
  const renderSuggestedTableRows = () => {
    return tableData.map((row, index) => (
      <CTableRow key={index}>
        <CTableDataCell>{row.email}</CTableDataCell>
        <CTableDataCell>{row.target}</CTableDataCell>
        <CTableDataCell ><Badge category={row.category}/></CTableDataCell>
        <CTableDataCell>
        <CButton color='primary' size='sm'>
            Approve
        </CButton>
        </CTableDataCell>
      </CTableRow>
    ));
  };
  useEffect(() => {
    const handleColorSchemeChange = () => {
      if (sentEmailsChartRef.current) {
        setTimeout(() => {
          sentEmailsChartRef.current.data.datasets[0].backgroundColor = getStyle('--cui-primary') || '#FF6384';
          sentEmailsChartRef.current.update();
        });
      }

      if (newSubscribersChartRef.current) {
        setTimeout(() => {
          newSubscribersChartRef.current.data.datasets[0].backgroundColor = getStyle('--cui-info') || '#36A2EB';
          newSubscribersChartRef.current.update();
        });
      }
    };

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange);
    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange);
    };
  }, []);

  return (
    <div>
      <CRow>
        <CCol>
          <CRow>
            <CCol>
              <div className='m-4 d-flex justify-content-end'>
                <Link to="#">
                  <CButton color='primary' className='m-2'>
                    Customize email
                  </CButton>
                </Link>
                <Link to="#">
                  <CButton color='secondary' className='m-2'>
                    Review themes
                  </CButton>
                </Link>
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol>
              <CRow>
                <CCol sm={6}>
                  <div className="mb-4">
                   
                    <CWidgetStatsA
                    className="mb-4"
                    color="info"
                     value={
                     <>
                        9.000{' '}
                    <span className="fs-6 fw-normal">
                        (40.9% <CIcon icon={cilArrowTop} />)
                    </span>
                    </>
                     }
                 title="Emails sent"
                
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
                pointBackgroundColor: '#39f',
                data: [65, 59, 84, 84, 51, 55, 40],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                min: 30,
                max: 89,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
                tension: 0.4,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
      }
    />
                  </div>
                </CCol>

                <CCol sm={6}>
                <CWidgetStatsA
      className="mb-4"
      color="warning"
      value={
        <>
          +10{' '}
          <span className="fs-6 fw-normal">
            (0.9% <CIcon icon={cilArrowTop} />)
          </span>
        </>
      }
      title="New subscribers"
      
      chart={
        <CChartLine
          className="mt-3"
          style={{ height: '70px' }}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
                data: [78, 81, 80, 45, 34, 12, 40],
                fill: true,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },
            },
            elements: {
              line: {
                borderWidth: 2,
                tension: 0.4,
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
      }
    />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
            
          <CRow>
            <CCol >
            <CTabs activeItemKey={1} >
                <CTabList variant="underline">
                <CTab aria-controls="home-tab-pane" itemKey={1}>Suggested Emails</CTab>
                <CTab aria-controls="profile-tab-pane" itemKey={2}>Suggested Newspaper</CTab>
                <CTab aria-controls="contact-tab-pane" itemKey={3}>Suggested Themes</CTab>
            </CTabList>
            <CTabContent  >
                <CTabPanel className="py-3" aria-labelledby="home-tab-pane" itemKey={1}>
                <CTable responsive hover align="middle">
      <CTableHead color="">
        <CTableRow>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Target</CTableHeaderCell>
          <CTableHeaderCell scope="col">Category</CTableHeaderCell>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {renderSuggestedTableRows()}
      </CTableBody>
    </CTable>
                </CTabPanel>
                <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" itemKey={2}>
                <CTable responsive hover align="middle">
      <CTableHead color="">
        <CTableRow>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Target</CTableHeaderCell>
          <CTableHeaderCell scope="col">Category</CTableHeaderCell>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {renderSuggestedTableRows()}
      </CTableBody>
    </CTable>
                </CTabPanel>
                <CTabPanel className="py-3" aria-labelledby="contact-tab-pane" itemKey={3}>
                <CTable responsive hover align="middle">
      <CTableHead color="">
        <CTableRow>
          <CTableHeaderCell scope="col">Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Target</CTableHeaderCell>
          <CTableHeaderCell scope="col">Category</CTableHeaderCell>
          <CTableHeaderCell scope="col"></CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {renderSuggestedTableRows()}
      </CTableBody>
    </CTable>
                </CTabPanel>
        </CTabContent>
        </CTabs>
            </CCol>
          </CRow>
        </CCol>
        <CCol>
        
                
                <CTable responsive hover align="middle">
      <CTableHead color="">
        <CTableRow>
          <CTableHeaderCell scope="col"> Scheduled Email</CTableHeaderCell>
          <CTableHeaderCell scope="col">Theme</CTableHeaderCell>
          <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {renderTableRows()}
        {renderTableRows()}
         {renderTableRows()}
      </CTableBody>
    </CTable>
        </CCol>
      </CRow>
    </div>
  );
}
