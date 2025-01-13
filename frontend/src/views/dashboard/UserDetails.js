import React from 'react';
import { useSelector } from 'react-redux';
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft } from '@coreui/icons';
import { Link } from 'react-router-dom';

const UserDetails = ({ user, onBack }) => {
  return (
    <CCard>
      <CCardHeader className="bg-dark text-light">
        <div className="d-flex align-items-center">
          <Link to="/" className="text-light me-3" onClick={onBack}>
            <CIcon icon={cilArrowLeft} /> Back to Dashboard
          </Link>
          User Details
        </div>
      </CCardHeader>
      <CCardBody>
        {user && (
          <CTable responsive="sm">
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell>Photo:</CTableHeaderCell>
                <CTableDataCell>
                  <CAvatar size="xl" src={user.image.length > 0 ? user.image : userAvatar} />
                </CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>XP Points:</CTableHeaderCell>
                <CTableDataCell>{user.exp}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Email:</CTableHeaderCell>
                <CTableDataCell>{user.email}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Role:</CTableHeaderCell>
                <CTableDataCell>{user.role}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Department:</CTableHeaderCell>
                <CTableDataCell>{user.department}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableHeaderCell>Phone:</CTableHeaderCell>
                <CTableDataCell>{user.phone}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
};

export default UserDetails;
