import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { CButton } from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../axiosInstance.js';

export function ImportExport() {
  const secteursActivites = [
    'Agriculture durable', 'Cosmétique', 'Recyclage', 'Green Tech',
    'Agro-alimentaire', 'Créatif et culturel', 'Tourisme durable',
    'Optimisation de la consommation', 'Énergie renouvelable',
    'Gestion des ressources hydrauliques'
  ];

  const regions = [
    'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa',
    'Jendouba', 'Kairouan', 'Kasserine', 'Kebili', 'Kef', 'Mahdia',
    'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid',
    'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  const [contactData, setContactData] = useState({
    nom: '', prenom: '', genre: '', mobile: '', email: '',
    gouvernorat: '', delegation: '', star: '', blacklisted: '',
    startupType: '', label: '', votreRole: '', projName: '',
    phaseDeProjet: '', entCapital: '', formeJuridique: '',
    descriptionActivite: '', secteurActivite: '', empTot: '',
    nbF: '', projGouv: '', projDel: '', prodMarch: '',
    marche: '', chiffreAf: '', typeFinance: '', montantFinance: '',
    sourceFinance: '', progAcc: '', progAccNom: '', typeAcc: '',
    besoinAppui: '', siteWeb: '', socialMedia: '',
    typeFinanceRed: '', montantFinanceRed: '', progAccRed: '',
    redProg: '', typeAccRed: ''
  });

  const notifySuccess = () => {
    toast.success("Contact created successfully", { autoClose: 3000 });
  };

  const generateTemplateData = () => {
    return [{
      'Nom': contactData.nom,
      'Prénom': contactData.prenom,
      'Genre': contactData.genre,
      'Mobile': contactData.mobile,
      'Email': contactData.email,
      "Gouvernorat": contactData.gouvernorat,
      "Delegation": contactData.delegation,
      "XP Points": contactData.star,
      "Blacklisted": contactData.blacklisted,
      "Type de startup": contactData.startupType,
      "Pré-Label / Label": contactData.label,
      "Votre Role": contactData.votreRole,
      "Nom du Projet": contactData.projName,
      "Phase du Projet": contactData.phaseDeProjet,
      "Capitale d'Entreprise": contactData.entCapital,
      "Forme Juridique": contactData.formeJuridique,
      "Description": contactData.descriptionActivite,
      "Secteur d'Activité": contactData.secteurActivite,
      "Nb Employées totales": contactData.empTot,
      "Nb Employées femmes": contactData.nbF,
      "Gouvernorat du Projet": contactData.projGouv,
      "Delegation du Projet": contactData.projDel,
      "Produits sur Marché Oui/Non": contactData.prodMarch,
      "Marché du Produit": contactData.marche,
      "Chiffre d'Affaires": contactData.chiffreAf,
      "Type de Financement": contactData.typeFinance,
      "Montant de Financement": contactData.montantFinance,
      "Source de Financement": contactData.sourceFinance,
      "Programmes d'accomp, Oui/Non": contactData.progAcc,
      "Nom du Programmes d'accompagnement": contactData.progAccNom,
      "Type d'Accompagnement": contactData.typeAcc,
      "Besoins de Votre Projet": contactData.besoinAppui,
      "Lien Site Web": contactData.siteWeb,
      "Lien Social Media": contactData.socialMedia,
      "Type de Financement Red": contactData.typeFinanceRed,
      "Montant de Financement Red": contactData.montantFinanceRed,
      "Programmes d'accomp Red, Oui/Non": contactData.progAccRed,
      "Nom du Programmes d'accompagnement Red": contactData.redProg,
      "Type d'Accompagnement Red": contactData.typeAccRed
    }];
  };

  const handleExport = () => {
    const templateData = generateTemplateData();
    if (templateData.length === 0) {
      console.error("No data to export.");
      toast.error('No data available to export.');
      return;
    }

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contacts_Template');
    XLSX.writeFile(wb, 'contacts_template.xlsx');
  };

  const handleImportClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx, .xls';
    fileInput.addEventListener('change', (e) => {
      handleImport(e.target.files[0]);
      fileInput.remove();
    });
    fileInput.click();
  };

  const handleImport = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
        console.log("Imported data:", jsonData); // Log the imported data
        if (validateData(jsonData)) {
          processData(jsonData);
        } else {
          console.error("Imported data is not valid.");
          toast.error('Imported data is not valid.');
        }
      } catch (error) {
        console.error('Error parsing file:', error);
        toast.error(`Failed to parse file: ${error.message}`); // Show the error message
      }
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      toast.error(`Failed to read file: ${error.message}`);
    };
    reader.readAsArrayBuffer(file);
  };
  

  const validateData = (data) => {
    // Validation logic for imported data
    // Add your validation rules here
    return true; // Assume validation is successful for now
  };

  const processData = (data) => {
    const headers = data[0].map(header => header.trim());
    const contacts = data.slice(1).map(row => {
      return headers.reduce((contact, header, index) => {
        contact[header] = row[index];
        return contact;
      }, {});
    });
    saveContactsToServer(contacts);
  };
  const [isProcessing, setIsProcessing] = useState(false);

  const saveContactsToServer = async (contacts) => {
    if (isProcessing) return; // Prevent re-entry
    setIsProcessing(true);

    try {
      console.log('Saving contacts to the server...');
      for (const contact of contacts) {
        const formattedContact = {
          nom: contact.Nom,
          prenom: contact['Prénom'],
          genre: contact.Genre,
          mobile: contact.Mobile,
          email: contact.Email,
          gouvernorat: contact.Gouvernorat,
          delegation: contact.Delegation,
          star: contact['XP Points'],
          blacklisted: contact.Blacklisted,
          startupType: contact['Type de startup'],
          label: contact['Pré-Label / Label'],
          votreRole: contact['Votre Role'],
          projName: contact['Nom du Projet'],
          phaseDeProjet: contact['Phase du Projet'],
          entCapital: contact['Capitale d\'Entreprise'],
          formeJuridique: contact['Forme Juridique'],
          descriptionActivite: contact.Description,
          secteurActivite: contact['Secteur d\'Activité'],
          empTot: contact['Nb Employées totales'],
          nbF: contact['Nb Employées femmes'],
          projGouv: contact['Gouvernorat du Projet'],
          projDel: contact['Delegation du Projet'],
          prodMarch: contact['Produits sur Marché Oui/Non'],
          marche: contact['Marché du Produit'],
          chiffreAf: contact['Chiffre d\'Affaires'],
          typeFinance: contact['Type de Financement'],
          montantFinance: contact['Montant de Financement'],
          sourceFinance: contact['Source de Financement'],
          progAcc: contact['Programmes d\'accomp, Oui/Non'],
          progAccNom: contact['Nom du Programmes d\'accompagnement'],
          typeAcc: contact['Type d\'Accompagnement'],
          besoinAppui: contact['Besoins de Votre Projet'],
          siteWeb: contact['Lien Site Web'],
          socialMedia: contact['Lien Social Media'],
          typeFinanceRed: contact['Type de Financement Red'],
          montantFinanceRed: contact['Montant de Financement Red'],
          progAccRed: contact['Programmes d\'accomp Red, Oui/Non'],
          redProg: contact['Nom du Programmes d\'accompagnement Red'],
          typeAccRed: contact['Type d\'Accompagnement Red']
        };
        await axiosInstance.post('/createentrepreneurs', formattedContact);
        toast.success('Contacts saved successfully!');
        return
      }
    } catch (error) {
      console.error('Error saving contacts:', error);
      toast.error('Failed to save contacts.');
    }
  };

  return (
    <div>
      <CButton onClick={handleExport} color="primary" className="m-2">
        Export Template
      </CButton>
      <CButton onClick={handleImportClick} color="secondary" className="m-2">
        Import Data
      </CButton>
      <ToastContainer />
    </div>
  );
}
