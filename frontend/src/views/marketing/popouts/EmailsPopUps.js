import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CRow,
  CCol,
  CFormSelect,
  CTable,
  CFormInput,
} from '@coreui/react';

const EmailsPopUps = ({ visible, onClose, onSave }) => {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [gender, setGender] = useState('');
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [availableEmails, setAvailableEmails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmails, setFilteredEmails] = useState([]);

  const secteursActivites = [
    { value: 'Agriculture durable', label: 'Agriculture durable' },
    { value: 'Cosmétique', label: 'Cosmétique' },
    { value: 'Recyclage', label: 'Recyclage' },
    { value: 'Green Tech', label: 'Green Tech' },
    { value: 'Agro-alimentaire', label: 'Agro-alimentaire' },
    { value: 'Créatif et culturel', label: 'Créatif et culturel' },
    { value: 'Tourisme durable', label: 'Tourisme durable' },
    { value: 'Optimisation de la consommation', label: 'Optimisation de la consommation' },
    { value: 'Énergie renouvelable', label: 'Énergie renouvelable' },
    { value: 'Gestion des ressources hydrauliques', label: 'Gestion des ressources hydrauliques' }
  ];

  const regions = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa',
    'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia',
    'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid',
    'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/loadAllEntrepreneurs'); // Adjust endpoint as per your backend API
        setAvailableEmails(response.data); // Assuming response.data is an array of email objects
        setFilteredEmails(response.data); // Initialize filteredEmails with all fetched emails
      } catch (error) {
        console.error('Error fetching emails:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once on component mount

  useEffect(() => {
    handleFilterChange();
  }, [selectedRegions, gender, selectedSectors]);

  useEffect(() => {
    // Filter emails based on search term
    const filtered = availableEmails.filter(email =>
      email.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmails(filtered);
  }, [searchTerm, availableEmails]);

  const handleFilterChange = () => {
    const filteredEmails = availableEmails.filter(email => {
      return (
        (selectedRegions.length === 0 || selectedRegions.includes(email.region)) &&
        (gender === '' || email.gender === gender) &&
        (selectedSectors.length === 0 || selectedSectors.includes(email.sector))
      );
    });
    setFilteredEmails(filteredEmails);
  };

  const handleEmailSelect = (email) => {
    if (!selectedEmails.some(e => e.email === email.email)) {
      setSelectedEmails([...selectedEmails, email]);
    } else {
      setSelectedEmails(selectedEmails.filter(e => e.email !== email.email));
    }
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails);
    }
  };

  const handleSave = () => {
    const selectedEmailAddresses = selectedEmails.map(e => e.email);
    console.log('Selected Emails for Save:', selectedEmailAddresses); // Debug log
    onSave(selectedEmailAddresses);
    onClose();
  };
  

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader closeButton>
        <CModalTitle>Select Recipients</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CRow>
            <CCol>
              <CFormLabel>Regions</CFormLabel>
              <div style={{ maxHeight: '90px', overflowY: 'auto' }}>
                {regions.map((region, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      value={region}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (selectedRegions.includes(value)) {
                          setSelectedRegions(selectedRegions.filter(r => r !== value));
                        } else {
                          setSelectedRegions([...selectedRegions, value]);
                        }
                      }}
                      checked={selectedRegions.includes(region)}
                    />
                    <CFormLabel>{region}</CFormLabel>
                  </div>
                ))}
              </div>
            </CCol>
            <CCol>
              <CFormLabel>Gender</CFormLabel>
              <CFormSelect
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">All Genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </CFormSelect>
            </CCol>
            <CCol>
              <CFormLabel>Sectors</CFormLabel>
              <div style={{ maxHeight: '90px', overflowY: 'auto' }}>
                {secteursActivites.map((secteur, index) => (
                  <div key={index}>
                    <input
                      type="checkbox"
                      value={secteur.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (selectedSectors.includes(value)) {
                          setSelectedSectors(selectedSectors.filter(s => s !== value));
                        } else {
                          setSelectedSectors([...selectedSectors, value]);
                        }
                      }}
                      checked={selectedSectors.includes(secteur.value)}
                    />
                    <CFormLabel style={{ fontSize: '12px' }}>{secteur.label}</CFormLabel>
                  </div>
                ))}
              </div>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol>
              <>
                <CFormInput
                  type="text"
                  placeholder="Search by email"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <>
                  <CButton color="primary">Search</CButton>
                </>
              </>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol>
              <CTable striped hover responsive>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedEmails.length === filteredEmails.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Email</th>
                    <th>Region</th>
                    <th>Gender</th>
                    <th>Sector</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmails.map((email, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedEmails.some(e => e.email === email.email)}
                          onChange={() => handleEmailSelect(email)}
                        />
                      </td>
                      <td>{email.email}</td>
                      <td>{email.region}</td>
                      <td>{email.gender}</td>
                      <td>{email.sector}</td>
                    </tr>
                  ))}
                </tbody>
              </CTable>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Save Recipients
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EmailsPopUps;
