import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPeople } from '@coreui/icons';
import UserDetails from './UserDetails';
import userAvatar from '../../components/Images/user.png';
import WidgetsDropdown from '../widgets/WidgetsDropdown';
import TaskCalendar from './TaskCalendar';
import TaskList from './TaskList';

const Dashboard = () => {
  const users = useSelector((state) => state.usersSlice.users);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    if (user.image.length > 0) {
      setSelectedUser(user);
    } else {
      alert('Please upload a photo to view user details.');
    }
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <>
      {selectedUser ? (
        <UserDetails user={selectedUser} onBack={handleBack} />
      ) : (
        <>
          <WidgetsDropdown users={users} className="mb-4" />
          <CRow>
            <CCol xs={12} md={6}>
              <CCard className="mb-4">
                <CCardHeader>RedBoost Calendar</CCardHeader>
                <CCardBody>
                  <TaskCalendar />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12} md={6}>
              <CCard className="mb-4">
                <CCardHeader>Task List</CCardHeader>
                <CCardBody>
                  <TaskList />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>Online Users</CCardHeader>
                <CCardBody>
                  <CTable align="middle" className="mb-0 border table-sm" hover responsive>
                    <CTableHead className="text-nowrap">
                      <CTableRow>
                        <CTableHeaderCell className="bg-body-tertiary text-center">
                          <CIcon icon={cilPeople} />
                        </CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary text-center">Points</CTableHeaderCell>
                        <CTableHeaderCell className="bg-body-tertiary">Role</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {users.map((user, index) => (
                        <CTableRow
                          key={index}
                          onClick={() => handleUserClick(user)}
                          style={{ cursor: 'pointer' }}
                        >
                          <CTableDataCell className="text-center">
                            <CAvatar
                              size="md"
                              src={user.image.length > 0 ? user.image : userAvatar}
                              status="success"
                            />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div>{user.username}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">{user.exp}</CTableDataCell>
                          <CTableDataCell>
                            <div className="fw-semibold text-nowrap">{user.role}</div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
    </>
  );
};

export default Dashboard;
