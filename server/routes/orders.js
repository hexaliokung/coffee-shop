const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router(); // ✅ ต้องมีก่อนใช้ router.post

router.post('/orders', async (req, res) => {
  try {
    const { items, total, status } = req.body;
    const userId = 1; // สมมติยังไม่มีระบบ login

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status,
        items, // เก็บเป็น JSON
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ' });
  }
});

router.get('/orders/history', async (req, res) => {
    try {
      const userId = req.user.id; // Get user ID from authenticated request
  
      const orders = await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });
  
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'ไม่สามารถโหลดประวัติการสั่งซื้อได้' });
    }
  });


module.exports = router;