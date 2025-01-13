import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import routes from '../routes'
import { useNavigate } from 'react-router-dom'

const Program = React.lazy(() => import('../components/ProgramMonitoring/Program'))

const AppBreadcrumb = () => {
  const navigate = useNavigate()
  const dynamicRoutes = useSelector((state) => state.programsSlice.programs).map((program) => ({
    path: `/Monitoring/${program.programTitle}`,
    name: program.programTitle,
    element: Program,
  }))
  const dynamicActivitiesByProgramId = useSelector((state) => state.route.dynamicRoutes)
  console.log('dynamicActivitiesByProgramId', dynamicActivitiesByProgramId)
  const allRoutes = [...routes, ...dynamicRoutes, ...dynamicActivitiesByProgramId]
  const currentLocation = useLocation().pathname
  const getRouteName = (pathname, routes) => {
    //remove /dash from pathname
    if (pathname === '/Dash') pathname = pathname.replace('/Dash', '/')
    else pathname = pathname.replace(/\/Dash/g, '')
    const currentRoute = routes.find((route) => decodeURIComponent(route.path) === pathname)
    return currentRoute ? currentRoute.name : false
  }
  const getBreadcrumbs = (location) => {
    location = decodeURIComponent(location)
    // Split the path by '/' and filter out empty strings to ignore leading/trailing slashes
    const pathSegments = location.split('/').filter(Boolean)
    // Reduce the pathSegments to create a breadcrumb array
    const breadcrumbs = pathSegments.reduce((acc, curr, index) => {
      // Construct the current path based on the accumulated segments
      let currentPath = `${acc.length ? acc[acc.length - 1].pathname : ''}/${curr}`

      // Find the route name using the currentPath
      const routeName = getRouteName(currentPath, allRoutes)

      // If a route name is found, create a breadcrumb object and add it to the accumulator
      if (routeName) {
        acc.push({
          pathname: currentPath,
          name: routeName,
          active: index + 1 === pathSegments.length,
        })
      }
      // Return the accumulated breadcrumbs
      return acc
    }, []) // Initialize the accumulator

    // Prepend the "Home" breadcrumb to the start of the breadcrumb array
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)
  return (
    <CBreadcrumb className="my-0">
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            role={!breadcrumb.active ? 'button' : ''}
            className={!breadcrumb.active ? ' text-primary' : ''}
            active={breadcrumb.active}
            key={index}
            onClick={() => !breadcrumb.active && navigate(breadcrumb.pathname)}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
