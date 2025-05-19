# Coffee Shop Frontend

## Project Overview
Frontend สำหรับระบบร้านกาแฟออนไลน์ พัฒนาด้วย React และ Vite

## Tech Stack
- React 19.1.0
- Vite 6.3.5
- Zustand (State Management)
- React Router DOM 7.6.0
- Axios
- TailwindCSS 4.1.7 // ใช้ในบางหน้า
- Styled Components 6.1.18 // ใช้ในบางหน้า

## Project Structure
```
client/
├── src/
│ ├── assets/ # รูปภาพ, icons และไฟล์ static อื่นๆ
│ ├── components/ # Reusable components
│ ├── layouts/ # Layout components
│ ├── pages/ # หน้าเว็บต่างๆ
│ │ ├── admin/ # หน้าสำหรับ admin
│ │ ├── auth/ # หน้า login/register
│ │ └── user/ # หน้าสำหรับผู้ใช้ทั่วไป
│ ├── routes/ # การกำหนดเส้นทาง
│ ├── store/ # State management (Zustand)
│ ├── App.jsx # Root component
│ └── main.jsx # Entry point
```

## State Management
ใช้ Zustand สำหรับจัดการ state หลักๆ 2 ส่วน:

### 1. Cart Store (cartStore.js)
```javascript
{
  items: [], // Array ของสินค้าในตะกร้า
  addToCart: (item) => void,    // เพิ่มสินค้าลงตะกร้า
  removeItem: (itemId) => void, // ลบสินค้าออกจากตะกร้า
  updateQuantity: (itemId, quantity) => void, // อัพเดทจำนวนสินค้า
  clearCart: () => void,        // ล้างตะกร้า
  getTotal: () => number        // คำนวณราคารวม
}
```

### 2. Coffee Shop Store (coffee-shop.jsx)
```javascript
{
  user: null,      // ข้อมูลผู้ใช้
  token: null,     // JWT token
  actionLogin: async (form) => Promise // ฟังก์ชัน login
}
```

## Features

### 1. ระบบตะกร้าสินค้า
- เพิ่ม/ลบสินค้า
- อัพเดทจำนวน
- คำนวณราคารวม

### 2. ระบบ Authentication
- Login/Register
- JWT Token Management
- Protected Routes

### 3. ระบบสั่งซื้อ
- สร้างคำสั่งซื้อ
- ดูประวัติการสั่งซื้อ
- ดูใบเสร็จ

### 4. ระบบ Admin
- จัดการสินค้า
- ดูรายการคำสั่งซื้อ
- จัดการผู้ใช้

## API Integration
Base URL: `http://localhost:5001/api`

### Endpoints
- `/login` - Login
- `/register` - Register
- `/products` - จัดการสินค้า
- `/orders` - จัดการคำสั่งซื้อ
- `/users` - จัดการผู้ใช้