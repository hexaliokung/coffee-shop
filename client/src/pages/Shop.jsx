// rafce
import React from 'react'
import './Shop.css'
import useCartStore from '../store/cartStore' // import function

const menuItems = {
  hotCoffee: [
    { id: 1, name: 'เอสเปรสโซ่', price: 45, description: 'กาแฟเข้มข้นแบบดั้งเดิม', stock: 10 },
    { id: 2, name: 'คาปูชิโน่', price: 55, description: 'เอสเปรสโซ่ผสมนมร้อนและโฟม', stock: 10 },
    { id: 3, name: 'ลาเต้', price: 55, description: 'เอสเปรสโซ่ผสมนมร้อน', stock: 10 },
    { id: 4, name: 'มอคค่า', price: 60, description: 'เอสเปรสโซ่ผสมช็อคโกแลตและนมร้อน', stock: 10 },
  ],
  coldCoffee: [
    { id: 5, name: 'ไอซ์ลาเต้', price: 60, description: 'ลาเต้เย็น', stock: 10 },
    { id: 6, name: 'คาเฟ่ฟราเป้', price: 65, description: 'กาแฟปั่นเย็น', stock: 10 },
    { id: 7, name: 'ไอซ์มอคค่า', price: 65, description: 'มอคค่าเย็น', stock: 10 },
  ],
  specialDrinks: [
    { id: 8, name: 'คาราเมลมัคคิอาโต้', price: 65, description: 'เอสเปรสโซ่ผสมคาราเมลและนมร้อน', stock: 10 },
    { id: 9, name: 'วานิลลาไลท์', price: 65, description: 'ลาเต้ผสมวานิลลา', stock: 10 },
    { id: 10, name: 'เฮเซลนัทลาเต้', price: 70, description: 'ลาเต้ผสมเฮเซลนัท', stock: 10 },
  ]
}

// สร้าง shop component
// สร้าง button เพื่อเพิ่มสินค้าลงตะกร้า

const Shop = () => {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="shop-container">
      <h1 className="shop-title">เมนูกาแฟ</h1>
      
      
      <section className="menu-section"> 
        <h2>กาแฟร้อน</h2>
        <div className="menu-grid">
          {menuItems.hotCoffee.map((item) => (
            <div key={item.id} className="menu-item">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">{item.price} บาท</p>
              
              <button
                className="add-to-cart-btn"
                onClick={() => addItem(item)}
              >
                เพิ่มลงตะกร้า
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="menu-section">
        <h2>กาแฟเย็น</h2>
        <div className="menu-grid">
          {menuItems.coldCoffee.map((item) => (
            <div key={item.id} className="menu-item">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">{item.price} บาท</p>
              <button 
                className="add-to-cart-btn"
                onClick={() => addItem(item)}
              >
                เพิ่มลงตะกร้า
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="menu-section">
        <h2>เครื่องดื่มพิเศษ</h2>
        <div className="menu-grid">
          {menuItems.specialDrinks.map((item) => (
            <div key={item.id} className="menu-item">
              <h3>{item.name}</h3>
              <p className="description">{item.description}</p>
              <p className="price">{item.price} บาท</p>
              <button 
                className="add-to-cart-btn"
                onClick={() => addItem(item)}
              >
                เพิ่มลงตะกร้า
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Shop