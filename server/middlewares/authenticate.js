const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'ไม่ได้รับอนุญาต (token ไม่ถูกต้องหรือขาด token)' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ใช้ key จาก .env
    req.user = decoded; // ใส่ user ลงใน req.user
    next(); // ให้ผ่านไปยัง route ต่อไป
  } catch (error) {
    return res.status(401).json({ message: 'token หมดอายุหรือไม่ถูกต้อง' });
  }
};

module.exports = authenticate;
