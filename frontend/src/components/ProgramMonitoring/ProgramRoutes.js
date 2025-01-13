import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import ActivityRoutes from './ActivityRoutes'

const ProgramRoutes = () => {
  const programs = useSelector((state) => state.programsSlice.programs)
  return (
    <Routes>
      {programs.map((program) => (
        <Route
          key={program._id}
          name={program.programTitle}
          path={`/${program._id}/*`}
          element={<ActivityRoutes program={program} />}
        />
      ))}
    </Routes>
  )
}

export default ProgramRoutes
