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
| ├── data/ # mock data
│ ├── layouts/ # Layout components
│ ├── pages/ # หน้าเว็บต่างๆ
│ │ ├── admin/ # หน้าสำหรับ admin
│ │ ├── auth/ # หน้า login/register
│ │ └── user/ # หน้าสำหรับผู้ใช้ทั่วไป
│ ├── routes/ # การกำหนดเส้นทาง
│ ├── store/ # State management (Zustand)
│ ├── App.jsx # Root component
│ ├── config.js # Change between real data and mock data
│ └── main.jsx # Entry point
```

## การใช้งาน Mock Data
ระบบรองรับการใช้งานทั้งกับ backend จริงและ mock data โดยสามารถสลับได้ผ่านไฟล์ `config.js`:

```javascript
// src/config.js
export const config = {
  useMockData: true,  // true = ใช้ mock data, false = ใช้ backend จริง
  apiUrl: 'http://localhost:5001/api'
};
```

### Mock Users
เมื่อเปิดใช้งาน mock data (`useMockData: true`) สามารถใช้บัญชีต่อไปนี้:

เพิ่มเติม ส่วนของ Admin ยังไม่ได้ทำ ยังเข้าใช้ไม่ได้อยู่ครับ

1. บัญชี Admin:
   - Email: admin@example.com
   - Password: admin123

2. บัญชี User:
   - Email: user@example.com
   - Password: user123

### ข้อดีของการใช้ Mock Data
- ทดสอบระบบได้โดยไม่ต้องมี backend
- พัฒนาและทดสอบฟีเจอร์ได้เร็วขึ้น
- ไม่ต้องกังวลเรื่องการเชื่อมต่อกับ backend
- เหมาะสำหรับการพัฒนาและทดสอบ UI/UX

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

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
