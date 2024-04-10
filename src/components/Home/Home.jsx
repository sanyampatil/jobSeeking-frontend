import React from 'react'
import { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'
import HeroSection from './HeroSection'
import HowItWorks from './HowItsWorks'
import PopularCategories from './PopularCatogories'
import PopularCompanies from './PopularCompany'

const Home = () => {
  const { isAuthorized } = useContext(Context)
  console.log('isAuth', isAuthorized)
  // if (!isAuthorized) {
  //   return <Navigate to={"/login"} />;
  // }
  return (
    <>
      <section className='homePage page'>
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
    </>
  )
}

export default Home
