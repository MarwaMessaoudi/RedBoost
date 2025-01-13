import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CFormCheck, CFormInput, CCol, CRow, CButton } from '@coreui/react';
import axios from 'axios'; // Import axios for making HTTP requests

const AddCategoryPage = () => {
  const [formData, setFormData] = useState({
    categoryTitle: '',
    selectedIcon: '',
    field1: '',
    field2: '',
    field3: '',
    field4: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend
      const response = await axios.post('YOUR_BACKEND_ENDPOINT', formData);
      console.log(response.data); // Log response from backend
      // Reset form data after successful submission
      setFormData({
        categoryTitle: '',
        selectedIcon: '',
        field1: '',
        field2: '',
        field3: '',
        field4: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Array of icon names for the radio buttons
  const icons = [
    'icon1', 'icon2', 'icon3', 'icon4', 'icon5', 'icon6',
    'icon7', 'icon8', 'icon9', 'icon10', 'icon11', 'icon12'
  ];

  return (
    <div>
      <CRow className="mb-4">
        {/* Category Information Card */}
        <CCol md={6}>
          <CCard className="h-100">
            <CCardHeader>Category Information</CCardHeader>
            <CCardBody>
              {/* Category Title */}
              <div className="mb-3">
                <label htmlFor="categoryTitle" className="form-label">Category Title</label>
                <CFormInput type="text" id="categoryTitle" name="categoryTitle" value={formData.categoryTitle} onChange={handleChange} />
              </div>

              {/* Pick Category Icon */}
              <div className="mb-3">
                <label className="form-label">Pick Category Icon</label>
                {/* Form for category icon */}
                <div className="d-flex flex-wrap">
                  {icons.map((icon, index) => (
                    <CFormCheck
                      key={index}
                      type="radio"
                      name="selectedIcon"
                      id={`icon${index}`}
                      label={
                        <div className="p-2">
                          <CCard
                            className="icon-card"
                            style={{ width: '50px', height: '50px' }} // Adjust size as needed
                          >
                            <img
                              src={`path/to/${icon}.png`} // Replace path/to/ with the actual path
                              alt={`Icon ${index + 1}`}
                              style={{ width: '100%', height: '100%', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} // Adjust border radius and shadow
                            />
                          </CCard>
                        </div>
                      }
                      value={icon}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Category Special Information Card */}
        <CCol md={6}>
          <CCard className="h-100">
            <CCardHeader>Category Special Information</CCardHeader>
            <CCardBody>
              {/* Random Input Fields */}
              <div className="mb-3">
                <label htmlFor="field1" className="form-label">Field 1</label>
                <CFormInput type="text" id="field1" name="field1" value={formData.field1} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="field2" className="form-label">Field 2</label>
                <CFormInput type="text" id="field2" name="field2" value={formData.field2} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="field3" className="form-label">Field 3</label>
                <CFormInput type="text" id="field3" name="field3" value={formData.field3} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="field4" className="form-label">Field 4</label>
                <CFormInput type="text" id="field4" name="field4" value={formData.field4} onChange={handleChange} />
                </div>
            </CCardBody>
            </CCard>
        </CCol>
    </CRow>
                    {/* Submit Button */}
  <div className="d-flex justify-content-end">
    <CButton color="primary" onClick={handleSubmit}>Add Category</CButton>
  </div>
</div>
  );
}

export default AddCategoryPage;