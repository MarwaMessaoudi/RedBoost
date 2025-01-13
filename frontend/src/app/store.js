import { configureStore } from '@reduxjs/toolkit'
import loginSliceReducer from './features/login/loginSlice'
import registerSliceReducer from './features/register/registerSlice'
import appReducer from './features/appSlice/appSlice'
import userDataReducer from './features/userData/userData'
import eventsReducer from './features/events/events'
import programsSliceReducer from './features/programs/programsSlice'
import entrepreneursReducer from './features/entrepreneursData/entrepreneursSlice' // Add this import
import activityReducer from './features/activity/activitySlice'
import usersReducer from './features/users/usersSlice'
import taskReducer from './features/task/taskSlice'
import routeReducer from './features/routeSlice/routeSlice'
import authReducer from './features/auth/authSlice'
import sessionReducer from "./features/sessions/sessions"
// Configure the Redux store
const store = configureStore({
  reducer: {
    app: appReducer,
    loginSlice: loginSliceReducer,
    registerSlice: registerSliceReducer,
    programsSlice: programsSliceReducer,
    userData: userDataReducer,
    events:eventsReducer,
    entrepreneurs: entrepreneursReducer,
    activity: activityReducer,
    usersSlice: usersReducer,
    task: taskReducer,
    route: routeReducer,
    auth: authReducer,
    sessionsSlice : sessionReducer,
  },
})

export default store
