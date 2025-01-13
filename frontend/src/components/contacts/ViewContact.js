import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CListGroup, CListGroupItem } from '@coreui/react'

function ViewContact({show,setShow,contact}) {
 
  return (
    <CModal
    backdrop="static"
    visible={show}
    onClose={() => setShow(false)}
    aria-labelledby="StaticBackdropExampleLabel"
  >
        <CModalHeader closeButton>
          <CModalTitle>Informations</CModalTitle>
        </CModalHeader>
        <CModalBody style={{overflow :"auto" ,maxHeight:"500px"}}>
          <CListGroup>
            <CListGroupItem><strong>Adresse:</strong>{contact.adresse}</CListGroupItem>
            <CListGroupItem><strong>Age:</strong>{contact.age}</CListGroupItem>
            <CListGroupItem><strong>Autre Financement:</strong> {contact.autreFinancement}</CListGroupItem>
            <CListGroupItem><strong>Blacklisted:</strong>{contact.blacklisted}</CListGroupItem>
            <CListGroupItem><strong>Coût Projet:</strong>{contact.coutProjet}</CListGroupItem>
            <CListGroupItem><strong>Créé ou Non:</strong>{contact.creeeOuNon}</CListGroupItem>
            <CListGroupItem><strong>Date de Naissance:</strong>{new Date(contact.dateDeNaissance).toDateString()}</CListGroupItem>
            <CListGroupItem><strong>Date Decaissement:</strong>{new Date(contact.dateDecaissement).toDateString()}</CListGroupItem>
            <CListGroupItem><strong>Description:</strong> {contact.description}</CListGroupItem>
            <CListGroupItem><strong>Email:</strong>{contact.email}</CListGroupItem>
            <CListGroupItem><strong>État Avancement Projets:</strong>{contact.etatAvancementProjets}</CListGroupItem>
            <CListGroupItem><strong>Financement Decaisse:</strong>{contact.financementDecaisse}</CListGroupItem>
            <CListGroupItem><strong>Forme Juridique:</strong>{contact.formeJuridique}</CListGroupItem>
            <CListGroupItem><strong>Gender:</strong>{contact.gender}</CListGroupItem>
            <CListGroupItem><strong>Gouvernorat:</strong>{contact.gouvernorat}</CListGroupItem>
            <CListGroupItem><strong>Montant Financement Accordé:</strong>{contact.montantFinancementAccorde}</CListGroupItem>
            <CListGroupItem><strong>Nom:</strong> {contact.nom}</CListGroupItem>
            <CListGroupItem><strong>Nombre Cofondateurs:</strong>{contact.nombreCofondateurs}</CListGroupItem>
            <CListGroupItem><strong>Nombre Cofondateurs Femmes:</strong>{contact.nombreCofondateursFemmes}</CListGroupItem>
            <CListGroupItem><strong>Nombre Emplois Créés:</strong>{contact.nombreEmploisCrees}</CListGroupItem>
            <CListGroupItem><strong>Nombre Heures Formation Collective:</strong>{contact.nombreHeuresFormationCollective}</CListGroupItem>
            <CListGroupItem><strong>Nombre Heures Formation Individuelle:</strong>{contact.nombreHeuresFormationIndividuelle}</CListGroupItem>
            <CListGroupItem><strong>Objectifs Financement:</strong>{contact.objectifsFinancement}</CListGroupItem>
            <CListGroupItem><strong>Organisme Financement:</strong>{contact.organismeFinancement}</CListGroupItem>
            <CListGroupItem><strong>Prénom:</strong>{contact.prenom}</CListGroupItem>
            <CListGroupItem><strong>Région:</strong>{contact.region}</CListGroupItem>
            <CListGroupItem><strong>Secteur Activités:</strong>{contact.secteurActivites}</CListGroupItem>
            <CListGroupItem><strong>Startup Name:</strong>{contact.startupName}</CListGroupItem>
          </CListGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={()=>setShow(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
  );
}

export default ViewContact;
