import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCalculator,
  cilCursor,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilCursorMove,
  cilUser,
  cilTask,
  cilFork
} from '@coreui/icons'
import { FiActivity } from 'react-icons/fi'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Project Management',
  },
  {
    component: CNavGroup,
    name: 'Database Manager',
    to: 'Database',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add new Contact',
        to: 'category',
      },

      {
        component: CNavItem,
        name: 'All Contact',
        to: 'allContacts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Program Monitoring',
    to: 'Monitoring',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    // items: [
    //   {
    //     component: CNavItem,
    //     name: 'Activities',
    //     to: 'Activities',
    //   },
    //   {
    //     component: CNavItem,
    //     name: 'Task Managment',
    //     to: 'TaskManagment',
    //   },
    // ],
  },
  {
    component: CNavTitle,
    name: 'Inhouse Management',
  },
  {
    component: CNavItem,
    name: 'Tasks Validation',
    to: 'Validation',
    icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Events',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add new event',
        to: 'CreateEvent',
      },
      {
        component: CNavItem,
        name: 'All events',
        to: 'events',
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Marketing',
    to: 'Marketing',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'RedBoost Callendar',
    to: '/Dash/RedBoostCallendar',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'RedBoost Drive',
    to: '/Dash/redboostDrive',
    icon: <CIcon icon={cilFork} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User',
    to: '/Dash/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Latest Activity',
    to: '/Dash/Latest Activity',
    icon: <CIcon icon={cilCursorMove} customClassName="nav-icon" />,
  },
]

export default _nav
