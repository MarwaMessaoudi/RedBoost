import React, { useState, useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { CButton, CFormInput, CModalFooter } from '@coreui/react'
const ImageCropper = ({ setImage, setVisible }) => {
  const editorRef = useRef(null)
  const [image, setImageState] = useState(null)
  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()
      const croppedImage = canvas.toDataURL() // Get cropped image as base64 data URL
      setImage(croppedImage)
      setVisible(false)
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
    if (selectedImage) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageState(reader.result)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  return (
    <div>
      <CFormInput type="file" onChange={handleImageChange} accept="image/*" />
      {image && (
        <div style={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={200}
            height={200}
            border={50}
            borderRadius={100}
            color={[255, 255, 255, 0.6]} // RGBA white background
            scale={1.2} // Zoom level
            rotate={0}
          />
        </div>
      )}
      <CModalFooter>
        <CButton color="primary" onClick={handleSave}>
          Save Changes
        </CButton>{' '}
        <CButton color="secondary" onClick={handleCancel}>
          Cancel
        </CButton>
      </CModalFooter>
    </div>
  )
}

export default ImageCropper
