import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import HomeScreen from './screens/HomeScreen.jsx'
import NotFoundScreen from './screens/NotFoundScreen.jsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={true} path='/' element={ <HomeScreen /> } />
      <Route path='*' element={<Navigate to='/404'/>} />
        
      <Route path='/404' element={ <NotFoundScreen /> } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={ router }/>
  </StrictMode>,
)
