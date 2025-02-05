import path from 'path';
import { element } from 'prop-types'
import React from 'react'

const EntrepreneursTable = React.lazy(() => import('./views/entrepeneur/entrepeneursTable'));
const EntrepreneurDetails = React.lazy(() => import('./views/entrepeneur/entrepeneurDetails'));
const CategoryMain = React.lazy(() => import('./views/category/categoryMain'));
const AddCategoryPage = React.lazy(() => import('./views/category/addCategory'));
const AllContacts = React.lazy(() => import('./views/contacts/AllContacts'));
const MarketingDashboard = React.lazy(() => import('./views/marketing/marketingDashboard'));
const EmailForm = React.lazy(() => import('./views/marketing/emailForm'));
const ThemesScreen = React.lazy(() => import('./views/marketing/themes/themesScreen'));
const newspaperComposer =React.lazy(()=> import('./views/marketing/newspaper/newspaperComposer'))
const TaskDetails = React.lazy(()=>import('./components/ProgramMonitoring/TaskDetails'))
const UserDetails = React.lazy(()=>import('./views/dashboard/UserDetails'))

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Events = React.lazy(() => import('./components/Events/Events'))
const CreateEvents = React.lazy(() => import('./components/Events/CreateEvent'))
const User = React.lazy(() => import('./components/profile/UserProfile'))
const EntrepConacts = React.lazy(() => import('./components/contacts/EntrepConacts'))
const ProgramCards = React.lazy(() => import('./components/ProgramMonitoring/ProgramCards'))
const MainDatabaseManager = React.lazy(() => import('./views/dataBaseManager/MainDatabaseManager'))
const CreateContact = React.lazy(() => import('./views/contacts/CreateContact'))

const Users = React.lazy(() => import('./views/users/users'))
const TaskValidation = React.lazy(() => import('./views/TaskValidation/TaskValidation'))
const MobilisationStatistics = React.lazy(() => import('./views/Statistics/MobilisationStatistics'))
const Avancement = React.lazy(() => import('./views/Statistics/Avancement'))
const Participation  = React.lazy(() => import('./views/Statistics/Participation'))
const Evaluation  = React.lazy(() => import('./views/Statistics/Evaluation'))
const ProfileParticipant  = React.lazy(() => import('./views/Statistics/ProfileParticipant'))
const Parteneriats = React.lazy(() => import('./views/Statistics/Parteneriats'))
const Logistique = React.lazy(() => import('./views/Statistics/Logistique'))
const Media = React.lazy(() => import('./views/Statistics/Media'))
const reportingScreen =React.lazy(()=> import('./views/reporting/reportingScreen'))
const FileUpload =React.lazy(()=> import('./components/FileUpload'))
const redboostDrive =React.lazy(()=> import('./views/drive/redboostDrive'))
const RedBoostCallendar =React.lazy(()=> import('./views/redBoostCallendar/RedBoostCallendar'))


const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/Dash', exact: true, name: 'Home', element: Dashboard },
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/user', name: 'User', element: User },
  { path: '/Database', name: 'Database Manager', element: MainDatabaseManager },
  {
    path: '/Monitoring',
    name: 'Program Monitoring',
    element: ProgramCards,
  },
  { path: '/users', name: 'Users', element: Users },
  { path: '/events', name: 'All events', element: Events },
  { path: '/Validation', name: 'Validation', element: TaskValidation },
  { path: '/CreateEvent', name: 'Create Events', element: CreateEvents },
  { path: '/CreateContact', name: 'Create Contact', element: CreateContact },
  { path: '/allContacts', name: 'All Contacts', element: AllContacts },
  { path: '/Contacts/EntrepConacts', name: 'Entrepreneurs Contacts', element: EntrepConacts },
  {
    path : '/statistics/mobilisation',
    name : 'MobilisationStatistics',
    element : MobilisationStatistics
  },
  {
    path : '/statistics/avancement',
    name : 'Avancement',
    element : Avancement
  },
  {
    path : '/statistics/participation',
    name : 'Participation',
    element : Participation
  },
  {
    path : '/statistics/evaluation',
    name : 'Evaluation',
    element : Evaluation
  },
  {
    path : '/statistics/profileparticipant',
    name : 'ProfileParticipant',
    element : ProfileParticipant
  },
  {
    path : '/statistics/parteneriats',
    name : 'Parteneriats',
    element : Parteneriats
  },
  {
    path : '/statistics/logistique',
    name : 'Logistique',
    element : Logistique
  },
  {
    path : '/statistics/media',
    name : 'Media',
    element : Media
  },
  { path: '/entrepeneurs', name: 'Entrepeneurs', element: EntrepreneursTable },
  { path: '/entrepeneurs/:id', name: ' entrepeneur', element: EntrepreneurDetails},
  { path: '/category', name: ' categories', element: CategoryMain },
  { path: '/addCategory', name: 'category', element: AddCategoryPage },

  { path: '/Marketing', name: 'Marketing', element: MarketingDashboard },
  { path: '/EmailForm', name: 'Email', element: EmailForm },
  { path: '/SuggestedThemes', name: 'Email', element: ThemesScreen },
  {path:'/NewspaperComposer', name:'AI generated composer', element: newspaperComposer},

  { path: '/users/:id', name: 'UserDetails', element: UserDetails },
  { path: '/:taskId', name: 'TaskDetails', element: TaskDetails},
  {path:'/Reporting', name:'Reporting', element: reportingScreen},
  {path:'/fileupload', name:'test upload', element: FileUpload},

  {path:'/redboostDrive', name:'Redboost Drive', element: redboostDrive},
  {path:'/RedBoostCallendar', name:'RedBoost Callendar', element: RedBoostCallendar}


]

export default routes

