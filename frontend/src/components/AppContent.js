// AppContent.js
import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// Ensure this matches the export type from ProgramMonitoring.js
const ProgramRoutes = React.lazy(() => import('./ProgramMonitoring/ProgramRoutes'))

// routes config
import routes from '../routes'

const AppContent = () => {
  return (
    <CContainer className="px-4">
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              element={<route.element />}
            />
          ))}
          {/* Render the lazy component as a JSX element */}
          <Route path="/Monitoring/*" element={<ProgramRoutes />} />
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
