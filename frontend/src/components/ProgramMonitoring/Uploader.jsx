import React, { useRef, useState } from 'react'
import './Uploader.css'
import { FaFileAlt, FaCheck } from 'react-icons/fa'
import { FaCloudUploadAlt } from 'react-icons/fa'

function Uploader({ selectedTask, setSelectedtask }) {
  // const [uploadFiles, setUploadFiles] = useState([])
  const fileInputRef = useRef(null)
  const handleUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const newFile = {
      name: file.name,
      size: file.size, // You can include additional file details if needed
    }

    // Update selectedTask with the new file added to uploadFiles array
    setSelectedtask((prevTask) => ({
      ...prevTask,
      uploadFiles: [...prevTask.uploadFiles, newFile],
    }))
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }
  const handleDelete = (index) => {
    // Remove file from uploadFiles array based on index
    setSelectedtask((prevTask) => ({
      ...prevTask,
      uploadFiles: prevTask.uploadFiles.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="upload-box">
      <form action="" onClick={handleClick}>
        <input
          type="file"
          className="file-upload-input"
          name="file"
          hidden
          ref={fileInputRef}
          onChange={handleUpload}
        />
        <div className="icon">
          <FaCloudUploadAlt className="cloud-icon" style={{ color: '#0c77ad' }} />
        </div>
        <p>Browse File To Upload</p>
      </form>
      <section className="uploaded-area">
        {selectedTask.uploadFiles.map((uploadFile, index) => (
          <li className="row" key={index} onClick={() => handleDelete(index)}>
            <div className="content-upload">
              <i>
                <FaFileAlt />
              </i>
              <div className="details">
                <span className="name">{uploadFile.name}</span>
              </div>
            </div>
          </li>
        ))}
      </section>
    </div>
  )
}

export default Uploader
