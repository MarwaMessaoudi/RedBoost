import React from 'react';
import { useHistory } from 'react-router-dom';
import { CButton } from '@coreui/react';

const BackButton = () => {
  const history = useHistory();

  // Function to handle back button click
  const handleBack = () => {
    history.goBack(); // Go back to the previous page
  };

  return (
    <div className="headerR d-flex justify-content-end mt-0 ">
            
            <CButton  className="custom-btn mb-4 mr-5"  color="secondary" onClick={handleBack}>
      Back
    </CButton>
        </div>
    
  );
};

export default BackButton;
