import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CButton } from '@coreui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CategoryMain() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Getcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end mt-0 gap-3">
        <Link to="/dash/AddCategory" style={{ textDecoration: 'none' }}>
          <CButton type="button" color="primary">Add Category</CButton>
        </Link>
      </div>

      <div className="row justify-content-center align-items-center mt-5">
        <div className="row justify-content-center mb-4">
          {categories.map((category) => (
            <div key={category._id} className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4 m-5 mt-0">
              <Link to={`/dash/category/form/${category._id}`} style={{ textDecoration: 'none' }}>
                <CCard className="category-card" style={{ cursor: 'pointer' }}>
                  <CCardBody className="text-center">
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>{category.selectedIcon}</div>
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{category.categoryTitle}</span>
                  </CCardBody>
                </CCard>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
