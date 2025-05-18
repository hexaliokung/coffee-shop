import React from 'react'
import useCartStore from '../../store/cartStore'
import { useNavigate } from 'react-router-dom'
import './Cart.css'
import axios from 'axios'
import useCoffeeShopStore from '../../store/coffee-shop';

const Cart = () => {
  const navigate = useNavigate()
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotal = useCartStore((state) => state.getTotal)

  const token = useCoffeeShopStore((state) => state.token);

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('กรุณาเพิ่มสินค้าลงตะกร้าก่อนชำระเงิน')
      return
    }
  
    const total = getTotal()
    if (total <= 0) {
      alert('ไม่สามารถชำระเงินได้ กรุณาตรวจสอบรายการสินค้า')
      return
    }
  
    try {
      const response = await axios.post('http://localhost:5001/api/orders', {
        items,     // array ที่ประกอบด้วย id, name, price, quantity
        total,
        status: 'pending'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
  
      // clear ตะกร้า และไปหน้าใบเสร็จ พร้อมส่งข้อมูลการสั่งซื้อ
      clearCart()
      navigate('/user/receipt', { 
        state: { 
          orderData: response.data,
          items: items,
          total: total
        }
      })
    } catch (error) {
      console.error('เกิดข้อผิดพลาดระหว่างชำระเงิน:', error)
      alert('เกิดข้อผิดพลาดระหว่างชำระเงิน')
    }
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">ตะกร้าสินค้า</h1>
      
      {items.length === 0 ? (
        <p className="empty-cart">ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">{item.price} บาท</p>
                </div>
                
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="item-total">
                  <p>{item.price * item.quantity} บาท</p>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  ลบ
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="total">
              <span>ยอดรวมทั้งหมด:</span>
              <span>{total} บาท</span>
            </div>
            <div className="cart-actions">
              <button 
                className="clear-cart-btn"
                onClick={clearCart}
              >
                ล้างตะกร้า
              </button>
              <button 
                className="checkout-btn"
                onClick={handleCheckout}
              >
                ชำระเงิน
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart 