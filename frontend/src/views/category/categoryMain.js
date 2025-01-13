import React from 'react';
import { CCard, CCardBody, CButton } from '@coreui/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import entrepreneurIcon from '../../assets/icons/1.png';
import coachIcon from '../../assets/icons/4.png';
import mentorIcon from '../../assets/icons/5.png';
import investorIcon from '../../assets/icons/3.png';
import porterIcon from '../../assets/icons/2.png';

export default function CategoryMain() {
  return (
    <div className="container-fluid">
        <div className='d-flex justify-content-end mt-0 gap-3'>
        <Link to="/dash/AddCategory">
          <CButton type="button" color="primary">Add Category</CButton>
        </Link>
        
      </div>
      <div className="row justify-content-center align-items-center mt-5">
        {/* First row */}
        <div className="row justify-content-center mb-4 ">
          {/* Entrepreneur Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 m-5 mt-0 " >
            <Link to="/dash/CreateContact"> {/* Redirect to "/entrepreneur-form" */}
              <CCard className="category-card">
                <CCardBody className="text-center">
                  <img src={entrepreneurIcon} alt="Entrepreneur" className="img-fluid mb-3" />
                  <span>Entrepreneur</span>
                </CCardBody>
              </CCard>
            </Link>
          </div>

          {/* Coach Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 m-5 mt-0">
            <Link to="/dash/coach-form"> {/* Redirect to "/coach-form" */}
              <CCard className="category-card">
                <CCardBody className="text-center">
                  <img src={coachIcon} alt="Coach" className="img-fluid mb-3" />
                  <span>Coach</span>
                </CCardBody>
              </CCard>
            </Link>
          </div>

          {/* Mentor Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 m-5 mt-0">
            <Link to="/dash/mentor-form"> {/* Redirect to "/mentor-form" */}
              <CCard className="category-card">
                <CCardBody className="text-center">
                  <img src={mentorIcon} alt="Mentor" className="img-fluid mb-3" />
                  <span>Mentor</span>
                </CCardBody>
              </CCard>
            </Link>
          </div>

          {/* Investor Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 m-5 mt-0">
            <Link to="/dash/investor-form"> {/* Redirect to "/investor-form" */}
              <CCard className="category-card">
                <CCardBody className="text-center">
                  <img src={investorIcon} alt="Investor" className="img-fluid mb-3" />
                  <span>Investor</span>
                </CCardBody>
              </CCard>
            </Link>
          </div>

          {/* Porter Card */}
          <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 m-5 mt-0">
            <Link to="/dash/porter-form"> {/* Redirect to "/porter-form" */}
              <CCard className="category-card">
                <CCardBody className="text-center">
                  <img src={porterIcon} alt="Porter" className="img-fluid mb-3" />
                  <span>Porter</span>
                </CCardBody>
              </CCard>
            </Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}
