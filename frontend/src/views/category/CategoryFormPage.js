import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react';

export default function CategoryFormPage() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  console.log('Category ID from URL:', categoryId); // Add this line

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/categoryByid/${categoryId}`);        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (!category || !category.formFields) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <CCard className="shadow-lg rounded-3 border-0">
            <CCardHeader className="bg-primary text-light text-center py-3 rounded-top">
              <h4 className="mb-0">Add {category.categoryTitle}</h4>
            </CCardHeader>
            <CCardBody className="p-4 bg-light">
              <div className="text-center mb-4">
              {category.selectedIcon}
              </div>

              {/* Form Section */}
              <CForm>
                {category.formFields.map((field) => (
                  <CRow key={field._id} className="mb-3">
                    <CCol md={12}>
                      <CFormLabel className="fw-bold">{field.fieldTitle}</CFormLabel>

                      {field.fieldType === 'text' && (
                        <CFormInput
                          type="text"
                          name={field.fieldTitle}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="rounded-2 border-0 shadow-sm"
                        />
                      )}

                      {field.fieldType === 'select' && (
                        <CFormSelect
                          name={field.fieldTitle}
                          required={field.required}
                          className="rounded-2 border-0 shadow-sm"
                        >
                          {field.options?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </CFormSelect>
                      )}
                    </CCol>
                  </CRow>
                ))}

                {/* Submit Button */}
                <div className="text-center mt-4">
                  <CButton
                    color="primary"
                    type="submit"
                    className="px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{
                      transition: '0.3s ease-in-out',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = '#0d6efd')}
                  >
                    Submit
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </div>
      </div>
    </div>
  );
}
