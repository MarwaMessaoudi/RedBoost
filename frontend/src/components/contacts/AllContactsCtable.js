import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CTable, CTableHead, CTableBody, CTableRow, CTableDataCell, CButton, CPagination, CPaginationItem, CTooltip } from '@coreui/react';
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import userImg from '../../components/Images/user.png'
import { CgMoreO } from "react-icons/cg";
import { useDispatch } from 'react-redux';
import { deleteEntrepreneur, deleteEntrepreneurs, updateEntrepreneur } from '../../app/features/entrepreneursData/entrepreneursSlice';
import ViewContact from './ViewContact';

const AllContactsCtable = ({ entrepreneurs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [editMode, setEditMode] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editedEntrepreneur, setEditedEntrepreneur] = useState(null);
  const [show, setShow] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const itemsPerPage = 7;
  const dispatch = useDispatch();

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = (id) => {
    dispatch(deleteEntrepreneur(id));
  };

  const handleEdit = (entrepreneur) => {
    setEditedEntrepreneur(entrepreneur);
    setEditMode(true);
  };

  const handleSelectAll = () => {
    if (selectedIds.length === currentEntrepreneurs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentEntrepreneurs.map(entrepreneur => entrepreneur._id));
    }
  };

  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const sortedEntrepreneurs = React.useMemo(() => {
    let sortedEntrepreneurs = [...entrepreneurs];
    if (sortConfig.key !== null) {
      sortedEntrepreneurs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedEntrepreneurs;
  }, [entrepreneurs, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntrepreneurs = sortedEntrepreneurs.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(entrepreneurs.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getSortIndicator = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '';
  };

  const handleSave = () => {
    dispatch(updateEntrepreneur({ id: editedEntrepreneur._id, data: editedEntrepreneur }));
    setEditMode(false);
  };

  const handleView = (entrepreneur) => {
    setShow(true);
    setSelectedContact(entrepreneur);
  };
  const handleDeleteSelected = () => {
    dispatch(deleteEntrepreneurs(selectedIds));
    setSelectedEntrepreneurs([]); // Clear selection after deletion
  };

  return (
    <div>
      {show && selectedContact !== null ? <ViewContact show={show} setShow={setShow} contact={selectedContact} /> : null}
      <div className="d-flex align-items-center justify-content-between p-2 w-100">
        <strong>Selected Entrepreneurs: {selectedIds.length}</strong>
        <CButton onClick={handleDeleteSelected} color='danger' className='text-light'>delete All ({selectedIds.length})</CButton>
      </div>
      <CTable responsive>
        <CTableHead>
          <CTableRow>
            <CTableDataCell>
              <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === currentEntrepreneurs.length} />
            </CTableDataCell>
            <CTableDataCell>
              <strong>Image</strong>
            </CTableDataCell>
            <CTableDataCell onClick={() => handleSort('nom')}>
              <strong>FirstName {getSortIndicator('nom')}</strong>
            </CTableDataCell>
            <CTableDataCell onClick={() => handleSort('prenom')}>
              <strong>LastName {getSortIndicator('prenom')}</strong>
            </CTableDataCell>
            <CTableDataCell onClick={() => handleSort('startupName')}>
              <strong>Startup Name {getSortIndicator('startupName')}</strong>
            </CTableDataCell>
            <CTableDataCell onClick={() => handleSort('secteurActivites')}>
              <strong>Activities Sector {getSortIndicator('secteurActivites')}</strong>
            </CTableDataCell>
            <CTableDataCell onClick={() => handleSort('gender')}>
              <strong>Gender {getSortIndicator('gender')}</strong>
            </CTableDataCell>
            <CTableDataCell onClick={() => handleSort('email')}>
              <strong>Mail {getSortIndicator('email')}</strong>
            </CTableDataCell>
            <CTableDataCell>
              <strong>Actions</strong>
            </CTableDataCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentEntrepreneurs.map((entrepreneur) => (
            <CTableRow key={entrepreneur._id}>
              <CTableDataCell>
                <input type="checkbox" checked={selectedIds.includes(entrepreneur._id)} onChange={() => handleSelect(entrepreneur._id)} />
              </CTableDataCell>
              <CTableDataCell>
                <img
                  src={entrepreneur?.entrepreneurImage ? entrepreneur.entrepreneurImage : userImg}
                  alt="avatar"
                  style={{ width: '45px', height: 'auto', borderRadius: "50px" }}
                />
              </CTableDataCell>
              <CTableDataCell>
                {editMode && editedEntrepreneur && editedEntrepreneur._id === entrepreneur._id ? (
                  <input type="text" value={editedEntrepreneur.nom} onChange={(e) => setEditedEntrepreneur({ ...editedEntrepreneur, nom: e.target.value })} />
                ) : (
                  <span>{entrepreneur.nom}</span>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editMode && editedEntrepreneur && editedEntrepreneur._id === entrepreneur._id ? (
                  <input type="text" value={editedEntrepreneur.prenom} onChange={(e) => setEditedEntrepreneur({ ...editedEntrepreneur, prenom: e.target.value })} />
                ) : (
                  <span>{entrepreneur.prenom}</span>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editMode && editedEntrepreneur && editedEntrepreneur._id === entrepreneur._id ? (
                  <input type="text" value={editedEntrepreneur.startupName} onChange={(e) => setEditedEntrepreneur({ ...editedEntrepreneur, startupName: e.target.value })} />
                ) : (
                  <span>{entrepreneur.startupName}</span>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editMode && editedEntrepreneur && editedEntrepreneur._id === entrepreneur._id ? (
                  <input type="text" value={editedEntrepreneur.secteurActivites} onChange={(e) => setEditedEntrepreneur({ ...editedEntrepreneur, secteurActivites: e.target.value })} />
                ) : (
                  <span>{entrepreneur.secteurActivites}</span>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editMode && editedEntrepreneur && editedEntrepreneur._id === entrepreneur._id ? (
                  <input type="text" value={editedEntrepreneur.gender} onChange={(e) => setEditedEntrepreneur({ ...editedEntrepreneur, gender: e.target.value })} />
                ) : (
                  <span>{entrepreneur.gender}</span>
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editMode && editedEntrepreneur && editedEntrepreneur._id === entrepreneur._id ? (
                  <input type="text" value={editedEntrepreneur.email} onChange={(e) => setEditedEntrepreneur({ ...editedEntrepreneur, email: e.target.value })} />
                ) : (
                  <span>{entrepreneur.email}</span>
                )}
              </CTableDataCell>
              <CTableDataCell style={{ alignContent: 'center' }}>
                {editMode && editedEntrepreneur && editedEntrepreneur._id === entrepreneur._id ? (
                  <>
                    <CButton color="success" onClick={handleSave}>
                      Save
                    </CButton>
                    <CButton color="danger" onClick={() => setEditMode(false)}>
                      Cancel
                    </CButton>
                  </>
                ) : (
                  <>
                    <CTooltip content="Edit">
                      <MdOutlineEdit
                        onClick={() => handleEdit(entrepreneur)}
                        style={{ color: "#6270fd", fontSize: '22px', cursor: 'pointer', marginRight: '10px' }}
                      />
                    </CTooltip>
                    <CTooltip content="Delete">
                      <MdOutlineDeleteOutline
                        onClick={() => handleDelete(entrepreneur._id)}
                        style={{ color: 'red', fontSize: '22px', cursor: 'pointer', marginRight: '10px' }}
                      />
                    </CTooltip>
                    <CTooltip content="View More">
                      <CgMoreO onClick={() => handleView(entrepreneur)} style={{ color: 'green', fontSize: '20px', cursor: 'pointer' }} />
                    </CTooltip>
                  </>
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CPagination align="center" aria-label="Page navigation example">
        <CPaginationItem
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </CPaginationItem>
        {[...Array(totalPages).keys()].map(number => (
          <CPaginationItem
            key={number + 1}
            active={currentPage === number + 1}
            onClick={() => handlePageChange(number + 1)}
          >
            {number + 1}
          </CPaginationItem>
        ))}
        <CPaginationItem
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </CPaginationItem>
      </CPagination>
    </div>
  );
};

export default AllContactsCtable;
