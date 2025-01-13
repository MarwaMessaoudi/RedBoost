import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { CButton, CFormInput } from '@coreui/react'
import { ImageConfig } from './ImageConfig'
import uploadImg from '../Images/cloud-upload-regular-240.png'
import '@coreui/coreui/dist/css/coreui.min.css' // Import CoreUI stylesy
const DropFileInput = (props) => {
  const wrapperRef = useRef(null)
  const [fileList, setFileList] = useState([])

  const onDragEnter = () => wrapperRef.current.classList.add('bg-info')
  const onDragLeave = () => wrapperRef.current.classList.remove('bg-info')

  const onFileDrop = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      const updatedList = [...fileList, newFile]
      setFileList(updatedList)
      props.onFileChange(updatedList)
    }
  }

  const fileRemove = (file) => {
    const updatedList = fileList.filter((item) => item !== file)
    setFileList(updatedList)
    props.onFileChange(updatedList)
  }

  return (
    <>
      <div
        style={{ height: 'auto'}}
        ref={wrapperRef}
        className="drop-file-input border rounded p-3 mb-3"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDragLeave} // Updated to remove 'dragover' class
      >
        <div className="drop-file-input__label text-center text-secondary font-weight-bold">
          <img src={uploadImg} alt="" className="img-fluid mb-2" />
          <p>Drag & Drop your files here</p>
        </div>
        <CFormInput
          type="file"
          id="file-input"
          className="form-control-file"
          onChange={onFileDrop}
        />
      </div>
      {fileList.length > 0 && (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title font-weight-bold mb-3">Ready to upload</p>
          {fileList.map((item, index) => (
            <div
              key={index}
              className="drop-file-preview__item"
              style={{
                height: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #dcdcdc',
                borderRadius: '5px',
              }} // Dynamically adjust height
            >
              <div
                className="drop-file-preview__item__info"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
              >
                <img
                  src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']}
                  alt=""
                  className="img-thumbnail mr-3"
                  style={{ width: '40px', height: '40px' }}
                />
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <CButton color="danger" style={{ height: 'auto' }} onClick={() => fileRemove(item)}>
                x
              </CButton>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
}

export default DropFileInput
