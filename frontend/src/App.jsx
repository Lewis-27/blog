import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { useLocation } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const location = useLocation()
  return (
    <>
      <Header />
      <Outlet />
      {location.pathname === '/404' ? <></> : <Footer />}
      <ToastContainer className='mt-8'/>
    </>
  )
}

export default App
