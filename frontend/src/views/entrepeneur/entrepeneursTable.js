import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CTable, CButton, CCard, CCardBody, CCardHeader, CContainer } from '@coreui/react';
import { Link } from 'react-router-dom';
import AdvancedFilter from '../contacts/AdvancedFilter.js';
import { ImportExport } from '../ImportExportEntrepeneur/importExport.js';
import ExportButtons from '../ImportExportEntrepeneur/exportButtons.js'; // Adjust the path according to your file structure
import * as XLSX from 'xlsx'
import axiosInstance from '../../axiosInstance.js';

const EntrepreneursTable = () => {
  const allEntrepreneurs = useSelector((state) => state.entrepreneurs.entrepreneurs);
  const [filteredEntrepreneurs, setFilteredEntrepreneurs] = useState(allEntrepreneurs);
  const [selectedEntrepreneurs, setSelectedEntrepreneurs] = useState([]);

  useEffect(() => {
    setFilteredEntrepreneurs(allEntrepreneurs); // Initialize filtered entrepreneurs with all entrepreneurs
  }, [allEntrepreneurs]);

  const handleFilterUpdate = (filters) => {
    let filtered = allEntrepreneurs;

    if (filters.sector) {
      filtered = filtered.filter(e => e.secteurActivite === filters.sector);
    }

    if (filters.male || filters.female) {
      filtered = filtered.filter(e => {
        if (filters.male && filters.female) return true; // Include both genders
        if (filters.male) return e.genre === 'homme';
        if (filters.female) return e.genre === 'femme';
        return false; // Should never reach here, but a fallback
      });
    }
    
    if (filters.gouvernorat) {
      filtered = filtered.filter(e => e.gouvernorat === filters.gouvernorat);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(e =>
        (e.nom && e.nom.toLowerCase().includes(searchTerm)) ||
        (e.prenom && e.prenom.toLowerCase().includes(searchTerm)) ||
        (e.email && e.email.toLowerCase().includes(searchTerm)) ||
        (e.projName && e.projName.toLowerCase().includes(searchTerm))
      );
    }

    setFilteredEntrepreneurs(filtered);
  };

  const handleSelectEntrepreneur = (id) => {
    setSelectedEntrepreneurs(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(selectedId => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const exportToExcel = (data, fileName) => {
    // Map data to match the schema fields
    const mappedData = data.map(e => ({
      'Nom': e.nom,
      'Prénom': e.prenom,
      'Adresse': e.adresse,
      'Email': e.email,
      'Date de Naissance': e.dateDeNaissance,
      'Région': e.region,
      'Genre': e.gender,
      'Nom de Startup': e.startupName,
      'Description': e.description,
      'Gouvernorat': e.gouvernorat,
      'Secteur d\'activités': e.secteurActivites,
      'Nombre de Cofondateurs': e.nombreCofondateurs,
      'Nombre de Cofondateurs Femmes': e.nombreCofondateursFemmes,
      'Créée ou Non': e.creeeOuNon,
      'Forme Juridique': e.formeJuridique,
      'Nombre d\'emplois Créés': e.nombreEmploisCrees,
      'Coût du Projet': e.coutProjet
    }));

    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(mappedData);

    // Create a workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Entrepreneurs');

    // Save the workbook to a file
    XLSX.writeFile(wb, fileName);
  };

  const handleExportAll = () => {
    exportToExcel(allEntrepreneurs, 'all_entrepreneurs.xlsx');
  };

  const handleExportSelected = () => {
    const selectedData = filteredEntrepreneurs.filter(e => selectedEntrepreneurs.includes(e._id));
    exportToExcel(selectedData, 'selected_entrepreneurs.xlsx');
  };
  const handleDeleteEntrepreneur = async (id) => {
    try {
      console.log(id)
      // Make a DELETE request using the Axios instance
      await axiosInstance.delete(`/deleteEntrepreneur/${id}`);
  
      // If the deletion is successful, update the list of entrepreneurs
      const updatedEntrepreneurs = allEntrepreneurs.filter(e => e._id !== id);
      setFilteredEntrepreneurs(updatedEntrepreneurs);
      setSelectedEntrepreneurs(prevSelected =>
        prevSelected.filter(selectedId => selectedId !== id)
      );
    } catch (error) {
      console.error('Error deleting entrepreneur:', error);
      // Handle error here (e.g., show error message to user)
    }
  };


  return (
    <div>
      <AdvancedFilter entrepreneurs={allEntrepreneurs} onFilterUpdate={handleFilterUpdate} />
      <div className="d-flex justify-content-end mt-2 ">
      <ImportExport />
      <ExportButtons
        onExportAll={handleExportAll}
        onExportSelected={handleExportSelected}
        selectedCount={selectedEntrepreneurs.length}
      /></div>
      <CCard className='mt-2'>
        <CCardHeader className="bg-dark text-light">Entrepreneurs</CCardHeader>
        <CCardBody>
          <CTable responsive>
            {/* Table header */}
            <thead>
              <tr>
                <th></th>
                <th>Nom du l'Entrepreneur</th>
                <th>Nom du Startup</th>
                <th>Secteur d'Activité</th>
                <th>Email</th>
                <th></th> {/* See More button */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {filteredEntrepreneurs.map((entrepreneur) => (
                <tr key={entrepreneur._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEntrepreneurs.includes(entrepreneur._id)}
                      onChange={() => handleSelectEntrepreneur(entrepreneur._id)}
                    />
                  </td>
                  <td>{entrepreneur.nom} {entrepreneur.prenom}</td>
                  <td>{entrepreneur.projName}</td>
                  <td>{entrepreneur.secteurActivite}</td>
                  <td>{entrepreneur.email}</td>
                  <td>
                    <Link to={`${entrepreneur._id}`}>
                      <CButton color="primary">See More</CButton>
                      </Link>
                    <CButton color="danger" className='m-1' onClick={() => handleDeleteEntrepreneur(entrepreneur._id)}>Delete</CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default EntrepreneursTable;
