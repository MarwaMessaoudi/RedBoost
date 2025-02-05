import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CFormInput, CCol, CRow, CButton, CFormSelect, CFormSwitch, CFormCheck } from '@coreui/react';
import axios from 'axios';

const AddCategoryPage = () => {
  // State for the form data
  const [formData, setFormData] = useState({
    categoryTitle: '',
    selectedIcon: '',
    formFields: [], // Array to store dynamic form fields
  });

  // State for adding a new form field
  const [newField, setNewField] = useState({
    fieldTitle: '',
    fieldType: 'text', // Default field type
    placeholder: '',
    required: false,
    options: '', // Comma-separated options for select fields
    min: null, // For number fields
    max: null, // For number fields
  });

  // List of icons for selection
  const professions = [
    { id: 'doctor', name: 'Doctor', icon: '👨‍⚕️' },
    { id: 'nurse', name: 'Nurse', icon: '👩‍⚕️' },
    { id: 'dentist', name: 'Dentist', icon: '🦷' },
    { id: 'pharmacist', name: 'Pharmacist', icon: '💊' },
    { id: 'therapist', name: 'Therapist', icon: '🧠' },
    { id: 'surgeon', name: 'Surgeon', icon: '🩺' },
    { id: 'teacher', name: 'Teacher', icon: '👩‍🏫' },
    { id: 'professor', name: 'Professor', icon: '🎓' },
    { id: 'tutor', name: 'Tutor', icon: '📚' },
    { id: 'librarian', name: 'Librarian', icon: '📖' },
    { id: 'researcher', name: 'Researcher', icon: '🔬' },
    { id: 'engineer', name: 'Engineer', icon: '👷‍♂️' },
    { id: 'developer', name: 'Developer', icon: '💻' },
    { id: 'data-scientist', name: 'Data Scientist', icon: '📊' },
    { id: 'designer', name: 'Designer', icon: '🎨' },
    { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒' },
  ];

  // Handle changes in the main form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'selectedIcon') {
      // Find the selected profession object
      const selectedProfession = professions.find((prof) => prof.id === value);
      // Store the emoji in the formData
      setFormData({
        ...formData,
        selectedIcon: selectedProfession ? selectedProfession.icon : '',
      });
    } else {
      // Handle other fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle changes in the new form field inputs
  const handleNewFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewField({
      ...newField,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Add a new form field to the formFields array
  const addFormField = () => {
    const fieldToAdd = {
      ...newField,
      options: newField.fieldType === 'select' ? newField.options.split(',') : [], // Split options into an array
    };
    setFormData({
      ...formData,
      formFields: [...formData.formFields, fieldToAdd],
    });
    setNewField({
      fieldTitle: '',
      fieldType: 'text',
      placeholder: '',
      required: false,
      options: '',
      min: null,
      max: null,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/categories/', formData);
      console.log('Category created:', response.data);
      alert('Category created successfully!');
      // Reset the form after submission
      setFormData({
        categoryTitle: '',
        selectedIcon: '',
        formFields: [],
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error creating category. Please try again.');
    }
  };

  return (
    <div>
      <CRow className="mb-4">
        <CCol md={6}>
          <CCard className="h-100">
            <CCardHeader>Category Information</CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <label htmlFor="categoryTitle" className="form-label">Category Title</label>
                <CFormInput
                  type="text"
                  id="categoryTitle"
                  name="categoryTitle"
                  value={formData.categoryTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pick Category Icon</label>
                <div className="d-flex flex-wrap">
                  {professions.map((profession) => (
                    <CFormCheck
                      key={profession.id}
                      type="radio"
                      name="selectedIcon"
                      id={profession.id}
                      label={<div className="p-2"><div style={{ fontSize: '24px' }}>{profession.icon}</div></div>}
                      value={profession.id}
                      checked={formData.selectedIcon === profession.icon}
                      onChange={handleChange}
                    />
                  ))}
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard className="h-100">
            <CCardHeader>Custom Form Fields</CCardHeader>
            <CCardBody>
              {/* Form to add new fields */}
              <div className="mb-3">
                <label htmlFor="fieldTitle" className="form-label">Field Title</label>
                <CFormInput
                  type="text"
                  id="fieldTitle"
                  name="fieldTitle"
                  value={newField.fieldTitle}
                  onChange={handleNewFieldChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="fieldType" className="form-label">Field Type</label>
                <CFormSelect
                  id="fieldType"
                  name="fieldType"
                  value={newField.fieldType}
                  onChange={handleNewFieldChange}
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </CFormSelect>
              </div>
              {newField.fieldType === 'select' && (
                <div className="mb-3">
                  <label htmlFor="options" className="form-label">Options (comma-separated)</label>
                  <CFormInput
                    type="text"
                    id="options"
                    name="options"
                    value={newField.options}
                    onChange={handleNewFieldChange}
                  />
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="placeholder" className="form-label">Placeholder</label>
                <CFormInput
                  type="text"
                  id="placeholder"
                  name="placeholder"
                  value={newField.placeholder}
                  onChange={handleNewFieldChange}
                />
              </div>
              <div className="mb-3">
                <CFormSwitch
                  id="required"
                  name="required"
                  label="Required"
                  checked={newField.required}
                  onChange={handleNewFieldChange}
                />
              </div>
              <CButton color="primary" onClick={addFormField}>Add Field</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Preview Section */}
      <CCard className="mb-4">
        <CCardHeader>Form Preview</CCardHeader>
        <CCardBody>
          {formData.formFields.map((field, index) => (
            <div key={index} className="mb-3">
              <label className="form-label">{field.fieldTitle}</label>
              {field.fieldType === 'text' && (
                <CFormInput type="text" placeholder={field.placeholder} />
              )}
              {field.fieldType === 'number' && (
                <CFormInput type="number" placeholder={field.placeholder} min={field.min} max={field.max} />
              )}
              {field.fieldType === 'date' && (
                <CFormInput type="date" />
              )}
              {field.fieldType === 'select' && (
                <CFormSelect>
                  {field.options.map((option, i) => (
                    <option key={i} value={option}>{option}</option>
                  ))}
                </CFormSelect>
              )}
              {field.fieldType === 'checkbox' && (
                <CFormCheck type="checkbox" label={field.fieldTitle} />
              )}
            </div>
          ))}
        </CCardBody>
      </CCard>

      <div className="text-end">
        <CButton color="primary" onClick={handleSubmit}>Submit</CButton>
      </div>
    </div>
  );
};

export default AddCategoryPage;