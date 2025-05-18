// rafce
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Home.css'
import styled from 'styled-components'
import useCartStore from '../../store/cartStore'
import axios from 'axios'

const MenuCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`

const MenuImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

const MenuContent = styled.div`
  padding: 1.5rem;
`

const MenuTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
`

const MenuDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`

const MenuPrice = styled.p`
  color: #e67e22;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(to right, #e67e22, #f39c12);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`

// ... other styled components ...

const HomeUser = () => {
  const navigate = useNavigate()
  const [recommendedItems, setRecommendedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    const fetchRecommendedItems = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get('http://localhost:5001/api/products', {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 5000,
        })
        if (response.data && Array.isArray(response.data)) {
          // เลือกเฉพาะสินค้าที่ต้องการแสดงเป็นเมนูแนะนำ (3 รายการแรก)
          setRecommendedItems(response.data.slice(0, 3))
        } else {
          throw new Error('รูปแบบข้อมูลไม่ถูกต้อง')
        }
      } catch (err) {
        console.error('Error fetching recommended items:', err)
        if (err.code === 'ECONNREFUSED') {
          setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่าเซิร์ฟเวอร์กำลังทำงานอยู่')
        } else if (err.code === 'ETIMEDOUT') {
          setError('การเชื่อมต่อใช้เวลานานเกินไป กรุณาลองใหม่อีกครั้ง')
        } else if (err.response) {
          setError(`เกิดข้อผิดพลาด: ${err.response.data.message || 'ไม่สามารถโหลดข้อมูลสินค้าได้'}`)
        } else {
          setError('เกิดข้อผิดพลาดในการโหลดข้อมูลสินค้า กรุณาลองใหม่อีกครั้ง')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedItems()
  }, [])

  const handleMenuClick = () => {
    navigate('/user/shop')
  }

  const handleAboutClick = () => {
    navigate('/user/about')
    window.scrollTo(0, 0)
  }

  const handleAddToCart = (item) => {
    addItem(item)
    // สามารถเพิ่ม toast notification ได้ที่นี่
  }

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>ยินดีต้อนรับสู่ร้านกาแฟ 100 ปี</h1>
          <p>สัมผัสประสบการณ์กาแฟที่ถ่ายทอดจากรุ่นสู่รุ่น</p>
          <button className="cta-button text-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-400 hover:opacity-90 px-8 py-4 rounded-full shadow-lg" onClick={handleMenuClick}>
            ☕ เริ่มต้นความอร่อยวันนี้ — สั่งซื้อเลย!
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-xl font-semibold text-white mb-2">กาแฟคุณภาพ</h3>
              <p className="text-white/80">คัดสรรเมล็ดกาแฟคุณภาพดีจากแหล่งเพาะปลูกชั้นนำ</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-semibold text-white mb-2">บาริสต้ามืออาชีพ</h3>
              <p className="text-white/80">ชงกาแฟด้วยความชำนาญและใส่ใจในทุกรายละเอียด</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-white mb-2">สูตรดั้งเดิม</h3>
              <p className="text-white/80">รักษารสชาติกาแฟแบบดั้งเดิมที่ถ่ายทอดมา 100 ปี</p>
            </div>
          </div>
        </div>
      </section>

      <section className="recommended-menu bg-amber-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-12">เมนูแนะนำ</h2>
          {loading ? (
            <div className="text-center">กำลังโหลดข้อมูล...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedItems.map((item) => (
                <MenuCard key={item.id} onClick={() => handleAddToCart(item)}>
                  <MenuImage src={item.image} alt={item.name} />
                  <MenuContent>
                    <MenuTitle>{item.name}</MenuTitle>
                    <MenuDescription>{item.description}</MenuDescription>
                    <MenuPrice>{item.price} บาท</MenuPrice>
                  </MenuContent>
                </MenuCard>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="about-preview">
        <div className="about-content">
          <h2>ประวัติศาสตร์ที่ยาวนาน</h2>
          <p>
            ร้านกาแฟของเราเริ่มต้นขึ้นในปี พ.ศ. 2467 
            ด้วยความมุ่งมั่นที่จะสร้างประสบการณ์กาแฟที่ดีที่สุด 
            เรายังคงรักษาคุณภาพและรสชาติแบบดั้งเดิมไว้จนถึงปัจจุบัน
          </p>
          <button className="learn-more-btn" onClick={handleAboutClick}>
            อ่านประวัติเพิ่มเติม
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomeUser