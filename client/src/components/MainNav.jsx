// rafce
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

const MainNav = () => {
  return (
    <nav className='bg-gradient-to-r from-emerald-500 to-lime-500 sticky top-0 z-50 shadow-md backdrop-blur-lg bg-opacity-90'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex justify-between items-center h-20'>

          {/* โลโก้ + ชื่อร้าน */}
          <div className='flex items-center gap-4'>
            <Link to="/" className='flex items-center hover:scale-105 transition-transform duration-300'>
              <img src={logo} alt="Coffee Shop Logo" className="h-12 w-12 object-contain mr-2" />
              <span className='text-2xl font-bold text-white tracking-wide'>กาแฟ 100 ปี</span>
            </Link>
          </div>

          {/* ปุ่ม Register / Login */}
          <div className='flex items-center gap-4'>
            <Link
              to="/register"
              className='text-white text-base font-medium px-4 py-2 rounded-full hover:bg-white hover:text-emerald-600 transition duration-300 border border-white'
            >
              สมัครสมาชิก
            </Link>
            <Link
              to="/login"
              className='text-white text-base font-medium px-4 py-2 rounded-full hover:bg-white hover:text-emerald-600 transition duration-300 border border-white'
            >
              เข้าสู่ระบบ
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default MainNav
