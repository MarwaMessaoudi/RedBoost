import React from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import 'core-js'
import {createClient} from '@supabase/supabase-js'
import {SessionContextProvider } from '@supabase/auth-helpers-react'

const supabase = createClient(
  "https://dqclbjtlbhazzvlmqjgm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY2xianRsYmhhenp2bG1xamdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1ODg4MTUsImV4cCI6MjA0OTE2NDgxNX0.UNTebRd_4K4z5WE8nzfwvE26OE4gO3dY6JijU6QM4YY")


import App from './App'
import store from './app/store'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>

    </BrowserRouter>
  </Provider>,
)
