import React from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';

const InfoCard = ({ title, info }) => (
  <CCard 
  className="mb-4 shadow-sm border-top-primary   border-top-3"
  textColor="secondary">
    <CCardHeader className="">{title}</CCardHeader>
    <CCardBody>
      {info.map((item, index) => (
        <div className="mb-3" key={index}>
          <strong>{item.label}</strong> <span>{item.value}</span>
        </div>
      ))}
    </CCardBody>
  </CCard>
);

export default InfoCard;
