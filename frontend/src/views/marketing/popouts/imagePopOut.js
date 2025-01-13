import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
} from '@coreui/react';

const ImagePopOut = ({ isOpen, toggle, category, images = ['', '', ''], onUpdateImages }) => {
  // Initialize state with provided images or with empty strings if not provided
  const [image1, setImage1] = useState(images[0] || '');
  const [image2, setImage2] = useState(images[1] || '');
  const [image3, setImage3] = useState(images[2] || '');

  // Use effect to update state when images prop changes
  useEffect(() => {
    setImage1(images[0] || '');
    setImage2(images[1] || '');
    setImage3(images[2] || '');
  }, [images]);

  const handleSave = () => {
    onUpdateImages([image1.trim(), image2.trim(), image3.trim()]);
    toggle(); // Close the modal
  };

  return (
    <CModal visible={isOpen} onClose={toggle}>
      <CModalHeader closeButton>Update Images for {category}</CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSave}>
          <div className="mb-3">
            <CFormLabel htmlFor="image1">Image 1 URL</CFormLabel>
            <CFormInput
              type="text"
              id="image1"
              placeholder="Enter URL for Image 1"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="image2">Image 2 URL</CFormLabel>
            <CFormInput
              type="text"
              id="image2"
              placeholder="Enter URL for Image 2"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="image3">Image 3 URL</CFormLabel>
            <CFormInput
              type="text"
              id="image3"
              placeholder="Enter URL for Image 3"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
            />
          </div>
          <CModalFooter>
            <CButton color="primary" type="submit">Save Changes</CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  );
};

export default ImagePopOut;
