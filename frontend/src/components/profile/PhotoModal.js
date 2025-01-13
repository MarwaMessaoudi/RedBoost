import React, { useState } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react'
import ImageCropper from './ImageCropper'
function PhotoModal({ setImage, visible, setVisible }) {
  
  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
        backdrop="static"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">UploadPhoto</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <ImageCropper setImage={setImage} setVisible={setVisible} />
        </CModalBody>
      </CModal>
    </>
  )
}

export default PhotoModal
