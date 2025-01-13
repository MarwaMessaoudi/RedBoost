import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FaEdit } from 'react-icons/fa';
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CSpinner,
  CAlert,
  CAvatar,CProgress, CProgressBar
} from '@coreui/react';
import InfoCard from './InfoCard';
import EditButtonPop from './popups/editButtonPop'; // Assuming your modal component is named EditButtonPop
import EntrepreneurEdit from './popups/entrepeneurEdit'; // Importing the EntrepreneurEdit modal component

const EntrepreneurDetails = () => {
  const { id } = useParams();
  const [editButtonPopVisible, setEditButtonPopVisible] = useState(false); // State to manage editButtonPop modal visibility
  const [entrepreneurEditVisible, setEntrepreneurEditVisible] = useState(false); // State to manage EntrepreneurEdit modal visibility

  const entrepreneur = useSelector((state) =>
    state.entrepreneurs.entrepreneurs.find((ent) => ent._id === id)
  );
  const loading = useSelector((state) => state.entrepreneurs.loading);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <CSpinner color="primary" size="lg" />
      </div>
    );
  }

  if (!entrepreneur) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <CAlert color="danger">Entrepreneur Introuvable</CAlert>
      </div>
    );
  }

  const memberSince = moment(entrepreneur.joinedDate).fromNow();

  const handleEditClick = () => {
    setEditButtonPopVisible(true); // Open the editButtonPop modal when Modify button is clicked
  };

  const handleEntrepreneurEditClick = () => {
    setEntrepreneurEditVisible(true); // Open the EntrepreneurEdit modal when Edit button is clicked
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // console.log(formatDate(entrepreneur.DateCre));

  return (
    <div className="container mt-4">
      <div className="text-start m-2">
        <CButton color="primary" onClick={() => window.history.back()}>
          Back
        </CButton>
      </div>

      {/* editButtonPop Modal */}
      <EditButtonPop
        visible={editButtonPopVisible}
        setVisible={setEditButtonPopVisible}
        entrepreneur={entrepreneur} // Pass entrepreneur data to the editButtonPop modal
      />

      {/* EntrepreneurEdit Modal */}
      <EntrepreneurEdit
        visible={entrepreneurEditVisible}
        setVisible={setEntrepreneurEditVisible}
        entrepreneur={entrepreneur} // Pass entrepreneur data to the EntrepreneurEdit modal
      />

      {/* Full-width card with avatar and name */}
      <CCard className="mb-4 shadow-sm mb-3 border-top-secondary border-top-3">
        <CCardBody className="d-flex flex-column flex-md-row align-items-center">
          <CRow>
            <CCol md={3} className="mb-3 mb-md-0 px-md-3">
              <div className="text-center">
                <CAvatar
                  src="https://www.pngarts.com/files/5/User-Avatar-PNG-Picture.png"
                  size="xxl"
                  className="rounded-circle shadow-lg border border-primary img-fluid w-100 h-100"
                />
              </div>
            </CCol>

            <CCol md={6} className="text-center text-md-start px-md-3">
              <div className="text-center text-md-start ms-md-4 m-4">
                <div className="name-container mb-2 m">
                  <h4>
                    {entrepreneur.nom.charAt(0).toUpperCase() +
                      entrepreneur.nom.slice(1)}{' '}
                    {entrepreneur.prenom.charAt(0).toUpperCase() +
                      entrepreneur.prenom.slice(1)}
                  </h4>
                </div>
                <p className="text-muted mt-4">Entrepeneur</p>
                <p className="text-muted mb-0">
                  <strong>Bio:</strong> <br /> {entrepreneur.bio}
                </p>
              </div>
            </CCol>

            <CCol md={3} className="text-center text-md-start px-md-3 mt-5">
              <p className="text-muted mt-mb-2">Member since {moment(entrepreneur.DateCre).format('MMMM Do, YYYY')}</p>
              <p className="text-muted mt-mb-2">XP Points: {entrepreneur.star}</p>
                    {/* Display Completion as a Progress Bar */}
              {entrepreneur.completionPercentage ? (
                <CCol className="text-center text-md-start px-md-3">
                  <div className="mb-4">
                    <h5>Completion Status</h5>
                    <CProgress value={entrepreneur.completionPercentage} color="success">
                      <CProgressBar>{entrepreneur.completionPercentage.toFixed(2)}%</CProgressBar>
                    </CProgress>
                  </div>
                </CCol>
              ) : (
                <span>N/A</span>
              )}
            </CCol>
            <div className="text-end">
              <CButton color="secondary" onClick={handleEntrepreneurEditClick}>
                <FaEdit className="ml-2" style={{ cursor: 'pointer' }} />
              </CButton>
            </div>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Two cards side by side */}
      <CRow>
        <CCol xs={12} md={6}>
          <InfoCard
            title="Personal Information"
            info={[
              { label: 'Genre: ', value: entrepreneur.genre },
              { label: 'Mobile: ', value: entrepreneur.mobile },
              { label: 'Email: ', value: entrepreneur.email },
              { label: "Tranche d'Age: ", value: entrepreneur.trancheAge },
              { label: 'Diplome: ', value: entrepreneur.diplome },
              { label: 'Gouvernorat: ', value: entrepreneur.gouvernorat },
              { label: 'Delegation: ', value: entrepreneur.delegation },
              { label: 'Blacklisted: ', value: String(entrepreneur.blacklisted) },

            ]}
          />
        </CCol>

        <CCol xs={12} md={6}>
          <InfoCard
            title="Startup Information"
            info={[
              { label: 'Type: ', value: entrepreneur.startupType },
              entrepreneur.startupType === 'startup' && { label: 'Pré-Label / Label: ', value: entrepreneur.Label },
              { label: 'Votre Role: ', value: entrepreneur.votreRole },
              { label: 'Nom du Projet: ', value: entrepreneur.projName },
              { label: 'Phase du Project: ', value: entrepreneur.phaseDeProjet },
              entrepreneur.phaseDeProjet === 'Crée' && { label: "Capitale de l'entreprise: ", value: entrepreneur.entCapital },
              entrepreneur.phaseDeProjet === 'Crée' && { label: 'Date de création: ', value: moment(entrepreneur.entDate).format('MMMM Do, YYYY') },
              entrepreneur.phaseDeProjet === 'Crée' && { label: 'Forme Juridique: ', value: entrepreneur.formeJuridique },              { label: 'Desciription / Activité principale: ', value: entrepreneur.descriptionActivite },
              { label: "Nombre d'Employés Totales: ", value: entrepreneur.empTot },
              { label: "Nombre d'Employés Femmes: ", value: entrepreneur.nbF },
              { label: 'Lieu d’implantation (Gouvernorat): ', value: entrepreneur.projGouv },
              { label: 'Lieu d’implantation (Delegation): ', value: entrepreneur.projDel },
              entrepreneur.prodMarch === 'Oui' && { label: 'Marché: ', value: entrepreneur.marche.join(', ') },
              { label: "Chiffre d'Affaires: ", value: entrepreneur.chiffreAf }
            ].filter(Boolean)}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12} md={6}>
          <InfoCard
            title="Personal Information"
            info={[
              { label: 'Type de Financement: ', value: entrepreneur.typeFinance.join(', ') },
              { label: 'Montant de financement: ', value: entrepreneur.montantFinance },
              (entrepreneur.typeFinance.includes('Crédit') || entrepreneur.typeFinance.includes('Subvention')) && { label: 'Source de Financement: ', value: entrepreneur.sourceFinance },
              entrepreneur.progAcc === 'Oui' && { label: "Programme d'Accompagnement: ", value: entrepreneur.progAccNom },
              entrepreneur.progAcc === 'Oui' && { label: "Type d'accompagnement: ", value: entrepreneur.typeAcc.join(', ') },
              { label: 'Besoins du Projet: ', value: entrepreneur.besoinAppui },
              entrepreneur.siteWeb !== '' && { label: 'Lien Site web: ', value: entrepreneur.siteWeb },
              entrepreneur.socialMedia !== '' && { label: 'Lien social media: ', value: entrepreneur.socialMedia },
            ]}
          />
        </CCol>

        <CCol xs={12} md={6}>
          <InfoCard
            title="REDSTART"
            info={[
              { label: 'Type de Financement: ', value: entrepreneur.typeFinanceRed.join(', ') },
              { label: 'Montant de financement: ', value: entrepreneur.montantFinanceRed },
              entrepreneur.progAccRed === 'Oui' &&{ label: "Programme d'Accompagnement: ", value: entrepreneur.redProg.join(', ') },
              { label: "Type d'accompagnement: ", value: entrepreneur.typeAccRed.join(', ') },

            ]}
          />
        </CCol>
      </CRow>
      <div className="text-center">
        <CButton color="primary" onClick={handleEditClick}>
          Modifier
        </CButton>
      </div>
    </div>
  );
};

export default EntrepreneurDetails;
