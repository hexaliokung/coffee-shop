// rafce

// import normal pages
import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/user/Shop'
import OrderHistory from '../pages/user/OrderHistory'
import Receipt from '../pages/Receipt'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import About from '../pages/About'
import Layout from '../layouts/Layout'

// import Admin pages
import LayoutAdmin from '../layouts/LayoutAdmin'
import Dashboard from '../pages/admin/Dashboard'
import Category from '../pages/admin/Category'
import Product from '../pages/admin/Product'
import Manage from '../pages/admin/Manage'

// import User pages
import LayoutUser from '../layouts/LayoutUser'
import HomeUser from '../pages/user/HomeUser'
import AboutUser from '../pages/About'
import Cart from '../pages/user/Cart'

// import Protected Route
import ProtectedRoute from '../components/ProtectedRoute'

const router = createBrowserRouter([
  // สร้างหน้าเว็บที่ไม่ต้อง login ด้วย react-router-dom
  {
    path: '/',
    element:<Layout />,

    // ทำให้ทุกหน้าใน children[] มี Navbar โดยแปลงเป็นลูก
    children:
    [
      { index: true, element:<Home /> }, // This is the root route
      { path: 'shop', element: <Shop /> },
      { path: 'history', element: <OrderHistory />},
      { path: 'receipt', element: <Receipt />},
      { path: 'login', element: <Login />},
      { path: 'register', element: <Register />},
      { path: 'about', element: <About />}
    ]
  },

  // สร้างหน้าเว็บของ Admin ที่ต้อง login ด้วย react-router-dom
  {
    path: '/admin',
    element:<LayoutAdmin />,
    
    // ทำให้ทุกหน้าใน children[] มี NavbarAdmin โดยแปลงเป็นลูก
    children:
    [
      { index: true, element:<Dashboard /> }, // This is the root route
      { path: 'category', element: <Category /> },
      { path: 'product', element: <Product /> },
      { path: 'manage', element: <Manage />}
    ]
  },

  // สร้างหน้าเว็บของ User ที่ต้อง login ด้วย react-router-dom
  {
    path: '/user',
    element: <ProtectedRoute><LayoutUser /></ProtectedRoute>,

    // ทำให้ทุกหน้าใน children[] มี NavbarUser โดยแปลงเป็นลูก
    children:
    [
      { index: true, element:<HomeUser /> }, // This is the root route
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart />},
      { path: 'history', element: <OrderHistory />},
      { path: 'receipt', element: <Receipt />},
      { path: 'about', element: <AboutUser />}
    ]
  }
])

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default AppRoutes