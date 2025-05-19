import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useCoffeeShopStore from '../store/coffee-shop'
import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { config } from '../config'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const token = useCoffeeShopStore((state) => state.token)
  const [countdown, setCountdown] = useState(null)

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        try {
          if (config.useMockData) {
            // For mock tokens, we don't need to check expiration
            return;
          }

          // For real JWT tokens
          const decodedToken = jwtDecode(token)
          const currentTime = Date.now() / 1000
          const timeLeft = decodedToken.exp - currentTime

          // Show countdown when 10 seconds left
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
            // Token expired
            useCoffeeShopStore.setState({ token: null, user: null })
            navigate('/', { replace: true })
          }
        } catch (error) {
          // Invalid token
          useCoffeeShopStore.setState({ token: null, user: null })
          navigate('/', { replace: true })
        }
      }
    }

    // Check token immediately
    checkToken()

    // Set interval to check token every second
    const interval = setInterval(checkToken, 1000)

    // Clear interval when component unmounts
    return () => clearInterval(interval)
  }, [token, navigate])

  if (!token) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute