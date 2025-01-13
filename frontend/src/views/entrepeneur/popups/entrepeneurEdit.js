import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormLabel,
} from '@coreui/react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';


const EntrepreneurEdit = ({ visible, setVisible, entrepreneur }) => {
  const dispatch = useDispatch();

  const [editedNom, setEditedNom] = useState(entrepreneur.nom);
  const [editedPrenom, setEditedPrenom] = useState(entrepreneur.prenom);
  const [editedBio, setEditedBio] = useState(entrepreneur.bio);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNomChange = (e) => {
    setEditedNom(e.target.value);
  };

  const handlePrenomChange = (e) => {
    setEditedPrenom(e.target.value);
  };
  

  const handleBioChange = (e) => {
    setEditedBio(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    // Prepare updated entrepreneur object with firstname, lastname and bio
    const updatedEntrepreneur = {
      ...entrepreneur,
      nom: editedNom,
      prenom: editedPrenom,
      bio: editedBio,
    };
    try{
    const response = await axiosInstance.put(`/updateEntrepreneur/${entrepreneur._id}`, updatedEntrepreneur);
    setVisible(false); // Close modal after saving
    toast.success('Entrepreneur mis à jour avec succès!', {
      autoClose: 3000,
    });

  
  }catch (error) {
    // Handle error
    console.error('Error updating entrepreneur:', error);

    // Show error toast
    toast.error('Erreur lors de la mise à jour de l\'entrepreneur. Veuillez réessayer.', {
      autoClose: 3000,
    });
  }
   

  };

  if (!entrepreneur) return null;

  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="EntrepreneurEditModal"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle>Edit Entrepreneur</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="mb-3">
          <CFormLabel htmlFor="name">Nom:</CFormLabel>
          <CFormInput
            type="text"
            id="nom"
            name="nom"
            placeholder="Nom"
            value={editedNom}
            onChange={handleNomChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="name">Prénom:</CFormLabel>
          <CFormInput
            type="text"
            id="prenom"
            name="prenom"
            placeholder="Prénom"
            value={editedPrenom}
            onChange={handlePrenomChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="bio">Bio:</CFormLabel>
          <CFormTextarea
            id="bio"
            name="bio"
            placeholder="Enter bio"
            value={editedBio}
            onChange={handleBioChange}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="file">Avatar:</CFormLabel>
          <CFormInput
            type="file"
            id="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary"  onClick={() => setVisible(false)}>Cancel</CButton>
        <CButton color="primary" onClick={handleSaveChanges}>Save</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EntrepreneurEdit;
