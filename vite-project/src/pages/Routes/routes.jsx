import React from 'react'
import { Route, Routes } from "react-router-dom"
import SiteLayout from '../Layout/site/SiteLayout'
import Home from '../Page/Site/Home'
import About from '../Page/Site/About'
import Contact from '../Page/Site/Contact'
import Products from '../Page/Site/Products'
import NotFound from '../Page/Site/NotFound'
import AdminLayout from '../Layout/admin/AdminLayout'
import Dashboard from '../Page/Admin/Dashboard'
import AddProducts from '../Page/Admin/Addproducts'
import Login from '../Page/Site/Login'
import SignUp from '../Page/Site/SignUp'
import ProtectedRoute from './protectedRoute'
import Basket from '../Page/Site/Basket'
import Wishlist from '../Page/Site/wishlist'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout />} >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="basket" element={<Basket />} />
        <Route path="wishlist" element={<Wishlist />} />
        {/* <Route path="products" element={<Products />} /> */}
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="addproducts" element={<AddProducts />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

    </Routes>
  )
}

export default AppRoutes
