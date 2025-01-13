import React, { useState } from 'react';
import {
  CCardBody,
  CCard,
  CCardHeader,
  CCardTitle,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormFeedback,
  CRow,
  CButton,
  CFormCheck,
} from '@coreui/react';
import EmailsPopUps from  './popouts/EmailsPopUps';
import axiosInstance from '../../axiosInstance';

import { ToastContainer, toast } from 'react-toastify'; // Assuming you are using react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; 

export default function EmailForm() {
  const [validated, setValidated] = useState(false);
  const [subject, setSubject] = useState('');
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');

  const [attachments, setAttachments] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Index of selected template

  const [isPopUpVisible, setPopUpVisible] = useState(false);
  const [isCCPopUpVisible, setCCPopUpVisible] = useState(false);
  const [recipients, setRecipients] = useState([]);
  const [ccRecipients, setCcRecipients] = useState([]);

  const [templateContent, setTemplateContent] = useState({
    title1: '',
    firstParagraph: '',
    firstButton: '',
    firstButtonLink: '',
    title2: '',
    SecondParagraph: '',
    title3: '',
    thirdParagraph: '',
    title4: '',
    fourthParagraph: '',
    logo: 'https://via.placeholder.com/290x150',
     image1: 'https://via.placeholder.com/600x300', // Default image URL
     image2: 'https://via.placeholder.com/290x150'
     ,image3: 'https://via.placeholder.com/290x150'
  });
  const Template1 = () => (
    <table
      align="center"
      role="presentation"
      border="0"
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={{
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <tbody>
        <tr>
          <td style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src={templateContent.image1}
                alt="Featured Article"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{templateContent.title1}</h3>
              <p style={{ marginBottom: '10px' }}>{templateContent.firstParagraph}</p>
              <a href={templateContent.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                {templateContent.firstButton}
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{templateContent.title2}</h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{templateContent.SecondParagraph}</p>
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image2}
                  alt="Picture 1"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <tr>
              <td align="center">
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{templateContent.title3}</h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{templateContent.thirdParagraph}</p>
                <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px auto', maxWidth: '80%' }} />
              </td>
            </tr>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              Regards,<br />Redstart
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
  const Template2 = () => (
    <table
      align="center"
      role="presentation"
      border="0"
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={{
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <tbody>
        <tr>
          <td align="center">
            <img
              src={templateContent.logo}
              alt="Logo"
              style={{ maxWidth: '100%', marginBottom: '10px' }}
            />
            <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Redstart Tunisie</h2>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
              slogen1 bird fathers and life is good
            </p>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px auto', maxWidth: '80%' }} />
          </td>
        </tr>
        <tr>
          <td style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src={templateContent.image1}
                alt="Featured Article"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{templateContent.title}</h3>
              <p style={{ marginBottom: '10px' }}>{templateContent.firstParagraph}</p>
              <a href={templateContent.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                {templateContent.firstButton}
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{templateContent.title2}</h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {templateContent.SecondParagraph}
                </p>
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image2}
                  alt="Picture 1"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image3}
                  alt="Picture 2"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'left' }}>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {templateContent.thirdParagraph}
                </p>
              </div>
            </div>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              Regards,<br />Redstart
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
  const Template3 = () => (
    <table
      align="center"
      role="presentation"
      border="0"
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={{
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <tbody>
        <tr>
          <td align="center">
            <img
              src={templateContent.logo}
              alt="Logo"
              style={{ maxWidth: '100%', marginBottom: '10px' }}
            />
            <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Redstart Tunisie</h2>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
              sden but amount paid.
            </p>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px auto', maxWidth: '80%' }} />
          </td>
        </tr>
        <tr>
          <td style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src={templateContent.image1}
                alt="Featured Article"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{templateContent.title1}</h3>
              <p style={{ marginBottom: '10px' }}>{templateContent.firstParagraph}</p>
              <a href={templateContent.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                {templateContent.firstButton}
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{templateContent.title2}</h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{templateContent.SecondParagraph}</p>
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image2}
                  alt="Picture 1"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image3}
                  alt="Picture 2"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'left' }}>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{templateContent.thirdParagraph}</p>
              </div>
            </div>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              Regards,<br />Redstart
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
  const Template4 = () => (
    <table
      align="center"
      role="presentation"
      border="0"
      cellSpacing="0"
      cellPadding="0"
      width="100%"
      style={{
        maxWidth: '600px',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <tbody>
        <tr>
          <td align="center">
            <img
              src={templateContent.logo}
              alt="Logo"
              style={{ maxWidth: '100%', marginBottom: '10px' }}
            />
            <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Redstart Tunisie</h2>
            <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
              The Ministry of Industry, which of the international order. Many
            </p>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px auto', maxWidth: '80%' }} />
          </td>
        </tr>
        <tr>
          <td style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '20px' }}>
              <img
                src={templateContent.image1}
                alt="Featured Article"
                style={{ maxWidth: '100%', borderRadius: '8px' }}
              />
              <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{templateContent.title1}</h3>
              <p style={{ marginBottom: '10px' }}>{templateContent.firstParagraph}</p>
              <a href={templateContent.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                {templateContent.firstButton}
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td align="center" style={{ padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{templateContent.title2}</h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{templateContent.SecondParagraph}</p>
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image2}
                  alt="Picture 1"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <div style={{ flex: '1', paddingRight: '10px', textAlign: 'center' }}>
                <img
                  src={templateContent.image3}
                  alt="Picture 2"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
              </div>
              <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'left' }}>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>{templateContent.thirdParagraph}</p>
              </div>
            </div>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px 0', maxWidth: '80%' }} />
            <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
              Regards,<br />Redstart
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
  const templates = [Template1, Template2, Template3, Template4];
  const handleTemplateSelect = (index) => {
    setSelectedTemplate(index);
    switch (index) {
      case 0: // Template1
        setTemplateContent({
          title1: 'Title 1 for Template 1',
          firstParagraph: 'First Paragraph for Template 1',
          firstButton: 'Button Text 1 for Template 1',
          firstButtonLink: 'https://example.com/link1',
          title2: 'Title 2 for Template 1',
          SecondParagraph: 'Second Paragraph for Template 1',
          title3: 'Title 3 for Template 1',
          thirdParagraph: 'Third Paragraph for Template 1',
          title4: 'Title 4 for Template 1',
          fourthParagraph: 'Fourth Paragraph for Template 1',
           image1: 'https://via.placeholder.com/600x300', // Default image URL
           image2: 'https://via.placeholder.com/290x150'
        });
        break;
      case 1: // Template2
        setTemplateContent({
          title1: 'Title 1 for Template 2',
          firstParagraph: 'First Paragraph for Template 2',
          firstButton: 'Button Text 2 for Template 2',
          firstButtonLink: 'https://example.com/link2',
          title2: 'Title 2 for Template 2',
          SecondParagraph: 'Second Paragraph for Template 2',
          title3: 'Title 3 for Template 2',
          thirdParagraph: 'Third Paragraph for Template 2',
          title4: 'Title 4 for Template 2',
          fourthParagraph: 'Fourth Paragraph for Template 2',
           logo: 'https://via.placeholder.com',
           image1: 'https://via.placeholder.com/600x300', // Default image URL
           image2: 'https://via.placeholder.com/290x150',
           image3: 'https://via.placeholder.com/290x150'
        });
        break;
      case 2: // Template3
        setTemplateContent({
          title1: 'Title 1 for Template 3',
          firstParagraph: 'First Paragraph for Template 3',
          firstButton: 'Button Text 3 for Template 3',
          firstButtonLink: 'https://example.com/link3',
          title2: 'Title 2 for Template 3',
          SecondParagraph: 'Second Paragraph for Template 3',
          title3: 'Title 3 for Template 3',
          thirdParagraph: 'Third Paragraph for Template 3',
          title4: 'Title 4 for Template 3',
          fourthParagraph: 'Fourth Paragraph for Template 3',
          logo: 'https://via.placeholder.com',
           image1: 'https://via.placeholder.com/600x300', // Default image URL
           image2: 'https://via.placeholder.com/290x150',
           image3: 'https://via.placeholder.com/290x150'
        });
        break;
      case 3: // Template4
        setTemplateContent({
          title1: 'Title 1 for Template 4',
          firstParagraph: 'First Paragraph for Template 4',
          firstButton: 'Button Text 4 for Template 4',
          firstButtonLink: 'https://example.com/link4',
          title2: 'Title 2 for Template 4',
          SecondParagraph: 'Second Paragraph for Template 4',
          title3: 'Title 3 for Template 4',
          thirdParagraph: 'Third Paragraph for Template 4',
          title4: 'Title 4 for Template 4',
          fourthParagraph: 'Fourth Paragraph for Template 4',
          logo: 'https://via.placeholder.com',
           image1: 'https://via.placeholder.com/600x300', // Default image URL
           image2: 'https://via.placeholder.com/290x150',
           image3: 'https://via.placeholder.com/290x150'
        });
        break;
      default:
        setTemplateContent({});
        break;
    }
  };
  const handleTemplateContentChange = (key, value) => {
    setTemplateContent((prevContent) => ({
      ...prevContent,
      [key]: value,
    }));
  };
  
  const generateTemplateHTML = (selectedTemplate, templateContent) => {
    switch (selectedTemplate) {
      case 'Template1':
        return `
          <table
            align="center"
            role="presentation"
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="100%"
            style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);"
          >
            <tbody>
              <tr>
                <td style="color: #333; font-size: 16px; line-height: 1.6;">
                  <div style="margin-bottom: 20px;">
                    <img src="${templateContent.image1}" alt="Featured Article" style="max-width: 100%; border-radius: 8px;" />
                    <h3 style="font-size: 20px; margin-bottom: 10px;">${templateContent.title1}</h3>
                    <p style="margin-bottom: 10px;">${templateContent.firstParagraph}</p>
                    <a href="${templateContent.firstButtonLink}" style="color: #007bff; text-decoration: none;">${templateContent.firstButton}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 0 20px;">
                  <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                    <div style="flex: 1; padding-right: 10px; text-align: left;">
                      <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">${templateContent.title2}</h2>
                      <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">${templateContent.SecondParagraph}</p>
                    </div>
                    <div style="flex: 1; padding-left: 10px; text-align: center;">
                      <img src="${templateContent.image2}" alt="Picture 1" style="max-width: 100%; border-radius: 8px;" />
                    </div>
                  </div>
                  <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0; max-width: 80%;" />
                  <tr>
                    <td align="center">
                      <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">${templateContent.title3}</h2>
                      <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">${templateContent.thirdParagraph}</p>
                      <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px auto; max-width: 80%;" />
                    </td>
                  </tr>
                  <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0; max-width: 80%;" />
                  <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    Regards,<br />Redstart
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        `;
      
      case 'Template2':
        return `
          <table
            align="center"
            role="presentation"
            border="0"
            cellSpacing="0"
            cellPadding="0"
            width="100%"
            style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);"
          >
            <tbody>
              <tr>
                <td align="center">
                  <img src="${templateContent.logo}" alt="Logo" style="max-width: 100%; margin-bottom: 10px;" />
                  <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Redstart Tunisie</h2>
                  <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                    slogen1 bird fathers and life is good
                  </p>
                  <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px auto; max-width: 80%;" />
                </td>
              </tr>
              <tr>
                <td style="color: #333; font-size: 16px; line-height: 1.6;">
                  <div style="margin-bottom: 20px;">
                    <img src="${templateContent.image1}" alt="Featured Article" style="max-width: 100%; border-radius: 8px;" />
                    <h3 style="font-size: 20px; margin-bottom: 10px;">${templateContent.title}</h3>
                    <p style="margin-bottom: 10px;">${templateContent.firstParagraph}</p>
                    <a href="${templateContent.firstButtonLink}" style="color: #007bff; text-decoration: none;">${templateContent.firstButton}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 0 20px;">
                  <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                    <div style="flex: 1; padding-right: 10px; text-align: left;">
                      <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">${templateContent.title2}</h2>
                      <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        ${templateContent.SecondParagraph}
                      </p>
                    </div>
                    <div style="flex: 1; padding-left: 10px; text-align: center;">
                      <img src="${templateContent.image2}" alt="Picture 1" style="max-width: 100%; border-radius: 8px;" />
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: 20px;">
                    <div style="flex: 1; padding-right: 10px; text-align: center;">
                      <img src="${templateContent.image3}" alt="Picture 2" style="max-width: 100%; border-radius: 8px;" />
                    </div>
                    <div style="flex: 1; padding-left: 10px; text-align: left;">
                      <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        ${templateContent.thirdParagraph}
                      </p>
                    </div>
                  </div>
                  <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0; max-width: 80%;" />
                  <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0; max-width: 80%;" />
                  <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                    Regards,<br />Redstart
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        `;
        case 'Template3':
          return `
            <table
              align="center"
              role="presentation"
              border="0"
              cellSpacing="0"
              cellPadding="0"
              width="100%"
              style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);"
            >
              <tbody>
                <tr>
                  <td align="center">
                    <img src="${templateContent.logo}" alt="Logo" style="max-width: 100%; margin-bottom: 10px;" />
                    <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Redstart Tunisie</h2>
                    <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                      sden but amount paid.
                    </p>
                    <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px auto; max-width: 80%;" />
                  </td>
                </tr>
                <tr>
                  <td style="color: #333; font-size: 16px; line-height: 1.6;">
                    <div style="margin-bottom: 20px;">
                      <img src="${templateContent.image1}" alt="Featured Article" style="max-width: 100%; border-radius: 8px;" />
                      <h3 style="font-size: 20px; margin-bottom: 10px;">${templateContent.title}</h3>
                      <p style="margin-bottom: 10px;">${templateContent.firstParagraph}</p>
                      <a href="${templateContent.firstButtonLink}" style="color: #007bff; text-decoration: none;">${templateContent.firstButton}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 0 20px;">
                    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                      <div style="flex: 1; padding-right: 10px; text-align: left;">
                        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">${templateContent.title2}</h2>
                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                          ${templateContent.SecondParagraph}
                        </p>
                      </div>
                      <div style="flex: 1; padding-left: 10px; text-align: center;">
                        <img src="${templateContent.image2}" alt="Picture 1" style="max-width: 100%; border-radius: 8px;" />
                      </div>
                    </div>
                    <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: 20px;">
                      <div style="flex: 1; padding-right: 10px; text-align: center;">
                        <img src="${templateContent.image3}" alt="Picture 2" style="max-width: 100%; border-radius: 8px;" />
                      </div>
                      <div style="flex: 1; padding-left: 10px; text-align: left;">
                        <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                          ${templateContent.thirdParagraph}
                        </p>
                      </div>
                    </div>
                    <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0; max-width: 80%;" />
                    <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                      Regards,<br />Redstart
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          `;
          case 'Template4':
            return `
              <table
                align="center"
                role="presentation"
                border="0"
                cellSpacing="0"
                cellPadding="0"
                width="100%"
                style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);"
              >
                <tbody>
                  <tr>
                    <td align="center">
                      <img src="${templateContent.logo}" alt="Logo" style="max-width: 100%; margin-bottom: 10px;" />
                      <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">Redstart Tunisie</h2>
                      <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                        sden but amount paid.
                      </p>
                      <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px auto; max-width: 80%;" />
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #333; font-size: 16px; line-height: 1.6;">
                      <div style="margin-bottom: 20px;">
                        <img src="${templateContent.image1}" alt="Featured Article" style="max-width: 100%; border-radius: 8px;" />
                        <h3 style="font-size: 20px; margin-bottom: 10px;">${templateContent.title}</h3>
                        <p style="margin-bottom: 10px;">${templateContent.firstParagraph}</p>
                        <a href="${templateContent.firstButtonLink}" style="color: #007bff; text-decoration: none;">${templateContent.firstButton}</a>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding: 0 20px;">
                      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
                        <div style="flex: 1; padding-right: 10px; text-align: left;">
                          <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">${templateContent.title2}</h2>
                          <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                            ${templateContent.SecondParagraph}
                          </p>
                        </div>
                        <div style="flex: 1; padding-left: 10px; text-align: center;">
                          <img src="${templateContent.image2}" alt="Picture 1" style="max-width: 100%; border-radius: 8px;" />
                        </div>
                      </div>
                      <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin-top: 20px;">
                        <div style="flex: 1; padding-right: 10px; text-align: center;">
                          <img src="${templateContent.image3}" alt="Picture 2" style="max-width: 100%; border-radius: 8px;" />
                        </div>
                        <div style="flex: 1; padding-left: 10px; text-align: left;">
                          <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                            ${templateContent.thirdParagraph}
                          </p>
                        </div>
                      </div>
                      <hr style="border: none; border-bottom: 1px solid #ddd; margin: 20px 0; max-width: 80%;" />
                      <p style="color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                        Regards,<br />Redstart
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            `;
    }};
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setValidated(true);
  };
  // Function to handle the selection of recipients
  const handleRecipientsSelection = (selectedEmails) => {
    setRecipients(selectedEmails);
  };
  // Function to handle the selection of CC recipients
  const handleCcRecipientsSelection = (selectedEmails) => {
    setCcRecipients(selectedEmails);
  };
  // Function to open the pop-up
  const openRecipientsPopUp = () => {
    setPopUpVisible(true);
  };
  // Function to close the pop-up
  const closeRecipientsPopUp = () => {
    setPopUpVisible(false);
  };
  const openCCRecipientsPopUp = () => {
    setCCPopUpVisible(true);
  };
  // Function to close the pop-up
  const closeCCRecipientsPopUp = () => {
    setCCPopUpVisible(false);
  };
  let SelectedTemplateComponent = null;
  if (selectedTemplate !== null) {
    SelectedTemplateComponent = templates[selectedTemplate];
  }
  const handleFileChange = (event, fileType) => {
    const file = event.target.files[0];
    // Example of how you might handle different file types
    if (file) {
      switch (fileType) {
        case 'logo':
          setTemplateContent({
            ...templateContent,
            logo: file,
          });
          break;
        case 'image1':
          setTemplateContent({
            ...templateContent,
            image1: file,
          });
          break;
        case 'image2':
          setTemplateContent({
            ...templateContent,
            image2: file,
          });
          break;
        default:
          break;
      }
    } else {
      console.error('No file selected');
    }
  
  };
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            <CCardTitle>Email Composition</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="subject">Subject</CFormLabel>
                <CFormInput
                  type="text"
                  id="subject"
                  minLength={8}
                  required
                  placeholder="Enter subject"
                  aria-describedby="subjectFeedback"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <CFormFeedback id="subjectFeedback" invalid>
                  Please enter a valid subject (minimum 8 characters).
                </CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel htmlFor="to">To</CFormLabel> <br/>
                <CButton color="primary" 
                onClick={openRecipientsPopUp}
                onChange={() => setTo(recipients)}
                >
                  Select Recipients
                </CButton>
                <CFormFeedback id="toFeedback" invalid>
                  Please enter a valid recipient (minimum 1 email).
                </CFormFeedback>
              </CCol>
              <CCol>
                <CFormLabel htmlFor="cc">CC</CFormLabel><br/>
                <CButton color="primary" 
                onClick={() => openCCRecipientsPopUp()}
                onChange={() => setCc(ccRecipients)}
                >
                  Select CC Recipients
                </CButton>
                <CFormFeedback id="ccFeedback" invalid>
                  Please enter valid CC recipients (minimum 1 email).
                </CFormFeedback>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <CFormLabel>Select Template</CFormLabel>
                <div style={{ maxHeight: '400px', overflowX: 'auto' }}>
                  <CRow className="flex-nowrap">
                    {templates.map((template, index) => (
                      <CCol key={index} xs="6" sm="4" md="3" lg="3" className="m-3 p-0">
                        <div className="border rounded">
                          <CFormCheck
                            type="radio"
                            name="templateRadio"
                            id={`templateRadio${index}`}
                            label={`Template ${index + 1}`}
                            checked={selectedTemplate === index}
                            onChange={() => handleTemplateSelect(index)}
                          />
                          {/* Pass image prop if needed */}
                        </div>
                      </CCol>
                    ))}
                  </CRow>
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol>
                <br/>
                {selectedTemplate !== null && (
        <>
          {/* Common Inputs */}
          <CFormLabel htmlFor="title1">Title 1</CFormLabel>
          <CFormInput
            type="text"
            id="title1"
            placeholder={`Enter title 1 for ${selectedTemplate}`}
            value={templateContent.title1}
            onChange={(e) => handleTemplateContentChange('title1', e.target.value)}
          />

          <CFormLabel htmlFor="firstParagraph">First Paragraph</CFormLabel>
          <CFormTextarea
            id="firstParagraph"
            placeholder={`Enter first paragraph for ${selectedTemplate}`}
            value={templateContent.firstParagraph}
            onChange={(e) => handleTemplateContentChange('firstParagraph', e.target.value)}
          />

          <CFormLabel htmlFor="firstButton">First Button</CFormLabel>
          <CFormInput
            type="text"
            id="firstButton"
            placeholder={`Enter first button text for ${selectedTemplate}`}
            value={templateContent.firstButton}
            onChange={(e) => handleTemplateContentChange('firstButton', e.target.value)}
          />

          <CFormLabel htmlFor="firstButtonLink">First Button Link</CFormLabel>
          <CFormInput
            type="text"
            id="firstButtonLink"
            placeholder={`Enter first button link for ${selectedTemplate}`}
            value={templateContent.firstButtonLink}
            onChange={(e) => handleTemplateContentChange('firstButtonLink', e.target.value)}
          />
          {/* Template-specific Inputs */}
          {selectedTemplate == 0 && (
            <>
              <CFormLabel htmlFor="title2">Title 2 for Template 1</CFormLabel>
              <CFormInput
                type="text"
                id="title2"
                placeholder="Enter title 2 for Template 1"
                value={templateContent.title2}
                onChange={(e) => handleTemplateContentChange('title2', e.target.value)}
              />
              <CFormLabel htmlFor="secondParagraph">Second Paragraph for Template 1</CFormLabel>
              <CFormTextarea
                id="secondParagraph"
                placeholder="Enter second paragraph for Template 1"
                value={templateContent.SecondParagraph}
                onChange={(e) => handleTemplateContentChange('SecondParagraph', e.target.value)}
              />
              <CFormLabel htmlFor="secondParagraph">title 3 for Template 1</CFormLabel>
              <CFormTextarea
                id="title3"
                placeholder="Enter title for Template 1"
                value={templateContent.title3}
                onChange={(e) => handleTemplateContentChange('title3', e.target.value)}
              />
              <CFormLabel htmlFor="thirdParagraph">title 3 for Template 1</CFormLabel>
              <CFormTextarea
                id="thirdParagraph"
                placeholder="Enter title for Template 1"
                value={templateContent.thirdParagraph}
                onChange={(e) => handleTemplateContentChange('thirdParagraph', e.target.value)}
              />
              <CFormLabel htmlFor="image1">image1 for Template 1</CFormLabel>
              <CFormInput
              type='file'
              accept='image/*'
                id="image1"
                onChange={(e) => handleFileChange(e,'image1')} 
                />
              <CFormLabel htmlFor="image2">image2 for Template 1</CFormLabel>
              <CFormInput
              type='file'
              accept='image/*'
                id="image2"
                onChange={(e) => handleFileChange(e,'image2')} 
                />
            </>
          )}
          {selectedTemplate ==1&& (
            <>
              <CFormLabel htmlFor="title2">Title 2 for Template 2</CFormLabel>
              <CFormInput
                type="text"
                id="title2"
                placeholder="Enter title 2 for Template 2"
                value={templateContent.title2}
                onChange={(e) => handleTemplateContentChange('title2', e.target.value)}
              />
              <CFormLabel htmlFor="secondParagraph">Second Paragraph for Template 2</CFormLabel>
              <CFormTextarea
                id="secondParagraph"
                placeholder="Enter second paragraph for Template 1"
                value={templateContent.SecondParagraph}
                onChange={(e) => handleTemplateContentChange('SecondParagraph', e.target.value)}
              />
              <CFormLabel htmlFor="thirdParagraph">paragraph  for Template 2</CFormLabel>
              <CFormTextarea
                id="thirdParagraph"
                placeholder="Enter title for Template 1"
                value={templateContent.thirdParagraph}
                onChange={(e) => handleTemplateContentChange('thirdParagraph', e.target.value)}
                />
              <CFormLabel htmlFor="image1">logo</CFormLabel>
                <CFormInput
                  type='file'
                  accept='image/*'
                  id="logo"
                  onChange={(e) => handleFileChange(e,'logo')} 
                  />
                <CFormLabel htmlFor="image1">image1</CFormLabel>
                <CFormInput
                  type='file'
                  accept='image/*'
                  id="image1"
                  onChange={(e) => handleFileChange(e,'image1')} 
                  />
                <CFormLabel htmlFor="image2">image2 </CFormLabel>
                <CFormInput
                  type='file'
                  accept='image/*'
                  id="image2"
                  onChange={(e) => handleFileChange(e,'image2')} 
                />
                <CFormLabel htmlFor="image2">image 3</CFormLabel>
                <CFormInput
                  type='file'
                  accept='image/*'
                  id="image3"
                  onChange={(e) => handleFileChange(e,'image3')} 
                />
            </>
          )}
          {selectedTemplate ==2 && (
            <>
              <CFormLabel htmlFor="title2">Title 2 for Template 3</CFormLabel>
              <CFormInput
                type="text"
                id="title2"
                placeholder="Enter title 2 for Template 3"
                value={templateContent.title2}
                onChange={(e) => handleTemplateContentChange('title2', e.target.value)}
              />

              <CFormLabel htmlFor="secondParagraph">Second Paragraph for Template 3</CFormLabel>
              <CFormTextarea
                id="secondParagraph"
                placeholder="Enter second paragraph for Template 3"
                value={templateContent.SecondParagraph}
                onChange={(e) => handleTemplateContentChange('SecondParagraph', e.target.value)}
              />
               <CFormLabel htmlFor="thirdParagraph">third Paragraph for Template 3</CFormLabel>
              <CFormTextarea
                id="thirdParagraph"
                placeholder="Enter second paragraph for Template 3"
                value={templateContent.thirdParagraph}
                onChange={(e) => handleTemplateContentChange('thirdParagraph', e.target.value)}
              />
              <CFormLabel htmlFor="image1">logo</CFormLabel>
              <CFormInput
              type='file'
              accept='image/*'
                id="logo"
                onChange={(e) => handleFileChange(e,'logo')} 
                />
              <CFormLabel htmlFor="image1">image1</CFormLabel>
              <CFormInput
              type='file'
              accept='image/*'
                id="image1"
                onChange={(e) => handleFileChange(e,'image1')} 
                />
              <CFormLabel htmlFor="image2">image2 </CFormLabel>
              <CFormInput
                type='file'
                accept='image/*'
                id="image2"
                onChange={(e) => handleFileChange(e,'image2')} 
              />
              <CFormLabel htmlFor="image2">image 3</CFormLabel>
              <CFormInput
                type='file'
                accept='image/*'
                  id="image3"
                  onChange={(e) => handleFileChange(e,'image3')} 
              />
            </>
          )}
          {selectedTemplate ==3 && (
            <>
              <CFormLabel htmlFor="title2">Title 2 for Template 4</CFormLabel>
              <CFormInput
                type="text"
                id="title2"
                placeholder="Enter title 2 for Template 4"
                value={templateContent.title2}
                onChange={(e) => handleTemplateContentChange('title2', e.target.value)}
              />
               <CFormLabel htmlFor="SecondParagraph">paragraph 2 for Template 4</CFormLabel>
              <CFormInput
                type="text"
                id="SecondParagraph"
                placeholder="Enter pargraph 2 for Template 4"
                value={templateContent.SecondParagraph}
                onChange={(e) => handleTemplateContentChange('SecondParagraph', e.target.value)}
              />
              <CFormLabel htmlFor="thirdParagraph">paragraph 3 for Template 4</CFormLabel>
              <CFormInput
                type="text"
                id="thirdParagraph"
                placeholder="Enter pargraph 2 for Template 4"
                value={templateContent.thirdParagraph}
                onChange={(e) => handleTemplateContentChange('thirdParagraph', e.target.value)}
              />
            </>
          )}
        </>
      )}
                <CFormFeedback id="bodyFeedback" invalid>
                  Please enter a valid email body.
                </CFormFeedback>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CButton color="primary" onClick={handleSubmit}>
                  Submit
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>
            <CCardTitle>Email Preview</CCardTitle>
          </CCardHeader>
          <CCardBody>
            {selectedTemplate !== null && (
              <SelectedTemplateComponent content={templateContent} />
            )}
          </CCardBody>
        </CCard>
        <EmailsPopUps
          visible={isPopUpVisible}
          onClose={closeRecipientsPopUp}
          onSave={handleRecipientsSelection}
        />
        {/* Pop-Up Component for selecting CC Recipients */}
        <EmailsPopUps
          visible={isCCPopUpVisible}
          onClose={closeCCRecipientsPopUp}
          onSave={handleCcRecipientsSelection}
        />
      </CCol>
      <ToastContainer />
    </CRow>
);
}