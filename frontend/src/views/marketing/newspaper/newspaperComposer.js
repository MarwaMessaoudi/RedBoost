import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  CForm, 
  CFormLabel, 
  CFormInput, 
  CButton, 
  CContainer, 
  CCard, 
  CCardBody, 
  CFormCheck, 
  CRow, 
  CCol, 
  CCardHeader
} from '@coreui/react';
import axiosInstance from '../../../axiosInstance';
import '@coreui/coreui/dist/css/coreui.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AIComponent = () => {
  const categories = {
    "Empower Her": "danger",
    "Tech": "success",
    "Entrepreneurship": "warning",
    "Green": "info"
  };
  const [selectedCategory, setSelectedCategory] = useState('');
  const [target, setTarget] = useState([]);
  const [gender, setGenders] = useState([]);
  const [region, setRegions] = useState([]);
  const [language, setLanguage] = useState('english');
  const [emails,setEmails]= useState([]);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState([]);
  const [n, setN] = useState(1000);
  const [logo, setLogo] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [generatedTemplate, setGeneratedTemplate] = useState(null);
  const [validity, setValidity] = useState({
    target: true,
    subject: true,
    category: true,
    n: true,
    logo: true,
    image1: true,
    image2: true,
    image3: true
  });
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Generate the HTML template using generatedTemplate state
    const emailHTML = `
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
                src=${generatedTemplate.logo}
                alt="Logo"
                style={{ maxWidth: '100%', marginBottom: '10px' }}
              />
              <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>Redstart Tunisie</h2>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                ${generatedTemplate.slogan}
              </p>
              <hr style={{ border: 'none', borderBottom: '1px solid #ddd', margin: '20px auto', maxWidth: '80%' }} />
            </td>
          </tr>
          <tr>
            <td style={{ color: '#333', fontSize: '16px', lineHeight: '1.6' }}>
              <div style={{ marginBottom: '20px' }}>
                <img
                  src=${generatedTemplate.image1}
                  alt="Featured Article"
                  style={{ maxWidth: '100%', borderRadius: '8px' }}
                />
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>${generatedTemplate.title}</h3>
                <p style={{ marginBottom: '10px' }}>${generatedTemplate.firstParagraph}</p>
                <a href=${generatedTemplate.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                  ${generatedTemplate.firstButton}
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td align="center" style={{ padding: '0 20px' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                  <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>${generatedTemplate.title2}</h2>
                  <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                    ${generatedTemplate.secondParagraph}
                  </p>
                </div>
                <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                  <img
                    src=${generatedTemplate.image2}
                    alt="Picture 1"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ flex: '1', paddingRight: '10px', textAlign: 'center' }}>
                  <img
                    src=${generatedTemplate.image3}
                    alt="Picture 2"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                </div>
                <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'left' }}>
                  <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                    ${generatedTemplate.thirdParagraph}
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
    `;
  
    // Example of sending emailHTML using axiosInstance
    try {
      const response = await axiosInstance.post('/sendEmail', { html: emailHTML });
  
      // Handle success
      console.log('Email sent successfully:', response.data);
      // Optionally, reset form or do other actions after successful submission
  
      // Show success toast notification
      toast.success('Email sent successfully');
    } catch (error) {
      // Handle error
      console.error('Error sending email:', error);
      // Optionally, show error toast notification
      toast.error('Error sending email. Please try again later.');
    }
  };
  const handleCheckboxChange = (setState, currentState, value) => {
    if (['femme', 'homme'].includes(value)) {
      setGenders((prevState) =>
        currentState.includes(value)
          ? prevState.filter((item) => item !== value)
          : [...prevState, value]
      );
    } else if (tunisianRegions.includes(value)) {
      setRegions((prevState) =>
        currentState.includes(value)
          ? prevState.filter((item) => item !== value)
          : [...prevState, value]
      );
    }else if (['English', 'french', 'spanich', 'arabic'].includes(value)){
      setLanguage(value);
    }
    
    setState((prevState) =>
      currentState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };
  
  const renderPreview = () => (
    <div>
      <h2>Preview Emails</h2>
      {emails && emails.length > 0 ? (
        <ul>
          {emails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      ) : (
        <p>No emails to display.</p>
      )}
    </div>
  );
  
  

  const showToastError = (message) => {
    toast.error(message, {
     
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newValidity = { ...validity };

    if (target.length === 0) {
      newValidity.target = false;
      isValid = false;
    } else {
      newValidity.target = true;
    }

    if (!subject) {
      newValidity.subject = false;
      isValid = false;
    } else {
      newValidity.subject = true;
    }

    if (category.length === 0) {
      newValidity.category = false;
      isValid = false;
    } else {
      newValidity.category = true;
    }

    if (!n || isNaN(n) || n <= 0) {
      newValidity.n = false;
      isValid = false;
    } else {
      newValidity.n = true;
    }

    if (!logo || !isValidURL(logo)) {
      newValidity.logo = false;
      isValid = false;
    } else {
      newValidity.logo = true;
    }

    if (!image1 || !isValidURL(image1)) {
      newValidity.image1 = false;
      isValid = false;
    } else {
      newValidity.image1 = true;
    }

    if (!image2 || !isValidURL(image2)) {
      newValidity.image2 = false;
      isValid = false;
    } else {
      newValidity.image2 = true;
    }

    if (!image3 || !isValidURL(image3)) {
      newValidity.image3 = false;
      isValid = false;
    } else {
      newValidity.image3 = true;
    }

    if (!isValid) {
      setError('All fields are required and must be valid.');
      setValidity(newValidity);
      showToastError('All fields are required and must be valid.');
      return;
    }

    setError('');
    setValidity(newValidity);

    const API_KEY = 'AIzaSyDbXHLNx8MT8mdtu87t8sr4T8Ni18z0lhE';
    if (!API_KEY) {
      console.error('API key not found. Please set your Google API key.');
      showToastError('API key not found. Please set your Google API key.');
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
      //ai part :
      const prompt = `Generate template in ${language} ( also make sure theres no extra symbles or explication of anything the resoponse is one json ready to be treated no back tics or any symbols except { and })for ${target.join(', ')}, ${subject}, ${category.join(', ')} and it should be at least ${n} characters. It should be in this format containing template content: {
        title1: '',
        firstParagraph: '',
        firstButton: '',
        firstButtonLink: '',
        title2: '',
        SecondParagraph: '',
        title3: '',
        thirdParagraph: '',
        logo: '${logo}',
        image1: '${image1}',
        image2: '${image2}',
        image3: '${image3}'
      } also make sure theres no extra symbles or explication of anything the resoponse is one json ready to be treated`;

      const result = await model.generateContent(prompt);
      console.log('Generated result:', result);

      if (result && result.response && result.response.text) {
        
        setEmails()
        const generatedText = await result.response.text();
        console.log('Generated text:', generatedText);
        const generatedTemplate = JSON.parse(generatedText);
        setGeneratedTemplate(generatedTemplate);
      } else {
        console.error('Empty response or missing data:', result);
        showToastError('Empty response or missing data.');
      }
      //emails :
      try {
        // Example: Fetching filtered entrepreneurs' emails
        const response = await axiosInstance.get('/filterEntrepreneurs', {
          params: {
            gender: gender, // Example gender parameter
            region: region  // Example region parameter
          }
        });
    
        setEmails(response.data); // Setting emails state with fetched data
      } catch (error) {
        toast.error('Error fetching filtered entrepreneurs');
        // Handle error as needed
      }
      console.log(emails)
    } catch (error) {
      console.error('Error generating template:', error);
      showToastError('Error generating template.');
    }

  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const tunisianRegions = [
    'Tunis', 'Sfax', 'Sousse', 'Gabès', 'Bizerte', 'Ariana', 'Gafsa', 
    'Kairouan', 'Nabeul', 'Monastir', 'Zaghouan', 'Medenine', 'Kasserine', 
    'Mahdia', 'Manouba', 'Ben Arous', 'Kebili', 'Siliana', 'Jendouba', 
    'Tozeur', 'Kef', 'Sidi Bouzid', 'Tataouine', 'Beja'
  ];

  return (
    <CContainer>
      <CRow>
        <CCol md="6">
          <CCard>
            <CCardHeader>
              <h2>Generate Template</h2>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CFormLabel htmlFor="subject">Subject *</CFormLabel>
                <CFormInput
                  type="text"
                  id="subject"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`form-control ${validity.subject ? '' : 'is-invalid'}`}
                  required
                />
                {!validity.subject && (
                  <div className="invalid-feedback">Please enter a subject.</div>
                )}
                
                <CRow>
                  <CCol>
                    <CFormLabel>Target *</CFormLabel>
                    {['femme', 'homme', 'Entrepreneurs', 'Investors', 'Coaches'].map((targetOption) => (
                      <CFormCheck
                        key={targetOption}
                        type="checkbox"
                        id={`target-${targetOption.toLowerCase()}`}
                        label={targetOption}
                        name="target"
                        checked={target.includes(targetOption)}
                        onChange={() => handleCheckboxChange(setTarget, target, targetOption)}
                        className={`form-check-input ${validity.target ? '' : 'is-invalid'}`}
                      />
                    ))}
                    
                    {!validity.target && (
                      <div className="invalid-feedback">Please select at least one target.</div>
                    )}
                  </CCol>
                  <CCol>
                    <CFormLabel>Category *</CFormLabel>
                    {Object.keys(categories).map((category, index) => (
                      <CFormCheck
                        key={index}
                        type="radio"
                        id={`categoryRadio${index}`}
                        name={category}
                        label={category}
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className={`form-check-input text-${categories[category]} mb-2`}
                      />
                    ))}
                    {!validity.category && (
                      <div className="invalid-feedback">Please select a category.</div>
                    )}
                    </CCol></CRow>
<CRow><CCol>
                    <div className="mt-3" style={{ maxHeight: '150px', overflowY: 'auto' }}>
                      <CFormLabel>Tunisian Regions</CFormLabel>
                      {tunisianRegions.map((region) => (
                        <CFormCheck
                          key={region}
                          type="checkbox"
                          id={`region-${region}`}
                          label={region}
                          name="tunisianRegions"
                          checked={category.includes(region)}
                          onChange={() => handleCheckboxChange(setCategory, category, region)}
                          className={`form-check-input ${validity.category ? '' : 'is-invalid'}`}
                        />
                      ))}
                    </div>
                  </CCol>
                  <CCol>
                  <CFormLabel>language</CFormLabel>
                    {['English', 'french', 'spanich', 'arabic'].map((targetOption) => (
                      <CFormCheck
                        key={targetOption}
                        type="radio"
                        id={`target-${targetOption.toLowerCase()}`}
                        label={targetOption}
                        name="target"
                        checked={target.includes(targetOption)}
                        onChange={() => handleCheckboxChange(setTarget, target, targetOption)}
                        className={`form-check-input ${validity.target ? '' : 'is-invalid'}`}
                      />
                    ))}
                  </CCol>
                </CRow>
                <CFormLabel>N *</CFormLabel>
                <CFormInput
                  type="number"
                  placeholder="Enter N"
                  value={n}
                  onChange={(e) => setN(parseInt(e.target.value))}
                  className={`form-control ${validity.n ? '' : 'is-invalid'}`}
                  required
                />
                {!validity.n && (
                  <div className="invalid-feedback">Please enter a valid number for N.</div>
                )}

                <CFormLabel>Logo URL *</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter logo URL"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className={`form-control ${validity.logo ? '' : 'is-invalid'}`}
                  required
                />
                {!validity.logo && (
                  <div className="invalid-feedback">Please enter a valid URL for the logo.</div>
                )}

                <CFormLabel>Image 1 URL *</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter image 1 URL"
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                  className={`form-control ${validity.image1 ? '' : 'is-invalid'}`}
                  required
                />
                {!validity.image1 && (
                  <div className="invalid-feedback">Please enter a valid URL for image 1.</div>
                )}

                <CFormLabel>Image 2 URL *</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter image 2 URL"
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  className={`form-control ${validity.image2 ? '' : 'is-invalid'}`}
                  required
                />
                {!validity.image2 && (
                  <div className="invalid-feedback">Please enter a valid URL for image 2.</div>
                )}

                <CFormLabel>Image 3 URL *</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Enter image 3 URL"
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                  className={`form-control ${validity.image3 ? '' : 'is-invalid'}`}
                  required
                />
                {!validity.image3 && (
                  <div className="invalid-feedback">Please enter a valid URL for image 3.</div>
                )}
                 <CButton type="submit" color="primary" >
                  send emails
                </CButton>
                <CButton type="button" color="secondary" className="mt-3" onClick={handlePreview}>
                  preview
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md="6">
          {generatedTemplate && (
            <CCard>
              <CCardHeader>
                <h2>Generated Template</h2>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol>
                 {renderPreview()}
                  </CCol>
                </CRow>
              <CRow>
                <CCol>
  {generatedTemplate && (
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
                  src={generatedTemplate.logo}
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
                    src={generatedTemplate.image1}
                    alt="Featured Article"
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  />
                  <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{generatedTemplate.title}</h3>
                  <p style={{ marginBottom: '10px' }}>{generatedTemplate.firstParagraph}</p>
                  <a href={generatedTemplate.firstButtonLink} style={{ color: '#007bff', textDecoration: 'none' }}>
                    {generatedTemplate.firstButton}
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td align="center" style={{ padding: '0 20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: '1', paddingRight: '10px', textAlign: 'left' }}>
                    <h2 style={{ color: '#333', fontSize: '24px', marginBottom: '10px' }}>{generatedTemplate.title2}</h2>
                    <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                      {generatedTemplate.SecondParagraph}
                    </p>
                  </div>
                  <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'center' }}>
                    <img
                      src={generatedTemplate.image2}
                      alt="Picture 1"
                      style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <div style={{ flex: '1', paddingRight: '10px', textAlign: 'center' }}>
                    <img
                      src={generatedTemplate.image3}
                      alt="Picture 2"
                      style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                  </div>
                  <div style={{ flex: '1', paddingLeft: '10px', textAlign: 'left' }}>
                    <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                      {generatedTemplate.thirdParagraph}
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
    
  )}</CCol>
</CRow>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>
      <ToastContainer />
    </CContainer>
  );
};

export default AIComponent;
