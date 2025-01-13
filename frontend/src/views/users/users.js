import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import img from '../../components/Images/user.png'
import { Suspense } from 'react'
import { CSpinner } from '@coreui/react'
import { FaEye, FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import EditUser from './EditUser'
import ViewUser from './ViewUser'
import axiosInstance from '../../axiosInstance'
import { setUsers } from '../../app/features/users/usersSlice'

function Users() {
  const [visible, setVisible] = useState(false)
  const [view, setView] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const users = useSelector((state) => state.usersSlice.users)
  const currentUser = useSelector((state) => state.userData.userData)
  // const FilteredUsers = users.filter((user) => user._id !== currentUser._id)
  console.log('users from users :', users)
  const dispatch = useDispatch()

  const notifyUnauthorized = () => {
    toast.error('You are not authorized to perform this action', {
      autoClose: 3000,
    })
  }
  const notifySuccess = () => {
    toast.success('User Deleted successfully', {
      autoClose: 3000,
    })
  }

  const deleteUser = async (userId) => {
    if (currentUser.role !== 'Super Admin') {
      notifyUnauthorized()
      return
    }
    try {
      const response = await axiosInstance.delete(`/users/${userId}`)

      if (response.data) {
        console.log('User Deleted')
        const updatedUsers = users.filter((user) => user._id !== userId)
        dispatch(setUsers(updatedUsers))
        notifySuccess()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = (user) => {
    if (currentUser.role !== 'Super Admin') {
      notifyUnauthorized()
      return
    }
    setVisible(true)
    setSelectedUser(user)
  }

  const handleView = (user) => {
    if (currentUser.role !== 'Super Admin') {
      notifyUnauthorized()
      return
    }
    setSelectedUser(user)
    setView(true)
  }

  if (users.length === 0) {
    return (
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      ></Suspense>
    )
  }

  return (
    <div className="container">
      <ToastContainer />
      {selectedUser && (
        <EditUser visible={visible} setVisible={setVisible} selectedUser={selectedUser} />
      )}
      {selectedUser && <ViewUser view={view} setView={setView} selectedUser={selectedUser} />}
      <div className="main-body">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
          {/* Sample Cards */}
          {users.map((user, index) => (
            <div className="col mb-3" key={index}>
              <div className="card">
                <div
                  style={{
                    backgroundColor: `#${getColorByIndex(index)}`,
                    height: '100px', // Adjust height as needed
                  }}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <img
                    src={user.image ? user.image : img}
                    style={{ width: '110px', marginTop: '-65px' }}
                    alt="User"
                    className="img-fluid img-thumbnail rounded-circle border-0 mb-3"
                  />
                  <h5 className="card-title">{user.username}</h5>
                  <p className="text-secondary mb-1">{user.role}</p>
                  <p className="text-muted font-size-sm">{user.email}</p>
                </div>
                <div className="card-footer">
                  <ul
                    className="list-unstyled mb-0 d-flex justify-content-between align-items-center flex-wrap"
                    style={{ maxWidth: '70%', margin: '0 auto' }}
                  >
                    <li className="p-2">
                      <a href="#" className="text-primary" data-toggle="tooltip" title="View">
                        <FaEye onClick={() => handleView(user)} style={{ fontSize: '1.2rem' }} />
                      </a>
                    </li>
                    <li className="p-2">
                      <a href="#" className="text-info" data-toggle="tooltip" title="Edit">
                        <FaEdit onClick={() => handleEdit(user)} style={{ fontSize: '1.2rem' }} />
                      </a>
                    </li>
                    {user._id !== currentUser._id ? (
                      <li className="p-2">
                        <a href="#" className="text-danger" data-toggle="tooltip" title="Delete">
                          <MdDelete
                            onClick={() => deleteUser(user._id)}
                            style={{ fontSize: '1.2rem' }}
                          />
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const getColorByIndex = (index) => {
  const colors = [
    'FFB6C1',
    '87CEFA',
    '20B2AA',
    'FFA07A',
    '7B68EE',
    'BA55D3',
    'FF4500',
    '191970',
    'DDA0DD',
    'DB7093',
    '663399',
    'FF8C00',
  ]
  // Use modulo to cycle through colors based on index
  return colors[index % colors.length]
}

export default Users
