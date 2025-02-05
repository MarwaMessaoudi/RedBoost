import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../../components/Images/user.png";
import { Suspense } from "react";
import { CSpinner } from "@coreui/react";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";
import axiosInstance from "../../axiosInstance";
import { setUsers } from "../../app/features/users/usersSlice";

function Users() {
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector((state) => state.usersSlice.users);
  const currentUser = useSelector((state) => state.userData.userData);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({});
  const dispatch = useDispatch();

  const notifyUnauthorized = () => {
    toast.error("You are not authorized to perform this action", {
      autoClose: 3000,
    });
  };

  const notifyError = () => {
    toast.error("An error occurred. Please try again later", {
      autoClose: 3000,
    });
  };
  const notifySuccessRegister = () => {
    toast.success("User Registered successfully", {
      autoClose: 3000,
    });
  };
  const notifySuccess = () => {
    toast.success("User Deleted successfully", {
      autoClose: 3000,
    });
  };

  const deleteUser = async (userId) => {
    if (currentUser.role !== "Super Admin") {
      notifyUnauthorized();
      return;
    }
    try {
      const response = await axiosInstance.delete(`/users/${userId}`);
      if (response.data) {
        console.log("User Deleted");
        const updatedUsers = users.filter((user) => user._id !== userId);
        dispatch(setUsers(updatedUsers));
        notifySuccess();
      }
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/register", newUser);
      if (response.data) {
        console.log("User Added");
        dispatch(setUsers([...users, response.data]));
        notifySuccessRegister();
        setShowForm(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (user) => {
    if (currentUser.role !== "Super Admin") {
      notifyUnauthorized();
      return;
    }
    setVisible(true);
    setSelectedUser(user);
  };

  const handleView = (user) => {
    if (currentUser.role !== "Super Admin") {
      notifyUnauthorized();
      return;
    }
    setSelectedUser(user);
    setView(true);
  };

  if (users.length === 0) {
    return (
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      ></Suspense>
    );
  }

  return (
    <div className="container">
      {currentUser.role === "Super Admin" && (
        <div className="d-flex justify-content-end mt-3 mb-3">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Add User
          </button>
        </div>
      )}

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3 className="popup-title">Add New User</h3>
            <form onSubmit={handleAddUser}>
              <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
                required
              />
              <select
                className="select"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                required
              >
                <option value="superAdmin">Super Admin</option>
                <option value="CEO">CEO</option>
                <option value="regionalManager">Regional Manager</option>
                <option value="projectEmployee">Project Employee</option>
                <option value="marcomManager">Marcom Manager</option>
                <option value="financialManager">Financial Manager</option>
              </select>
              <input
                type="text"
                placeholder="Department"
                value={newUser.department}
                onChange={(e) =>
                  setNewUser({ ...newUser, department: e.target.value })
                }
                required
              />
              <div className="popup-buttons">
                <button type="submit" className="btn-submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowForm(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
      {selectedUser && (
        <EditUser
          visible={visible}
          setVisible={setVisible}
          selectedUser={selectedUser}
        />
      )}
      {selectedUser && (
        <ViewUser view={view} setView={setView} selectedUser={selectedUser} />
      )}
      <div className="main-body">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 gutters-sm">
          {users.map((user, index) => (
            <div className="col mb-3" key={index}>
              <div className="card">
                <div
                  style={{
                    backgroundColor: `#${getColorByIndex(index)}`,
                    height: "100px",
                  }}
                  className="card-img-top"
                />
                <div className="card-body text-center">
                  <img
                    src={user.image ? user.image : img}
                    style={{ width: "110px", marginTop: "-65px" }}
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
                    style={{ maxWidth: "70%", margin: "0 auto" }}
                  >
                    <li className="p-2">
                      <a
                        href="#"
                        className="text-primary"
                        data-toggle="tooltip"
                        title="View"
                        onClick={() => handleView(user)}
                      >
                        <FaEye style={{ fontSize: "1.2rem" }} />
                      </a>
                    </li>
                    <li className="p-2">
                      <a
                        href="#"
                        className="text-info"
                        data-toggle="tooltip"
                        title="Edit"
                        onClick={() => handleEdit(user)}
                      >
                        <FaEdit style={{ fontSize: "1.2rem" }} />
                      </a>
                    </li>
                    {user._id !== currentUser._id ? (
                      <li className="p-2">
                        <a
                          href="#"
                          className="text-danger"
                          data-toggle="tooltip"
                          title="Delete"
                          onClick={() => deleteUser(user._id)}
                        >
                          <MdDelete style={{ fontSize: "1.2rem" }} />
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
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .select {
          width: 100%;
          margin: 10px 0;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ced4da;
        }
        .popup-form {
          background: #212631;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          width: 350px;
          text-align: center;
        }
        .popup-title {
          margin-bottom: 15px;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .popup-form input {
          width: 100%;
          margin: 10px 0;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ced4da;
        }
        .popup-buttons {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
          margin-right: 10px;
        }
        .btn-submit {
          background: #007bff;
          color: white;
          padding: 10px 15px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }
        .btn-close {
          background: #dc3545;
          color: white;
          padding: 10px 30px;
          padding-right: 50px;
          padding-bottom:15px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

const getColorByIndex = (index) => {
  const colors = [
    "FFB6C1",
    "87CEFA",
    "20B2AA",
    "FFA07A",
    "7B68EE",
    "BA55D3",
    "FF4500",
    "191970",
    "DDA0DD",
    "DB7093",
    "663399",
    "FF8C00",
  ];
  return colors[index % colors.length];
};

export default Users;