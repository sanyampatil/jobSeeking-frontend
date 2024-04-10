import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
  const [show, setShow] = useState(false)
  const { isAuthorized, setIsAuthorized, user } = useContext(Context)
  const navigateTo = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3581/api/v1/user/logout',
        {
          withCredentials: true
        }
      )
      toast.success(response.data.message)
      setIsAuthorized(false)
      navigateTo('/')
    } catch (error) {
      toast.error(error.response.data.message), setIsAuthorized(true)
    }
  }

  return (
    <nav className='navbarShow'>
      <div className='container'>
        <div className='logo'>
          <p>CareerConnect</p>
        </div>
        <ul className={!show ? 'menu' : 'show-menu menu'}>
          {isAuthorized && (
            <div className='menu'>
              <li>
                <Link to={'/'} onClick={() => setShow(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to={'/job/getall'} onClick={() => setShow(false)}>
                  ALL JOBS
                </Link>
              </li>
              <li>
                <Link to={'/applications/me'} onClick={() => setShow(false)}>
                  {user && user.role === 'Employer'
                    ? "APPLICANT'S APPLICATIONS"
                    : 'MY APPLICATIONS'}
                </Link>
              </li>
              {user && user.role === 'Employer' ? (
                <>
                  <li>
                    <Link to={'/job/post'} onClick={() => setShow(false)}>
                      POST NEW JOB
                    </Link>
                  </li>
                  <li>
                    <Link to={'/job/me'} onClick={() => setShow(false)}>
                      VIEW YOUR JOBS
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </div>
          )}
          {isAuthorized && <button onClick={handleLogout}>LOGOUT</button>}
          {!isAuthorized && (
            <div>
              <Link to='/login'>
                <button>login</button>
              </Link>

              <Link to='/register'>
                <button>register</button>
              </Link>
            </div>
          )}
        </ul>
        <div className='hamburger'>
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
