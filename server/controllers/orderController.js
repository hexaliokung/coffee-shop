// controllers/orderController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createOrder = async (req, res) => {
  try {
    const { items, total, status } = req.body;
    const userId = req.user.id;

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status,
        items,
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้างคำสั่งซื้อ' });
  }
};

exports.getOrderHistory = async (req, res) => {
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
};
