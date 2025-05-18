import React, { useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './Receipt.css'

const Receipt = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { orderData, items, total } = location.state || {}

  useEffect(() => {
    // If there is no order data (after refresh), redirect to shop page
    if (!orderData) {
      navigate('/user/shop')
    }
  }, [orderData, navigate])

  const handleBackToHome = () => {
    navigate('/user')
  }

  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  // Generate a consistent receipt number based on current date and time
  const receiptNumber = useMemo(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    const second = String(now.getSeconds()).padStart(2, '0')
    
    return `${year}${month}${day}${hour}${minute}${second}`
  }, [])

  if (!orderData) {
    return null // หรือ loading state
  }

  return (
    <div className="receipt-container">
      <div className="receipt-paper">
        <div className="receipt-header">
          <h1>ใบเสร็จรับเงิน</h1>
          <div className="shop-info">
            <h2>ร้านกาแฟ 100 ปี</h2>
            <p>519/2 หมู่15 บ่อแฮ้ว เมือง ลำปาง 52100</p>
            <p>โทร: 061-098-0383</p>
          </div>
          <div className="receipt-info">
            <p className="date">วันที่: {currentDate}</p>
            <p className="receipt-number">เลขที่: {receiptNumber}</p>
            <p className="order-id">คำสั่งซื้อ: #{orderData.id}</p>
          </div>
        </div>

        <div className="receipt-items">
          <div className="items-header">
            <span>รายการ</span>
            <span>จำนวน</span>
            <span>ราคา</span>
          </div>
          {items.map((item) => (
            <div key={item.id} className="receipt-item">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">x{item.quantity}</span>
              <span className="item-price">{item.price * item.quantity} บาท</span>
            </div>
          ))}
        </div>

        <div className="receipt-total">
          <div className="total-row">
            <span>ยอดรวมทั้งหมด:</span>
            <span>{total} บาท</span>
          </div>
        </div>

        <div className="receipt-footer">
          <p>ขอบคุณที่ใช้บริการร้านของเรา</p>
          <p>กรุณาเก็บใบเสร็จนี้ไว้เป็นหลักฐาน</p>
        </div>

        <div className="receipt-actions">
          <button 
            className="home-btn"
            onClick={handleBackToHome}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  )
}

export default Receipt 