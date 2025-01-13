import React from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom'

function ExpiryModal({ setIsLogged, setModalOpen, modalOpen }) {
  console.log('modal open', modalOpen)
  const navigate = useNavigate()
  const handleLogin = () => {
    setIsLogged(false)
  }
  return (
    <>
      <CModal
        visible={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setIsLogged(false)
        }}
        aria-labelledby="LiveDemoExampleLabel"
        backdrop="static"
      >
        <CModalHeader
          onClose={() => {
            setIsLogged(false)
            setModalOpen(false)
          }}
        >
          <CModalTitle id="LiveDemoExampleLabel">Session Expired</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Your Session is About to Expire , Please Login Again</p>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={handleLogin} color="primary">
            Login
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ExpiryModal
