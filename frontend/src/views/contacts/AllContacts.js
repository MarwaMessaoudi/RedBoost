import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CContainer, CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow, CButton, CTable, CTableHead, CTableBody, CTableHeaderCell, CTableDataCell, CTableRow, CProgress, CProgressBar  } from '@coreui/react';
import { FcContacts } from "react-icons/fc";

const AllContacts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const allContacts = useSelector((state) => state.entrepreneurs.entrepreneurs); // Make sure the completion percentage is included here

  useEffect(() => {
    // Filtering common properties for all types of contacts
    const filtered = allContacts.filter(contact =>
      (contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredContacts(filtered);
  }, [allContacts, searchTerm]);

  return (
    <div>
      <CContainer className="my-4">
        <CRow className="mb-4">
          <CCol>
            <Link to="/dash/entrepeneurs">
              <CButton color="primary" className="me-2">Entrepreneurs</CButton>
            </Link>
            <Link to="/coaches">
              <CButton color="primary" className="me-2">Coaches</CButton>
            </Link>
            <Link to="/investors">
              <CButton color="primary" className="me-2">Investors</CButton>
            </Link>
            <Link to="/mentors">
              <CButton color="primary" className="me-2">Mentors</CButton>
            </Link>
            <Link to="/project-holders">
              <CButton color="primary">Project Holders</CButton>
            </Link>
          </CCol>
        </CRow>
        <CCard>
          <CCardHeader style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ display: 'flex', alignItems: 'center' }}>
              <FcContacts style={{ fontSize: "40px" }} />
              All Contacts
            </h4>
            <CFormInput
              type="text"
              placeholder="Search Contacts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: '300px', marginRight: '10px' }}
            />
          </CCardHeader>
          <CCardBody>
            <CTable striped responsive>
              <CTableHead>
                <tr>
                  <CTableHeaderCell>Nom</CTableHeaderCell>
                  <CTableHeaderCell>Prénom</CTableHeaderCell>
                  <CTableHeaderCell>Mobile</CTableHeaderCell>
                  <CTableHeaderCell>Role</CTableHeaderCell>
                  <CTableHeaderCell>Genre</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Completion</CTableHeaderCell> {/* New Header */}
                  <CTableHeaderCell>Action</CTableHeaderCell>
                </tr>
              </CTableHead>
              <CTableBody>
                {filteredContacts.map(contact => (
                  <CTableRow key={contact.id}>
                    <CTableDataCell>{contact.nom}</CTableDataCell>
                    <CTableDataCell>{contact.prenom}</CTableDataCell>
                    <CTableDataCell>{contact.mobile}</CTableDataCell>
                    <CTableDataCell>{contact.votreRole}</CTableDataCell>
                    <CTableDataCell>{contact.genre}</CTableDataCell>
                    <CTableDataCell>{contact.email}</CTableDataCell>
                    <CTableDataCell>
                      {/* Display Completion as a Progress Bar */}
                      {contact.completionPercentage ? (
                        <CProgress value={contact.completionPercentage} color="success">
                          <CProgressBar>{contact.completionPercentage.toFixed(2)}%</CProgressBar>
                        </CProgress>
                      ) : (
                        <span>N/A</span>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/dash/entrepeneurs/${contact._id}`}>
                        <CButton color="primary">View Profile</CButton>
                      </Link>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CContainer>
    </div>
  );
};

export default AllContacts;
