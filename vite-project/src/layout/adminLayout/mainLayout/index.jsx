import React from 'react'
import Header from '../header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'

export default function mainLayout() {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
