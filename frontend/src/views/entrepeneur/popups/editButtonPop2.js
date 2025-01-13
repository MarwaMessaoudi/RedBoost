import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import axiosInstance from '../../../axiosInstance';
import axios from 'axios';
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
  CFormTextarea,
  CCol,
  CModal,
  CFormLabel,
  CFormSwitch,
  CModalBody,
  CModalFooter,
  CFormCheck,
  CModalHeader,
  CModalTitle
} from '@coreui/react';
import { Toaster, toast } from 'react-hot-toast';
import { ImportExport } from '../../ImportExportEntrepeneur/importExport'
import GovDel from '../../../components/GovDel'




const EditButtonPop = ({ visible, setVisible, entrepreneur }) => {







    const dispatch = useDispatch();

  // Initialize state with entrepreneur data or empty strings

  const marcheList = [
    'Locale', 'National', 'International'
  ];

  const redprog = ['CREACT4MED','widu','Women Go Green', 'Greenit', 'Women Go Green 2', 'Redinnov', 'Junior Boss', 'SwitchMed II', 'We Go2Market'];

  const sourceFinList = [
    'Auto Financement', 'Crédit', 'Subvention'
  ];
  const accompagnement = ['Formation','Coaching','Technique','Mentorat'];

  const accompagnementRed = ['Formation','Coaching','Technique','Mentorat'];


  const handleCheckboxInputChange = (e, field) => {
    const { value, checked } = e.target;

    setContactData((prevData) => {
      if (checked) {
        return {
          ...prevData,
          [field]: [...prevData[field], value] // Add the selected value
        };
      } else {
        return {
          ...prevData,
          [field]: prevData[field].filter((item) => item !== value) // Remove the unselected value
        };
      }
    });
  };




  const initialContactData = {
    //-------entrepreneurvariables-----------
    nom:entrepreneur.nom || '',//LastName
    prenom:entrepreneur.prenom || '',//FirstName
    genre:entrepreneur.genre || '',//Gender
    mobile:entrepreneur.mobile || '',//MobileNumber
    email:entrepreneur.email || '',//Email
    trancheAge:entrepreneur.trancheAge || '',//DateofBirth
    diplome:entrepreneur.diplome || '',//Diploma/Formation
    gouvernorat:entrepreneur.gouvernorat || '',//Governorate
    delegation:entrepreneur.delegation || '',//Delegation
    star:entrepreneur.star || '',//Stars
    blacklisted:entrepreneur.blacklisted || false,//Blacklisted


    //--------startupvariables---------
    startupType:entrepreneur.startupType || '',//Startuptype
    Label:entrepreneur.Label || '',//Labelstartup
    votreRole:entrepreneur.votreRole || '',//YourRole
    projName:entrepreneur.projName || '',//ProjectName
    phaseDeProjet:entrepreneur.phaseDeProjet || '',//ProjectPhase
    entCapital:entrepreneur.entCapital || '',//Capitaled'entreprise
    entDate:entrepreneur.entDate || '',//Datedecreationentreprise
    formeJuridique:entrepreneur.formeJuridique || '',//LegalForm
    descriptionActivite:entrepreneur.descriptionActivite || '',//ActivityDescription
    secteurActivite:entrepreneur.secteurActivite || '',//ActivitySector
    empTot:entrepreneur.empTot || '',//NumberofEmployees
    nbF:entrepreneur.nbF || '',//Numberoffemaleemployees
    projGouv:entrepreneur.projGouv || '',//Projectgovernaurate
    projDel:entrepreneur.projDel || '',//Projectdelegation
    prodMarch:entrepreneur.prodMarch || '',
    chiffreAf:entrepreneur.chiffreAf || '',
    marche:entrepreneur.marche || [],//Market(ArrayofStrings)


    //---------------------------------
    typeFinance : entrepreneur.typeFinance || [],
    montantFinance : entrepreneur.montantFinance || '',
    sourceFinance : entrepreneur.sourceFinance || '',
    progAcc : entrepreneur.progAcc || '',
    progAccNom : entrepreneur.progAccNom || '',//SupportProgram
    typeAcc : entrepreneur.typeAcc || [],
    besoinAppui : entrepreneur.besoinAppui || '',//SupportNeeds(ArrayofStrings)
    socialMedia : entrepreneur.socialMedia || '',
    siteWeb : entrepreneur.siteWeb || '',


    ////---------------------------------------
    typeFinanceRed : entrepreneur.typeFinanceRed || [],
    montantFinanceRed : entrepreneur.montantFinanceRed || '',
    progAccRed : entrepreneur.progAccRed || '',
    redProg : entrepreneur.redProg || [],
    typeAccRed : entrepreneur.typeAccRed || []

  };
  const [contactData, setContactData] = useState(initialContactData);
  const [validated, setValidated] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [tempBlacklisted, setTempBlacklisted] = useState(contactData.blacklisted); // Temporary state
  const [showModal, setShowModal] = useState(false);

  const handleSwitchChange = () => {
    setTempBlacklisted(!contactData.blacklisted); // Toggle temporary state
    setShowModal(true); // Show confirmation modal
  };

  const confirmChange = () => {
    setContactData({ ...contactData, blacklisted: tempBlacklisted }); // Update the actual state
    setShowModal(false); // Close the modal
  };

  const cancelChange = () => {
    setTempBlacklisted(contactData.blacklisted); // Revert the change
    setShowModal(false); // Close the modal
  };




  // const formValidation = () => {
  //   if(contactData.genre==='') return toast.error(`Genre invalide`);
  //       if(contactData.mobile.length<8) return toast.error(`Mobile invalide`);
  //       if(isNaN(contactData.mobile)) return toast.error(`Mobile invalide`);
  //       if(!emailRegex.test(contactData.email)) return toast.error(`Email invalide`);
  //       if(contactData.trancheAge==='') return toast.error(`Choisir Tranche d'age`);
  //       if(contactData.diplome==='') return toast.error(`Choisir Diplome`);
  //       if(contactData.gouvernorat==='') return toast.error(`Choisir Gouvernoat`);
  //       if(contactData.delegation==='') return toast.error(`Choisir Delegation`);
  //       if(contactData.startupType==='') return toast.error(`Choisir le type`);
  //       if(contactData.Label==='' && contactData.startupType==='startup') return toast.error(`Choisir Label`);
  //       if(contactData.votreRole==='') return toast.error(`Choisir votre Role`);
  //       if(contactData.projName.length<2) return toast.error(`Nom du projet invalide`);
  //       if(contactData.phaseDeProjet==='') return toast.error(`Choisir Phase du projet`);
  //       if(contactData.phaseDeProjet==='Crée' && contactData.entCapital==='') return toast.error(`Choisir Capitale du l'entreprise`);
  //       if(contactData.phaseDeProjet==='Crée' && contactData.entDate==='') return toast.error(`Choisir Date de création`);
  //       if(contactData.phaseDeProjet==='Crée' && contactData.formeJuridique === '') return toast.error(`Choisir Forme de l'entreprise`);
  //       if(contactData.descriptionActivite.length<5) return toast.error(`Description invalide`);
  //       if(contactData.secteurActivite==='') return toast.error(`Choisir Secteur d'activité`);
  //       if(isNaN(contactData.empTot)||contactData.empTot==='') return toast.error(`Choisir nombre totale d'employés`);
  //       if(isNaN(contactData.nbF)||contactData.nbF==='') return toast.error(`Choisir nombre d'employés femmes`);
  //       if(contactData.nbF > contactData.empTot) return toast.error(`Nombre d'employés femmes invalide`);
  //       if(contactData.projGouv==='') return toast.error(`Choisir Gouvernoat du projet`);
  //       if(contactData.projDel==='') return toast.error(`Choisir Delegation du projet`);
  //       if(contactData.prodMarch==='') return toast.error(`Est-que vos produits / services sur le marché?`);
  //       if(contactData.prodMarch==='Oui' && contactData.marche.length===0) return toast.error(`Saisir le marché?`);
  //       if(contactData.chiffreAf==='') return toast.error(`Choisir Chiffre d'affaires`);
  //       if(contactData.typeFinance.length===0) return toast.error(`Choisir Type de financement`);
  //       if(contactData.montantFinance==='') return toast.error(`Choisir Montant de financement`);
  //       if((contactData.typeFinance.includes('Crédit') || contactData.typeFinance.includes('Subvention'))&&contactData.sourceFinance==='') return toast.error(`Choisir Source de financement`);
  //       if(contactData.progAcc==='') return toast.error(`Avez-vous déjà bénéficié d'un programme d'accompagnement?`);
  //       if(contactData.progAcc==='Oui' && contactData.progAccNom=='') return toast.error(`Tapez le programme d'accompagnement`);
  //       if(contactData.progAcc==='Oui' && contactData.typeAcc.length===0) return toast.error(`Choisir le Type d'accompagnement`);
  //       if(contactData.besoinAppui.length<5)return toast.error(`Tapez les besoins`);
  //       if(contactData.typeFinanceRed.length===0) return toast.error(`Choisir Type de financement`);
  //       if(contactData.montantFinanceRed==='') return toast.error(`Choisir Montant de financement`);
  //       if(contactData.progAccRed === '') return toast.error(`Avez-vous déjà bénéficié d'un programme d'accompagnement?`);
  //       if(contactData.progAccRed === 'Oui' && contactData.redProg.length === 0) return toast.error(`Choisir le(s) programme d'accompagnement`);
  //       if(contactData.typeAccRed.length===0) return toast.error(`Choisir le Type d'accompagnement`);
  // }

  const notifySuccess = () => {
    toast.success("Contact created successfully", {
      autoClose: 3000,
    });
  };

  const handleInputChange = (event) => {
    const { name, type, value, checked } = event.target;

    // Handle different input types
    setContactData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value, // Use 'checked' for checkboxes, 'value' for others
    }));
  };


  const gouvernorats = Object.keys(GovDel);
  const selectedGouvernorat = contactData.gouvernorat;
  const delegations = selectedGouvernorat ? GovDel[selectedGouvernorat] : [];

  const gouvernoratStartup = Object.keys(GovDel);
  const selectedGouvernoratStartup = contactData.projGouv;
  const delegationStartup = selectedGouvernoratStartup ? GovDel[selectedGouvernoratStartup] : [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  const handleSaveChanges = async () => {


    try {

      // Validate form (assuming validateForm and displayErrorToast functions are defined elsewhere)
      if (formValidation()) return false;


      // Make PUT request to update entrepreneur
      const response = await axiosInstance.put(`/updateEntrepreneur/${entrepreneur._id}`, contactData);

      // Assuming entrepreneur state is updated elsewhere in your React component
      setVisible(false); // Close modal after saving

      // Show success toast
      toast.success('Entrepreneur mis à jour avec succès!', {
        autoClose: 3000,
      });
    } catch (error) {
      // Handle error
      console.error('Error updating entrepreneur:', error);

      // Show error toast
      toast.error('Erreur lors de la mise à jour de l\'entrepreneur. Veuillez réessayer.', {
        autoClose: 3000,
      });
    }
  };

  return (
    <CModal
      size='lg'
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="editButtonPopModal"
      backdrop="static"
    >
            <Toaster position="top-right" reverseOrder={false}  />
      <CModalHeader closeButton>
        <CModalTitle>Edit Entrepreneur</CModalTitle>
      </CModalHeader>
      <CModalBody>

{/* ==================================================================================================================================== */}
{/* =======================================================ENTREPENER INFORMATION======================================================= */}
{/* ==================================================================================================================================== */}
          <CRow className='mb-0'>
            <CCol md="6" className="mb-4">
              <fieldset className="border border-success p-4 bg-light rounded mt-4 mb-0" style={{ marginBottom: "20px" }}>
                <legend className="w-auto">Informations sur l'entrepreneur</legend>
                <CRow>
                  <CCol md='6'>
                    <CFormLabel className="mt-2">Genre: </CFormLabel>
                    <CFormSelect
                      name="genre"
                      value={contactData.genre}
                      onChange={handleInputChange}
                      valid={contactData.genre !== ''}
                      required
                      feedbackInvalid="Genre est requis."
                    >
                      <option value="">Choisir le Genre</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md='12'>
                    <CFormLabel className="mt-2">Mobile: </CFormLabel>
                    <CFormInput
                      type='Number'
                      name="mobile"
                      value={contactData.mobile}
                      onChange={handleInputChange}
                      valid={contactData.mobile.length >= 8}
                      feedbackInvalid="Mobile est requis."
                      required
                    />
                  </CCol>
                  <CCol md='12'>
                    <CFormLabel className="mt-2">Email: </CFormLabel>
                    <CFormInput
                      type="email"
                      name="email"
                      value={contactData.email}
                      onChange={handleInputChange}
                      valid={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)}
                      placeholder="Email "
                      required
                      feedbackInvalid="Email est requis."
                    />
                  </CCol>
                  <CCol md='6'>
                    <CFormLabel className="mt-2">Choix tranche d'age:</CFormLabel>
                    <CFormSelect
                      name="trancheAge"
                      value={contactData.trancheAge}
                      onChange={handleInputChange}
                      placeholder="Age"
                      required
                      valid={contactData.trancheAge !== ''}
                      feedbackInvalid="Tracnhe d'age est requis."
                    >
                      <option value="">Sélectionner le tranche d'age </option>
                      <option value="18 - 24">18 - 24</option>
                      <option value="25 - 44">25 - 44</option>
                      <option value="45 - 54">45 - 54</option>
                      <option value="55 et plus">55 et plus</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md='6'>
                    <CFormLabel className="mt-2">Diplôme / Formation: </CFormLabel>
                    <CFormSelect
                      name="diplome"
                      value={contactData.diplome}
                      onChange={handleInputChange}
                      placeholder="Diplôme / Formation"
                      valid={contactData.diplome !== ''}
                      required
                      feedbackInvalid="diplome / Formation est requis."
                    >
                      <option value="">Sélectionner le diplôme / la formation </option>
                      <option value="Secondaire">Éducation Secondaire</option>
                      <option value="Universitaire">Éducation Post-Secundaire</option>
                      <option value="Licence">Licence</option>
                      <option value="Master">Master</option>
                      <option value="Doctorat">Doctorat (PhD)</option>
                      <option value="Formation Pro">Formation Professionnelle</option>
                    </CFormSelect>
                  </CCol>
                  <CCol md='6'>
                    <CFormLabel className="mt-2">Gouvernorat:</CFormLabel>
                    <CFormSelect
                      name="gouvernorat"
                      value={contactData.gouvernorat}
                      onChange={handleInputChange}
                      placeholder="Gouvernorat"
                      required
                      valid={contactData.gouvernorat !== ''}
                      feedbackInvalid="Gouvernorat est requis."
                    >
                      <option value="">Select Gouvernorat</option>
                      {gouvernorats.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md='6'>
                    <CFormLabel className="mt-2">Delegation:</CFormLabel>
                    <CFormSelect
                      name="delegation"
                      value={contactData.delegation}
                      onChange={handleInputChange}
                      placeholder="Delegation"
                      required
                      valid={contactData.delegation !== ''}
                      feedbackInvalid="Delegation est requis."
                    >
                      <option value="">Select Delegation</option>
                      {delegations.map((del) => (
                        <option key={del} value={del}>
                          {del}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md='6'>
                    <CFormLabel className="mt-2">Star * </CFormLabel>
                    <CFormInput
                      type="number"
                      name="star"
                      placeholder='XP points'
                      value={contactData.star}
                      onChange={handleInputChange}
                      valid={contactData.star !== ''}
                      feedbackInvalid="Star requis!"
                    />
                  </CCol>
                  <CCol md='12'>
                    <CFormLabel className="mt-2">Blacklisted</CFormLabel>
                    <CFormSwitch
                  size="xl"
                  label="Blacklisted"
                  id="formSwitchCheckDefaultXL"
                  name="blacklisted"
                  checked={tempBlacklisted}
                  onChange={handleSwitchChange}
                  valid={contactData.blacklisted !== ''}
                  feedbackInvalid="Blacklisted est requis."
                />
                <CModal visible={showModal} onClose={cancelChange}>
                  <CModalBody>
                    Are you sure you want to change the blacklist status?
                  </CModalBody>
                  <CModalFooter>
                    <CButton color="secondary" onClick={cancelChange}>Cancel</CButton>
                    <CButton color="primary" onClick={confirmChange}>Confirm</CButton>
                  </CModalFooter>
                </CModal>
                </CCol>
                </CRow>
              </fieldset>
            </CCol>

{/* ==================================================================================================================================== */}
{/* =======================================================STARTUP INFORMATION========================================================== */}
{/* ==================================================================================================================================== */}
            <CCol md="6" className="mb-4">


              <fieldset className="border border-success p-4 bg-light rounded mt-4 mb-0" style={{ marginBottom: "20px" }}>
              <legend className="w-auto">Informations sur le projet/startup</legend>
              <CRow>
              <CCol md="12">
                <CFormLabel className="mt-2">Startup / Entreprise</CFormLabel>
                <CFormSelect
                    name="startupType"
                    value={contactData.startupType}
                    onChange={handleInputChange}
                    placeholder="Vous êtes Projet / startup"
                    valid={contactData.startupType !== ''}

                >
                    <option value="">Vous êtes Startup / Entreprise</option>
                    <option value="entreprise">Entreprise</option>
                    <option value="startup">Startup Technologique</option>
                </CFormSelect>
                </CCol>

                {contactData.startupType === 'startup' && (
                <CCol md="12">
                    <CFormLabel className="mt-2">Pré-Label / Label Startup:</CFormLabel>
                    <CFormInput
                    type="text"
                    name="Label"
                    value={contactData.Label}
                    onChange={handleInputChange}
                    placeholder="Pré-Label / Label Startup"

                    />
                </CCol>
                )}


                <CCol md="12">
                  <CFormLabel className="mt-2">Votre Role au sein de l'entreprise:</CFormLabel>
                  <CFormSelect
                    name="votreRole"
                    value={contactData.votreRole}
                    onChange={handleInputChange}
                    valid={contactData.votreRole !== ''}

                  >
                    <option value="">Sélectionner votre role</option>
                    <option value="Président Directeur Général">Président Directeur Général</option>
                    <option value="Directeur Général">Directeur Général</option>
                    <option value="Directeur Financier">Directeur Financier</option>
                    <option value="Directeur des Ressources Humaines">Directeur des Ressources Humaines</option>
                    <option value="Directeur Commercial">Directeur Commercial</option>
                  </CFormSelect>
                </CCol>
                <CCol md="12">
                  <CFormLabel className="mt-2">Nom du project:</CFormLabel>
                  <CFormInput
                    type="text"
                    name="projName"
                    value={contactData.projName}
                    onChange={handleInputChange}
                    placeholder="Nom du project"
                    valid={contactData.projName.length >= 4}

                    />
                </CCol>
                <CCol md="12">
                <CFormLabel className="mt-2">Phase du Project:</CFormLabel>
                <CFormSelect
                    name="phaseDeProjet"
                    value={contactData.phaseDeProjet}
                    onChange={handleInputChange}
                    valid={contactData.phaseDeProjet !== ''}

                >
                    <option value="">Selectionner le phase</option>
                    <option value="Ideation">Ideation</option>
                    <option value="Crée">Crée</option>
                    <option value="En cours de creation">En cours de création</option>
                </CFormSelect>
                </CCol>

                {/* Conditionally render inputs only when "Crée" is selected */}
                {contactData.phaseDeProjet === 'Crée' && (
                <>
                    <CCol md="6">
                    <CFormLabel className="mt-2">Capitale de l'entreprise</CFormLabel>
                    <CFormInput
                        type="Number"
                        name="entCapital"
                        placeholder="Capitale de l'entreprise"
                        value={contactData.entCapital}
                        onChange={handleInputChange}
                        valid={contactData.entCapital !== ''}
                        feedbackInvalid="Capitale de l'entreprise requis!"


                    />
                    </CCol>
                    <CCol md="6">
                    <CFormLabel className="mt-2">Date de création:</CFormLabel>
                    <CFormInput
                        type='date'
                        max={today}
                        name="entDate"
                        value={contactData.entDate}
                        onChange={handleInputChange}
                        feedbackInvalid="Date de création est requis."
                    />
                    </CCol>
                    <CCol md="12">
                    <CFormLabel className="mt-2">Forme Juridique:</CFormLabel>
                    <CFormSelect
                        name="formeJuridique"
                        value={contactData.formeJuridique}
                        onChange={handleInputChange}
                        valid={contactData.formeJuridique !== ''}
                    >
                        <option value="">Selectionner Forme</option>
                        <option value="Société à Responsabilité Limitée">Société à Responsabilité Limitée (SARL)</option>
                        <option value="Société par Actions Simplifiée">Société par Actions Simplifiée</option>
                        <option value="Société Anonyme">Société Anonyme (SA)</option>
                        <option value="Entreprise Individuelle">Entreprise Individuelle (EI)</option>
                        <option value="Micro-entreprise">Micro-entreprise (anciennement Auto-entrepreneur)</option>
                        <option value="Société Civile Immobilière">Société Civile Immobilière (SCI)</option>
                    </CFormSelect>
                    </CCol>
                </>
                )}

                <CCol md="12">
                  <CFormLabel className="mt-2">Desciription / Activité principale :</CFormLabel>
                  <CFormInput
                    type="text"
                    name="descriptionActivite"
                    value={contactData.descriptionActivite}
                    onChange={handleInputChange}
                    placeholder="Desciription"
                    valid={contactData.descriptionActivite !== ''}
                    />
                </CCol>
                <CCol md="12">
                  <CFormLabel className="mt-2">Secteur D'activité:</CFormLabel>
                  <CFormSelect
                    name="secteurActivite"
                    value={contactData.secteurActivite}
                    onChange={handleInputChange}
                    valid={contactData.secteurActivite}
                  >
                    <option value="">Selectionner Secteur d'Activite</option>
                    <option value="Secteur Agricole">Secteur Agricole</option>
                    <option value="Secteur Industriel">Secteur Industriel</option>
                    <option value="Secteur des Services">Secteur des Services</option>
                    <option value="Secteur de la Construction">Secteur de la Construction</option>
                    <option value="Secteur Technologique">Secteur Technologique</option>
                    <option value="Secteur Énergétique">Secteur Énergétique</option>
                    <option value="Secteur du Commerce">Secteur du Commerce</option>
                    <option value="Secteur Culturel et Créatif">Secteur Culturel et Créatif</option>
                    <option value="Secteur Logistique et Transport">Secteur Logistique et Transport</option>

                  </CFormSelect>
                </CCol>

                <CCol md="6">
                  <CFormLabel className="mt-2">Nombre d'employés</CFormLabel>
                  <CFormInput
                    type="Number"
                    name="empTot"
                    value={contactData.empTot}
                    valid={contactData.empTot !== ''}
                    onChange={handleInputChange}
                    placeholder="N° Total"
                    feedbackInvalid="N° Total est requis."
                  />
                </CCol>
                <CCol md="6">
                  <CFormLabel className="mt-2">­</CFormLabel>
                  <CFormInput
                    type="number"
                    name="nbF"
                    value={contactData.nbF}
                    valid={contactData.nbF !== ''}
                    onChange={handleInputChange}
                    placeholder="N° des femmes"
                    feedbackInvalid="N° des femmes est requis."
                  />
                </CCol>
                <CCol md='6'>
                    <CFormLabel className="mt-2">Lieu d’implantation du projet:</CFormLabel>
                    <CFormSelect
                      name="projGouv"
                      value={contactData.projGouv}
                      onChange={handleInputChange}
                      placeholder="Gouvernorat"
                      valid={contactData.projGouv !== ''}
                      feedbackInvalid="Gouvernorat est requis."
                    >
                      <option value="">Select Gouvernorat</option>
                      {gouvernoratStartup.map((gouv) => (
                        <option key={gouv} value={gouv}>
                          {gouv}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md='6'>
                    <CFormLabel className="mt-2">­</CFormLabel>
                    <CFormSelect
                      name="projDel"
                      value={contactData.projDel}
                      onChange={handleInputChange}
                      placeholder="Delegation"
                      valid={contactData.projDel !== ''}
                      feedbackInvalid="Delegation est requis."
                    >
                      <option value="">Select Delegation</option>
                      {delegationStartup.map((dele) => (
                        <option key={dele} value={dele}>
                          {dele}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md="12">
                    <CFormLabel className="mt-2">Est-que vos produits / services sur le marché?</CFormLabel><br/>
                    <CFormCheck
                        type="radio"
                        name="prodMarch"
                        id="marchOui"
                        value="Oui"
                        checked={contactData.prodMarch === 'Oui'}
                        onChange={handleInputChange}
                    /> &nbsp;Oui &nbsp;&nbsp;&nbsp;&nbsp;
                    <CFormCheck
                        type="radio"
                        name="prodMarch"
                        id="marchNon"
                        value="Non"
                        checked={contactData.prodMarch === 'Non'}
                        onChange={handleInputChange}
                    /> &nbsp;Non
                    </CCol>

                    {/* Conditionally render checkboxes for "Marché" if "Oui" is selected */}
                    {contactData.prodMarch === 'Oui' && (
                    <CCol md="6">
                        <CFormLabel className="mt-2">Marché</CFormLabel>
                        {marcheList.map((marche) => (
                        <CFormCheck
                            key={marche}
                            type="checkbox"
                            name="marche"
                            value={marche}
                            label={marche}
                            checked={contactData.marche.includes(marche)}
                            onChange={(e) => handleCheckboxInputChange(e, 'marche')}
                        />
                        ))}
                    </CCol>
                    )}

                <CCol md="12">
                  <CFormLabel className="mt-2">Chiffre d'Affaires:</CFormLabel>
                  <CFormSelect
                    name="chiffreAf"
                    value={contactData.chiffreAf}
                    onChange={handleInputChange}
                    valid={contactData.chiffreAf !== ''}
                  >
                    <option value="">Selectionner Chiffre d'Affaires</option>
                    <option value="1,000 ou moins">1,000 ou moins</option>
                    <option value="1,000 - 9,000">1,000 - 9,000</option>
                    <option value="10,000 - 49,000">10,000 - 49,000</option>
                    <option value="50,000 - 99,000">50,000 - 99,000</option>
                    <option value="100,000 - 199,000">100,000 - 199,000</option>
                    <option value="200,000 ou plus">200,000 ou plus</option>
                  </CFormSelect>
                </CCol>
                </CRow>
                </fieldset>
            </CCol>
          </CRow>
{/* ==================================================================================================================================== */}
{/* ==================================================================================================================================== */}
{/* ==================================================================================================================================== */}

          <CRow className='mb-0'>
            <CCol md="6" className="mb-4">
            <fieldset className="border border-success p-4 bg-light rounded mt-4 mb-0" style={{ marginBottom: "20px" }}>
            <legend className="w-auto">Informations sur l'entrepreneur</legend>
            <CCol md="12">
                <CFormLabel className="mt-2">Type de Financement</CFormLabel>
                {sourceFinList.map((source) => (
                    <CFormCheck
                    key={source}
                    type="checkbox"
                    name="typeFinance"
                    value={source}
                    label={source}
                    checked={contactData.typeFinance.includes(source)}
                    onChange={(e) => handleCheckboxInputChange(e, 'typeFinance')}
                    />
                ))}
                </CCol>

                <CCol md="6">
                <CFormLabel className="mt-2">Montant de financement</CFormLabel>
                <CFormInput
                    type="number"
                    name="montantFinance"
                    value={contactData.montantFinance}
                    onChange={handleInputChange}
                    placeholder="Montant"
                />
                </CCol>

                {/* Conditionally render "Source de Financement" if "Crédit" or "Subvention" is selected */}
                {(contactData.typeFinance.includes('Crédit') || contactData.typeFinance.includes('Subvention')) && (
                <CCol md="6">
                    <CFormLabel className="mt-2">Source de Financement</CFormLabel>
                    <CFormInput
                    type="text"
                    name="sourceFinance"
                    placeholder="Source"
                    value={contactData.sourceFinance}
                    onChange={handleInputChange}
                    valid={contactData.sourceFinance !== ''}
                    feedbackInvalid="Source de Financement requis!"
                    />
                </CCol>
                )}

                <CCol md="12">
                <CFormLabel className="mt-2">Avez-vous déjà bénéficié d'un programme d'accompagnement?</CFormLabel><br/>
                <CFormCheck
                    type="radio"
                    name="progAcc"
                    id="progAcc1"
                    value="Oui"
                    checked={contactData.progAcc === 'Oui'}
                    onChange={handleInputChange}
                /> &nbsp;Oui &nbsp;&nbsp;&nbsp;
                <CFormCheck
                    type="radio"
                    name="progAcc"
                    id="progAcc2"
                    value="Non"
                    checked={contactData.progAcc === 'Non'}
                    onChange={handleInputChange}
                /> &nbsp;Non
                </CCol>

                {/* Conditionally render the inputs only if the user selected "Oui" */}
                {contactData.progAcc === 'Oui' && (
                <>
                    <CCol md="6">
                    <CFormLabel className="mt-2">Quel programme ?</CFormLabel>
                    <CFormInput
                        type="text"
                        name="progAccNom"
                        placeholder="Programme"
                        value={contactData.progAccNom}
                        onChange={handleInputChange}
                        valid={contactData.progAccNom !== ''}
                        feedbackInvalid="Programme requis!"
                    />
                    </CCol>
                    <CCol md="12">
                    <CFormLabel className="mt-2">Type d'accompagnement</CFormLabel>
                    {accompagnement.map((source) => (
                        <CFormCheck
                        key={source}
                        type="checkbox"
                        name="typeAcc"
                        value={source}
                        label={source}
                        valid={contactData.typeAcc !== ''}
                        checked={contactData.typeAcc.includes(source)}
                        onChange={(e) => handleCheckboxInputChange(e, 'typeAcc')}
                        />
                    ))}
                    </CCol>
                </>
                )}

                  <CCol md='12'>
                    <CFormLabel className="mt-2">Quels sont les besoins de votre projet  en matière d'appui?</CFormLabel>
                    <CFormTextarea
                        rows={2}
                        text="Must be 8-20 words long."
                        name="besoinAppui"
                        placeholder="Besions"
                        value={contactData.besoinAppui}
                        onChange={handleInputChange}
                        valid={contactData.besoinAppui !== ''}
                        feedbackInvalid="Champ requis!"
                    />
                  </CCol>
                  <CCol md='12'>
                    <CFormLabel className="mt-2">Lien Site web</CFormLabel>
                    <CFormInput
                      type="text"
                      name="siteWeb"
                      placeholder="Site web"
                      value={contactData.siteWeb}
                      onChange={handleInputChange}
                      valid={contactData.siteWeb !== ''}
                    />
                  </CCol>
                  <CCol md='12'>
                    <CFormLabel className="mt-2">Lien social media </CFormLabel>
                    <CFormInput
                      type="text"
                      name="socialMedia"
                      placeholder="Social media"
                      value={contactData.socialMedia}
                      onChange={handleInputChange}
                      valid={contactData.socialMedia !== ''}
                      feedbackInvalid="Programme requis!"
                    />
                  </CCol>
                  </fieldset>




          </CCol>
          <CCol md="6" className="mb-4">
            <fieldset className="border border-success p-4 bg-light rounded mt-4 mb-0" style={{ marginBottom: "20px" }}>
            <legend className="w-auto">REDSTART</legend>
            <CCol md="12">
              <CFormLabel className="mt-2">Type de Financement</CFormLabel>
              {sourceFinList.map((source) => (
                  <CFormCheck
                    key={source}
                    type="checkbox"
                    name="typeFinanceRed"
                    value={source}
                    label={source}
                    checked={contactData.typeFinanceRed.includes(source)}
                    valid={contactData.typeFinanceRed !== ''}
                    onChange={(e) => handleCheckboxInputChange(e, 'typeFinanceRed')}
                    />
                    ))}
                </CCol>
            <CCol md="6">
                  <CFormLabel className="mt-2">Montant de financement</CFormLabel>
                  <CFormInput
                    type="number"
                    name="montantFinanceRed"
                    value={contactData.montantFinanceRed}
                    valid={contactData.montantFinanceRed !== ''}
                    onChange={handleInputChange}
                    placeholder="Montant"
                  />
              </CCol>
              <CCol md="12">
                    <CFormLabel className="mt-2">Avez-vous déjà bénéficié d'un programme d'accompagnement?</CFormLabel><br/>
                    <CFormCheck
                        type="radio"
                        name="progAccRed"
                        id="progAccRedOui"
                        value="Oui"
                        checked={contactData.progAccRed === 'Oui'}
                        onChange={handleInputChange}
                    /> &nbsp;Oui &nbsp;&nbsp;&nbsp;
                    <CFormCheck
                        type="radio"
                        name="progAccRed"
                        id="progAccRedNon"
                        value="Non"
                        checked={contactData.progAccRed === 'Non'}
                        onChange={handleInputChange}
                    /> &nbsp;Non
                    </CCol>

                    {/* Conditionally render the checkboxes only if "Oui" is selected */}
                    {contactData.progAccRed === 'Oui' && (
                    <CCol md="12">
                        <CFormLabel className="mt-2">Quel programme?</CFormLabel>
                        {redprog.map((source) => (
                        <CFormCheck
                            key={source}
                            type="checkbox"
                            name="redProg"
                            value={source}
                            label={source}
                            checked={contactData.redProg.includes(source)}
                            valid={contactData.redProg !== ''}
                            onChange={(e) => handleCheckboxInputChange(e, 'redProg')}
                        />
                        ))}
                    </CCol>
                    )}

                    <CCol md="12">
                    <CFormLabel className="mt-2">Type d'accompagnement</CFormLabel>
                    {accompagnementRed.map((source) => (
                        <CFormCheck
                        key={source}
                        type="checkbox"
                        name="typeAccRed"
                        value={source}
                        label={source}
                        valid={contactData.typeAccRed !== ''}
                        checked={contactData.typeAccRed.includes(source)}
                        onChange={(e) => handleCheckboxInputChange(e, 'typeAccRed')}
                        />
                    ))}
                    </CCol>
                  </fieldset>

          </CCol>
          </CRow>

          </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Annuler
        </CButton>
        <CButton color="primary" onClick={handleSaveChanges}>
          Sauvegarder
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditButtonPop;
