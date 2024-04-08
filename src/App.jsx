import React, { useContext, useEffect } from 'react'
import './App.css'
import { Context } from './main'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import Home from './components/Home/Home'
import Jobs from './components/job/Job'
import JobDetails from './components/job/JobDetail'
import Application from './components/Application/Application'
import MyApplications from './components/Application/MyApplication'
import PostJob from './components/job/PostJob'
// import NotFound from './components/NotFound/NotFound'
import MyJobs from './components/job/Myjobs'
import Layout from './components/Layout/Layout'
const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3581/api/v1/user/getuser',
          {
            withCredentials: true
          }
        )
        setUser(response.data.user)
        setIsAuthorized(true)
      } catch (error) {
        setIsAuthorized(false)
      }
    }
    fetchUser()
  }, [isAuthorized])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/job/getall' element={<Jobs />} />
            <Route path='/job/:id' element={<JobDetails />} />
            <Route path='/application/:id' element={<Application />} />
            <Route path='/applications/me' element={<MyApplications />} />
            <Route path='/job/post' element={<PostJob />} />
            <Route path='/job/me' element={<MyJobs />} />
            {/* <Route path='*' element={<NotFound />} /> */}
          </Route>
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
