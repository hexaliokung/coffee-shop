// rafce
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import useCoffeeShopStore from '../../store/coffee-shop'
import { useNavigate, Link } from 'react-router-dom' // ใช้สำหรับ redirect ไปยังหน้าอื่น

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useCoffeeShopStore((state) => state.actionLogin)
  const user = useCoffeeShopStore((state) => state.user)
  const token = useCoffeeShopStore((state) => state.token)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await actionLogin(form)
      console.log('Login response:', res.data)
      const role = res.data.payload.role
      console.log('User role:', role)
      roleRediract(role)
      toast.success("Welcome Back")
    } catch (error) {
      console.log('Login error:', error)
      const errorMessage = error.response?.data?.message
      toast.error(errorMessage)
    }
  }

  const roleRediract = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate('/user')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          เข้าสู่ระบบ
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          หรือ{' '}
          <Link to="/register" className="font-medium text-green-600 hover:text-green-500">
            สมัครสมาชิกใหม่
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleOnChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleOnChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                เข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login