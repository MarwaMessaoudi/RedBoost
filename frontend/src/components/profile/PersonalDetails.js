import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CForm,
  CInputGroup,
  CFormInput,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilContact,
  cilSpreadsheet,
  cilCode,
  cilInstitution,
  cilBirthdayCake,
  cilCloudUpload,
  cibGmail,
  cilPhone,
  cibOrcid,
} from '@coreui/icons';
import axiosInstance from '../../axiosInstance';
import { useSelector } from 'react-redux';

const PersonalDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updateLog, setUpdateLog] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const user = useSelector((state) => state.userData.userData);
  const [userData, setUserData] = useState({
    email: user.email ?? '',
    role: user.role ?? '',
    department: user.department ?? '',
    phone: user.phone ?? '',
    cin: user.cin ?? '',
    adress: user.adress ?? '',
    matricule: user.matricule ?? '',
    birthday: user.birthday ?? '',
  });

  useEffect(() => {
    const updateUserLogs = async () => {
      try {
        const updatedLogs = [...user.logs, ...updateLog];
        const response = await axiosInstance.put(`/users/${user._id}`, { logs: updatedLogs });
        if (response.data) {
          console.log('Logs Updated');
          setUpdateLog([]);
        } else {
          console.log('Error in updating Logs');
        }
      } catch (error) {
        console.error('Error updating Logs:', error);
      }
    };
    if (updateLog.length > 0) {
      updateUserLogs();
    }
  }, [updateLog, user]);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleConfirm = async () => {
    try {
      const updatedData = { ...userData };
      if (updateLog.length > 0) {
        updatedData.logs = [...user.logs, ...updateLog];
      }
      const response = await axiosInstance.put(`/users/${user._id}`, updatedData);
      if (response.status === 200) {
        console.log('User updated successfully:', response.data);
        if (editedData.length > 0) {
          editedData.forEach((element) => {
            const currentDate = new Date().toLocaleDateString();
            setUpdateLog((prevUpdateLog) => {
              const updatedLogs = [...prevUpdateLog];
              const existingLogIndex = updatedLogs.findIndex((log) => log.date === currentDate);
              if (existingLogIndex !== -1) {
                updatedLogs[existingLogIndex].events.push(
                  `User update ${element} at ${new Date().toLocaleTimeString()}`
                );
              } else {
                updatedLogs.push({
                  date: currentDate,
                  events: [`User update ${element} at ${new Date().toLocaleTimeString()}`],
                });
              }
              return updatedLogs;
            });
          });
        }
        setEditedData([]);
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setEditedData((prev) => {
      if (prev.includes(name)) {
        return prev;
      } else {
        return [...prev, name];
      }
    });
  };

  const renderEditableDetails = () => {
    const isSuperAdmin = user.role === 'superAdmin';

    return (
      <CForm>
        {personalDetails.map((detail, index) => (
          <CInputGroup key={index} className="mb-3">
            <label htmlFor={`input-${index}`} className="form-label">
              <CIcon icon={detail.icon} /> {detail.label}:
            </label>
            <CFormInput
              type="text"
              id={`input-${index}`}
              name={detail.name}
              value={userData[detail.name]}
              onChange={handleChange}
              disabled={!isSuperAdmin && !editableFields.includes(detail.name)}
            />
          </CInputGroup>
        ))}
        <div className="d-flex justify-content-center mt-3">
          <CButton style={{ marginRight: '15px' }} color="primary" onClick={handleConfirm}>
            Save Changes
          </CButton>
          <CButton color="info" onClick={toggleEditMode}>
            Cancel
          </CButton>
        </div>
      </CForm>
    );
  };

  const personalDetails = [
    { name: 'email', icon: cibGmail, label: 'Email', value: userData.email },
    { name: 'role', icon: cilCode, label: 'Role', value: userData.role },
    { name: 'department', icon: cilInstitution, label: 'Department', value: userData.department },
    { name: 'phone', icon: cilPhone, label: 'Phone', value: userData.phone },
    { name: 'cin', icon: cibOrcid, label: 'N°CIN', value: userData.cin },
    { name: 'adress', icon: cilContact, label: 'Address', value: userData.adress },
    { name: 'matricule', icon: cilSpreadsheet, label: 'Matricule fiscale', value: userData.matricule },
    { name: 'birthday', icon: cilBirthdayCake, label: 'Birthday', value: userData.birthday },
  ];

  const editableFields = ['cin', 'adress', 'matricule', 'birthday'];

  return (
    <CCard>
      <CCardHeader className="bg-dark text-light">Personal Details</CCardHeader>
      <CCardBody>
        {!isEditing ? (
          <CTable responsive="sm">
            <CTableBody>
              {personalDetails.map((detail, index) => (
                <CTableRow key={index}>
                  <CTableHeaderCell>
                    <CIcon icon={detail.icon} /> {detail.label}:
                  </CTableHeaderCell>
                  <CTableDataCell>{detail.value}</CTableDataCell>
                </CTableRow>
              ))}
              <CTableRow>
                <CTableHeaderCell>
                  <CIcon icon={cilCloudUpload} />
                  Upload CV:
                </CTableHeaderCell>
                <CTableDataCell>
                  <CFormInput type="file" id="formFile" />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        ) : (
          renderEditableDetails()
        )}
        <div className="d-flex justify-content-center mt-3">
          {!isEditing && (
            <CButton color="info" onClick={toggleEditMode}>
              Edit
            </CButton>
          )}
        </div>
      </CCardBody>
    </CCard>
  );
};

export default PersonalDetails;
