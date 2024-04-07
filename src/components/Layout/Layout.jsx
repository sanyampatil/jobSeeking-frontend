import React from 'react'
import Navbar from './Navbar'
import Home from '../Home/Home'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
