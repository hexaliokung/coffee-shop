// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // ตัดคำว่า Bearer ออก

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is invalid' });
    }

    req.user = user; // ⬅️ แนบ user ไปกับ request
    next();
  });
};

module.exports = authenticateToken;
