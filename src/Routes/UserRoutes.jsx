import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Components/Users/Home'
import Login from '../Components/Users/Login'
import Signup from '../Components/Users/Signup'
import Company from '../Components/Users/Company'
import Profile from '../Components/Users/Profile'
import JobView from '../Components/Users/JobView'
import AppliedJobs from '../Components/Users/AppliedJobs'
import Resume from '../Components/Users/Resume'
export default function UserRoutes() {
  return (
    <>
      <Route element={<Home />} path='/' />
      <Route element={<Company />} path='/Company' />
      <Route element={<Login />} path='/login' />
      <Route element={<Signup />} path='/signup' />
      <Route element={<Profile />} path='/profile' />
      <Route element={<Resume />} path='/profile/resume' />
      <Route element={<JobView />} path='/job' />
      <Route element={<AppliedJobs />} path='/jobs/applied' />
    </>

  )
}
