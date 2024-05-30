import React from 'react'
import { Route } from 'react-router-dom'
import CompanyAdminLogin from '../Components/CompanyAdmin/CompanyAdminLogin'
import CompanyHome from '../Components/CompanyAdmin/CompanyHome'
import Members from '../Components/CompanyAdmin/Members'
import JobPost from '../Components/CompanyAdmin/JobPost'
import Profile from '../Components/CompanyAdmin/Profile'

export default function CompanyRoutes() {
  return (
    <>
      <Route element={<CompanyHome />} path='/mycompany' />
      <Route element={<CompanyAdminLogin />} path='/mycompany/login' />
      <Route element={<Members />} path='/mycompany/members' />
      <Route element={<JobPost />} path='/mycompany/job' />
      <Route element={<Profile />} path='/mycompany/profile' />
    </>

  )
}
