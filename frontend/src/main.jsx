import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import HomeScreen from './screens/HomeScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import NotFoundScreen from './screens/NotFoundScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import PostScreen from './screens/PostScreen.jsx'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import store from './store.js'
import {Provider} from 'react-redux';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={true} path='/' element={ <HomeScreen /> } />
      <Route path='/login' element={ <LoginScreen /> }/>
      <Route path='/register' element={ <RegisterScreen /> } />
      <Route path='/profile' element={ <ProfileScreen /> } />
      <Route path='/posts/:postId' element={ <PostScreen /> }/>

      <Route path='*' element={<Navigate to='/404'/>} />
      <Route path='/404' element={ <NotFoundScreen /> } />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={ router }/>
    </StrictMode>,
  </Provider>

)
