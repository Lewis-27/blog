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
import CreatePostScreen from './screens/CreatePostScreen.jsx'
import EditPostScreen from './screens/EditPostScreen.jsx'
import AllPostsScreen from './screens/AllPostsScreen.jsx'
import UserProfileScreen from './screens/UserProfileScreen.jsx'

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
      <Route path='/users/:id' element={ <UserProfileScreen /> }/>
      <Route path='/posts' element={ <AllPostsScreen /> }/>
      <Route path='/posts/:postId' element={ <PostScreen /> }/>
      <Route path='/posts/:postId/edit' element={ <EditPostScreen /> }/>
      <Route path='/newPost' element={ <CreatePostScreen /> }/>
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
