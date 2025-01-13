import React from 'react';
import {
    CContainer,
    CRow,
    CCard,
    CCardHeader,
    CCardBody,
    CCardTitle,
    CTable,
    CTableHead,
    CTableBody,
    CTableRow,
    CTableHeaderCell,
    CTableDataCell,
    CBadge,
    CButton,
    CCol
} from '@coreui/react';
import { Button } from 'reactstrap';

export default function ThemesScreen() {
    const categories = {
        "Empower Her": "danger",
        "Tech": "info",
        "Entrepreneurship": "warning",
        "Green": "success"
    };

    const tableData = [
        { headline: 'Example Headline 1', target: 190000, category: 'Tech', status: 'Active' },
        { headline: 'Example Headline 2', target: 10009, category: 'Entrepreneurship', status: 'Inactive' },
        { headline: 'Example Headline 3', target: 124339, category: 'Green', status: 'Active' },
        { headline: 'Example Headline 4', target: 111239, category: 'Empower Her', status: 'Inactive' },
        { headline: 'Example Headline 5', target: 177779, category: 'Entrepreneurship', status: 'Active' },
        { headline: 'Example Headline 6', target: 124339, category: 'Green', status: 'Active' },
        { headline: 'Example Headline 7', target: 111239, category: 'Empower Her', status: 'Inactive' },
        { headline: 'Example Headline 8', target: 177779, category: 'Entrepreneurship', status: 'Active' },
    ];

    const renderStatusBadge = (status) => {
        if (status === 'Active') {
            return <CBadge color="success">Active</CBadge>;
        } else if (status === 'Inactive') {
            return <CBadge color="danger">Inactive</CBadge>;
        }
        return null; // Handle other statuses if needed
    };

    const renderActions = () => {
        return (
            <>
                <CButton color="danger" size="sm" className="me-2">Delete</CButton>
                <CButton color="primary" size="sm">Review</CButton>
            </>
        );
    };

    const renderTableRows = () => {
        return tableData.map((row, index) => (
            <CTableRow
                key={index}
                className="hover-row"
            >
                <CTableDataCell>{row.headline}</CTableDataCell>
                <CTableDataCell>
                    <CBadge color={categories[row.category]}>{row.category}</CBadge>
                </CTableDataCell>
                <CTableDataCell>{row.target}</CTableDataCell>
                <CTableDataCell>{renderStatusBadge(row.status)}</CTableDataCell>
                <CTableDataCell>{renderActions()}</CTableDataCell>
            </CTableRow>
        ));
    };

    return (
        <div>
            <CRow>
                <CCol className='d-flex justify-content-end'>
                    <Button color='primary' className='m-2'>Add manually</Button>
                    <Button color='secondary' className='m-2'>Generate</Button>
                </CCol>
            </CRow>
            <CRow>
                <CCard>
                    <CCardHeader color='white'>
                        <CCardTitle>Current Newspaper Themes</CCardTitle>
                    </CCardHeader>
                    <CCardBody>
                        <CTable responsive>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell>Headline</CTableHeaderCell>
                                    <CTableHeaderCell>Categories</CTableHeaderCell>
                                    <CTableHeaderCell>Target</CTableHeaderCell>
                                    <CTableHeaderCell>Status</CTableHeaderCell>
                                    <CTableHeaderCell>Actions</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {renderTableRows()}
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CRow>
            <style>{`
                .hover-row {
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .hover-row:hover {
                    background-color: #f5f5f5;
                }
            `}</style>
        </div>
    );
}
