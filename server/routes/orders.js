const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateToken = require('../middlewares/authMiddleware'); // import middleware
const router = express.Router();

// 🔒 ป้องกันด้วย middleware
router.post('/orders', authenticateToken, async (req, res) => {
  try {
    const { items, total, status } = req.body;
    const userId = req.user.id; // ได้ userId จริงจาก token แล้ว

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status,
        items, // สมมติเป็น JSON หรือ array
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ' });
  }
});

router.get('/orders/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'ไม่สามารถโหลดประวัติการสั่งซื้อได้' });
  }
});

module.exports = router;
