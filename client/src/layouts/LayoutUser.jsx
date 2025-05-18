import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import useCoffeeShopStore from '../store/coffee-shop'
import { toast } from 'react-toastify'
import Footer from '../components/Footer'

const LayoutUser = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    useCoffeeShopStore.setState({ token: null, user: null })
    toast.success('ออกจากระบบสำเร็จ')
    navigate('/')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <nav className='bg-gradient-to-r from-emerald-500 to-lime-500 sticky top-0 z-50 shadow-md backdrop-blur bg-opacity-90'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-between items-center h-16'>

            {/* Logo + เมนูซ้าย */}
            <div className='flex items-center gap-6'>
              <Link to="/user" className='flex items-center hover:scale-105 transition-transform'>
                <img src={logo} alt="Coffee Shop Logo" className="h-10 w-10 object-contain mr-2" />
                <span className='text-white font-semibold text-lg'>กาแฟ 100 ปี</span>
              </Link>

              <Link to="/user/shop" className='text-white hover:text-green-100 transition'>สินค้า</Link>
              <Link to="/user/cart" className='text-white hover:text-green-100 transition'>ตะกร้า</Link>
            </div>

            {/* เมนูขวา */}
            <div className='flex items-center gap-4'>
              <Link to="/user/history" className='text-white hover:text-green-100 transition'>ประวัติการสั่งซื้อ</Link>
              <button
                onClick={handleLogout}
                className='text-white border border-white px-4 py-1 rounded-full hover:bg-white hover:text-emerald-600 transition duration-300'
              >
                ออกจากระบบ
              </button>
            </div>

          </div>
        </div>
      </nav>

      <main className="flex-grow bg-[#fffaf5]">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default LayoutUser
