import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CSpinner,
  CAlert,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import { useSession } from '@supabase/auth-helpers-react';
import CIcon from '@coreui/icons-react';
import { cilFile, cilFolder } from '@coreui/icons';

const GoogleDriveUI = () => {
  const session = useSession();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFolderId, setCurrentFolderId] = useState('root');
  const [folderPath, setFolderPath] = useState([{ id: 'root', name: 'My Drive' }]);

  useEffect(() => {
    if (session?.provider_token) {
      loadDriveContents(currentFolderId);
    }
  }, [session, currentFolderId]);

  const loadDriveContents = async (folderId) => {
    try {
      setLoading(true);
      setError(null);

      const query = `'${folderId}' in parents and trashed = false`;
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?` +
        new URLSearchParams({
          q: query,
          fields: 'files(id, name, mimeType, iconLink, webViewLink, modifiedTime, size)',
          orderBy: 'folder,name',
          pageSize: 100
        }),
        {
          headers: {
            'Authorization': `Bearer ${session.provider_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch Drive contents');

      const data = await response.json();
      setFiles(data.files);
    } catch (error) {
      console.error('Error loading Drive contents:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFolderClick = async (folderId, folderName) => {
    setCurrentFolderId(folderId);
    setFolderPath(prev => [...prev, { id: folderId, name: folderName }]);
  };

  const handleNavigateBack = (index) => {
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
    setCurrentFolderId(newPath[newPath.length - 1].id);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!session) {
    return (
      <CAlert color="warning">
        Please sign in to access your Google Drive
      </CAlert>
    );
  }

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex align-items-center">
          <h3 className="mb-0">Google Drive</h3>
        </div>
      </CCardHeader>
      <CCardBody>
        {error && (
          <CAlert color="danger" dismissible onClose={() => setError(null)}>
            {error}
          </CAlert>
        )}

        <div className="folder-path mb-3">
          {folderPath.map((folder, index) => (
            <span key={folder.id}>
              {index > 0 && ' > '}
              <button
                className="btn btn-link p-0"
                onClick={() => handleNavigateBack(index)}
              >
                {folder.name}
              </button>
            </span>
          ))}
        </div>

        {loading ? (
          <div className="text-center p-3">
            <CSpinner color="primary" />
          </div>
        ) : (
          <CListGroup>
            {files.length === 0 ? (
              <CListGroupItem className="text-center text-muted">
                This folder is empty
              </CListGroupItem>
            ) : (
              files.map(file => (
                <CListGroupItem
                  key={file.id}
                  className="d-flex align-items-center"
                  action
                  onClick={() => file.mimeType === 'application/vnd.google-apps.folder'
                    ? handleFolderClick(file.id, file.name)
                    : window.open(file.webViewLink, '_blank')
                  }
                >
                  <CIcon
                    icon={file.mimeType === 'application/vnd.google-apps.folder' ? cilFolder : cilFile}
                    className="me-2"
                  />
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{file.name}</div>
                    <small className="text-muted">
                      {formatDate(file.modifiedTime)}
                      {file.size && ` • ${formatFileSize(file.size)}`}
                    </small>
                  </div>
                </CListGroupItem>
              ))
            )}
          </CListGroup>
        )}
      </CCardBody>
    </CCard>
  );
};

export default GoogleDriveUI;
