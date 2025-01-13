import { CCard, CCardBody, CButton, CListGroupItem } from '@coreui/react'
import { Link } from 'react-router-dom'
export const ProgramCard = ({ logo, title, path }) => {
  return (
    <CCard className="mb-4">
      <CCardBody className="d-flex flex-column">
        <div
          className="d-flex justify-content-center align-items-center mb-5"
          style={{ height: '125px' }}
        >
          <img src={logo} alt="Project Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </div>
        <h5 className="text-center">{title}</h5>
        <div className="mt-auto d-grid">
          <CButton color="primary">
            <CListGroupItem as={Link} to={path}>
              view
            </CListGroupItem>
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}
