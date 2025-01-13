import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CFormLabel,
} from '@coreui/react';

const AdvancedFilter = ({ entrepreneurs, onFilterUpdate }) => {
  // Default filter state
  const defaultFilters = {
    sector: '',
    male: true,  // Default checked
    female: true,  // Default checked
    gouvernorat: '',
    search: ''
  };

  // Filters state
  const [filters, setFilters] = useState(defaultFilters);

  const [sectors, setSectors] = useState([]);
  const [gouvernorats, setGouvernorats] = useState([]);
  const [atLeastOneGenderChecked, setAtLeastOneGenderChecked] = useState(true);
  const [filteredEntrepreneurs, setFilteredEntrepreneurs] = useState([]);

  useEffect(() => {
    const uniqueSectors = [...new Set(entrepreneurs.map((e) => e.secteurActivite))];
    const uniqueGouvernorats = [...new Set(entrepreneurs.map((e) => e.gouvernorat))];
    setSectors(uniqueSectors);  
    setGouvernorats(uniqueGouvernorats);
  }, [entrepreneurs]);

  useEffect(() => {
    // Check if at least one gender checkbox is checked
    setAtLeastOneGenderChecked(filters.male || filters.female);
  }, [filters.male, filters.female]);

  useEffect(() => {
    // Filter entrepreneurs based on search input
    const filtered = entrepreneurs.filter(entrepreneur =>
      Object.values(entrepreneur).some(val =>
        val && val.toString().toLowerCase().includes(filters.search.toLowerCase())
      )
    );    
    setFilteredEntrepreneurs(filtered);
  }, [filters.search, entrepreneurs]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleGenderChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  // Function to reset filters
  const handleResetFilters = () => {
    setFilters(defaultFilters); // Reset filters to default
    onFilterUpdate(defaultFilters); // Trigger filter update with default values
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    onFilterUpdate(filters);
  };

  return (
    <CCard className="mb-4 shadow">
      <CCardHeader className="bg-primary text-white">Filtre Avancée</CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleFilterSubmit}>
          <CRow className="mb-3">
            <CCol md="4">
              <CFormLabel htmlFor="sector">Secteur:</CFormLabel>
              <CFormSelect name="sector" value={filters.sector} onChange={handleFilterChange}>
                <option value="">Toutes Secteurs</option>
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md="4">
              <CFormLabel>Genre</CFormLabel>
              <div>
                <input
                  type="checkbox"
                  id="male"
                  name="male"
                  checked={filters.male}
                  onChange={handleGenderChange}
                />
                <label htmlFor="male" className="mx-2">
                  Homme
                </label>
                <input
                  type="checkbox"
                  id="female"
                  name="female"
                  checked={filters.female}
                  onChange={handleGenderChange}
                />
                <label htmlFor="female" className="mx-2">
                  Femme
                </label>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="4">
              <CFormLabel htmlFor="gouvernorat">Gouvernorat:</CFormLabel>
              <CFormSelect name="gouvernorat" value={filters.gouvernorat} onChange={handleFilterChange}>
                <option value="">Touts Gouvernorats</option>
                {gouvernorats.map((gouvernorat) => (
                  <option key={gouvernorat} value={gouvernorat}>
                    {gouvernorat}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow>
            <CCol md="12">
              <CFormLabel htmlFor="search">Recherche:</CFormLabel>
              <div className="input-group">
                <CFormInput
                  type="text"
                  id="search"
                  name="search"
                  className="form-control"
                  placeholder="Nom du l'Entrepreneur / Startup / Email"
                  value={filters.search}
                  onChange={handleFilterChange}
                />
              </div>
            </CCol>
          </CRow>

          <div className="d-flex justify-content-start gap-2 mt-3">
            <CButton
              type="submit"
              color="primary"
              disabled={!atLeastOneGenderChecked}
            >
              Appliquer Filtre
            </CButton>
            {/* Remove Filters button */}
            <CButton
              type="button"
              color="secondary"
              onClick={handleResetFilters}
            >
               Annuler
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AdvancedFilter;
