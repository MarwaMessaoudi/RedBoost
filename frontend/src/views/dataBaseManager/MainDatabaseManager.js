import React from 'react'
import { CRow, CCol, CCard, CCardBody, CButton } from '@coreui/react'
import { ProgramCard } from '../../components/ProgramCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadPrograms } from '../../app/features/programs/programsSlice'
const MainDatabaseManager = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPrograms())
  }, [dispatch])
  const programs = useSelector((state) => state.programsSlice.programs)

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            {programs.map((program, index) => (
              <CCol key={index} xs={12} sm={6} md={4} lg={3}>
                <ProgramCard
                  program={program}
                  onView={() => console.log(`Viewing ${project.title}`)}
                />
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default MainDatabaseManager
