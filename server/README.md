# Coffee Shop Backend API

นี่คือ API เซิร์ฟเวอร์สำหรับแอปพลิเคชัน Coffee Shop สร้างด้วย Node.js, Express และ Prisma

## 🚀 เทคโนโลยีที่ใช้

- Node.js
- Express.js
- Prisma (ORM)
- MySQL (ฐานข้อมูล)
- JWT (การยืนยันตัวตน)
- bcrypt (การเข้ารหัสรหัสผ่าน)
- CORS
- Morgan (การบันทึกข้อมูล)

## 📋 สิ่งที่ต้องมีก่อนเริ่มต้น

- Node.js (เวอร์ชัน 14 หรือสูงกว่า)
- MySQL Community Server
- MySQL Workbench
- npm หรือ yarn

## 🔧 การติดตั้ง

1. ติดตั้ง MySQL:
   - ดาวน์โหลดและติดตั้ง MySQL Community Server จาก [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
   - ดาวน์โหลดและติดตั้ง MySQL Workbench จาก [MySQL Workbench Downloads](https://dev.mysql.com/downloads/workbench/)
   - เปิด MySQL Workbench และเชื่อมต่อกับ MySQL Server
   - สร้างฐานข้อมูลใหม่ชื่อ `coffee-shop` โดยใช้ชื่อผู้ใช้เป็น root และรหัสผ่านเป็น root โดยที่ port เป็น 3306

2. โคลนโปรเจค:
```bash
git clone <repository-url>
cd server
```

3. ติดตั้ง dependencies:
```bash
npm install
```

4. ตั้งค่าตัวแปรสภาพแวดล้อม:
   - สร้างไฟล์ `.env` ในโฟลเดอร์ server พร้อมตัวแปรต่อไปนี้:
```env
DATABASE_URL="mysql://root:root@localhost:3306/coffee-shop"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN=12h
```

5. เริ่มต้นฐานข้อมูล:

   a. ลบ folder prisma/migrations แล้วเปิด terminal ใน folder server

   b. สร้าง schema ใช้คำสั่งต่อไปนี้:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

   c. เพิ่มข้อมูลลงฐานข้อมูล ใช้คำสั่งต่อไปนี้:
   ```bash
   npx ts-node src/scripts/seed-products.ts
   ```

   d. ตรวจสอบว่าทำงาน ใช้คำสั่งต่อไปนี้:
   ```bash
   npx prisma studio
   ```

6. รันเซิร์ฟเวอร์:
```bash
npm run dev
```

## 📚 API Endpoints

### URL หลัก
```
http://localhost:5001
```

### โครงสร้างเส้นทาง
- `/api/*` - API endpoints หลัก
- `/orders` - endpoints สำหรับจัดการคำสั่งซื้อ

### Endpoints ที่สำคัญ
- `POST /api/auth/register` - สมัครผู้ใช้ใหม่
- `POST /api/auth/login` - เข้าสู่ระบบเพื่อรับ JWT
- `GET /api/products` - ดึงรายการเมนู (ไม่ต้องใช้ token)
- `POST /api/orders` - สร้างคำสั่งซื้อ (ต้องใช้ token)

## 🔐 การยืนยันตัวตน

API ใช้ JWT (JSON Web Tokens) สำหรับการยืนยันตัวตน เส้นทางที่ต้องการการป้องกันจะต้องมี JWT token ที่ถูกต้องในส่วนหัว Authorization:

```
Authorization: Bearer <your_token>
```

## 📁 โครงสร้างโปรเจค

```
server/
├── controllers/     # ตัวควบคุมเส้นทาง
├── middlewares/     # middleware ที่กำหนดเอง
├── routes/         # เส้นทาง API
├── prisma/         # โครงสร้างฐานข้อมูลและการย้ายข้อมูล
├── src/            # ไฟล์ต้นฉบับ
└── server.js       # ไฟล์หลักของแอปพลิเคชัน
```

## 🔄 คุณสมบัติของ API

- การยืนยันตัวตนและการอนุญาตผู้ใช้
- การจัดการคำสั่งซื้อ
- การทำงานกับฐานข้อมูลผ่าน Prisma ORM
- การบันทึกข้อมูลคำขอด้วย Morgan
- เปิดใช้งาน CORS สำหรับการเชื่อมต่อกับ frontend

## 🔍 การจัดการข้อผิดพลาด

API ใช้รหัสสถานะ HTTP มาตรฐาน:
- 200: สำเร็จ
- 201: สร้างสำเร็จ
- 400: คำขอไม่ถูกต้อง
- 401: ไม่ได้รับอนุญาต
- 403: ถูกห้าม
- 404: ไม่พบ
- 500: ข้อผิดพลาดภายในเซิร์ฟเวอร์

## 📝 การบันทึกข้อมูล

แอปพลิเคชันใช้ Morgan สำหรับการบันทึกข้อมูลคำขอ HTTP ในโหมดพัฒนา

## 🔒 ความปลอดภัย

- การเข้ารหัสรหัสผ่านด้วย bcrypt
- การยืนยันตัวตนด้วย JWT
- การป้องกัน CORS
- การตรวจสอบข้อมูลนำเข้า

## 🧪 การทดสอบ API

คุณสามารถใช้เครื่องมือเช่น [Postman](https://www.postman.com/) หรือ REST Client เพื่อทดสอบ endpoint ต่างๆ ได้