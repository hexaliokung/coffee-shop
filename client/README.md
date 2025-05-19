# Coffee Shop Frontend

## Project Overview
Frontend สำหรับระบบร้านกาแฟออนไลน์ พัฒนาด้วย React และ Vite

## Tech Stack
- React 19.1.0
- Vite 6.3.5
- Zustand (State Management)
- React Router DOM 7.6.0
- Axios
- TailwindCSS 4.1.7
- Styled Components 6.1.18

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
│ ├── styles/ # Global styles
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

## Getting Started

### 1. ติดตั้ง dependencies
```bash
npm install
```

### 2. รัน development server
```bash
npm run dev
```

### 3. Build สำหรับ production
```bash
npm run build
```

## Environment Variables
สร้างไฟล์ `.env` ในโฟลเดอร์ client:
```env
VITE_API_URL=http://localhost:5001/api
```

## Development Guidelines

### 1. Code Style
- ใช้ ESLint สำหรับ linting
- ใช้ Prettier สำหรับ code formatting

### 2. Component Structure
- ใช้ Functional Components
- ใช้ Hooks สำหรับ state management
- แยก CSS ไปอยู่ในไฟล์แยก

### 3. State Management
- ใช้ Zustand สำหรับ global state
- ใช้ local state สำหรับ component-specific state

### 4. Error Handling
- ใช้ try-catch สำหรับ async operations
- แสดง error messages ด้วย react-toastify

### 5. Performance
- ใช้ React.memo สำหรับ components ที่ re-render บ่อย
- ใช้ useMemo และ useCallback เมื่อจำเป็น

## Deployment

### 1. Build project
```bash
npm run build
```

### 2. Deploy dist folder ไปยัง web server

### 3. ตั้งค่า environment variables บน production server

## Maintenance

### 1. Update dependencies
```bash
npm update
```

### 2. Run tests
```bash
npm test
```

### 3. Check for security vulnerabilities
```bash
npm audit
```

## Contact
สำหรับคำถามหรือปัญหาเกี่ยวกับ frontend:
- Email: [your-email]
- GitHub: [your-github]

## Version History

### v1.0.0 (2024-03-XX)
- Initial release
- Basic features implementation
- Admin dashboard
- Order management



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
