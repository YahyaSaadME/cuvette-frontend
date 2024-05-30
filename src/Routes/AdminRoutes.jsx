import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../Components/Admin/AdminHome'
import Company from '../Components/Admin/Company/Company'
import News from '../Components/Admin/News'
import AdminLogin from '../Components/Admin/AdminLogin'
import AddCompany from '../Components/Admin/Company/AddCompany'
import Carousels from '../Components/Admin/Carousels'
import Events from '../Components/Admin/Events'

export default function AdminRoutes() {
  return (
    <>
      <Route element={<Home />} path='/admin/' />
      <Route element={<AdminLogin />} path='/admin/login' />
      <Route element={<Company />} path='/admin/Company' />
      <Route element={<News />} path='/admin/news' />
      <Route element={<AddCompany />} path='/admin/addCompany' />
      <Route element={<Carousels />} path='/admin/carousel' />
      <Route element={<Events />} path='/admin/events' />
    </>

  )
}
