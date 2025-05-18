import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useCoffeeShopStore from '../store/coffee-shop'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const token = useCoffeeShopStore((state) => state.token)
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token)
          const currentTime = Date.now() / 1000
          const timeLeft = decodedToken.exp - currentTime

          // แสดง countdown เมื่อเหลือ 10 วินาที
          if (timeLeft <= 10 && timeLeft > 0) {
            toast.warning(`เซสชันจะหมดอายุใน ${Math.ceil(timeLeft)} วินาที`, {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            })
          }

          if (decodedToken.exp < currentTime) {
            // Token หมดอายุ
            useCoffeeShopStore.setState({ token: null, user: null })
            navigate('/', { replace: true })
          }
        } catch (error) {
          // Token ไม่ถูกต้อง
          useCoffeeShopStore.setState({ token: null, user: null })
          navigate('/', { replace: true })
        }
      }
    }

    // ตรวจสอบ token ทันที
    checkToken()

    // ตั้งเวลาตรวจสอบ token ทุก 1 วินาที
    const interval = setInterval(checkToken, 1000)

    // ล้าง interval เมื่อ component unmount
    return () => clearInterval(interval)
  }, [token, navigate])

  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute