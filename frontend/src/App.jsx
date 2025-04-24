import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { useLocation } from 'react-router-dom'

const App = () => {
  const location = useLocation()
  return (
    <>
      <Header />
      <Outlet />
      {location.pathname === '/404' ? <></> : <Footer />}
    </>
  )
}

export default App
