// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// ประกาศ middleware ชื่อ authenticateToken ซึ่งจะใช้คั่นกลางก่อน route ใดๆ ที่ต้อง login ก่อนเข้าถึง
const authenticateToken = (req, res, next) => {
  // ดึงค่า token ที่ส่งมาจาก header ของ request
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // ตัดคำว่า Bearer ออก

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });
    }

    req.user = user; // แนบ user ไปกับ request
    next();
  });
};

module.exports = authenticateToken;