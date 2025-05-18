const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ดึงประวัติการสั่งซื้อของผู้ใช้
exports.getOrderHistory = async (req, res) => {
  try {
    // TODO: ใช้ userId จาก session/token
    const userId = 1; // ตัวอย่างการกำหนด userId

    const orders = await prisma.order.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'ไม่สามารถดึงประวัติการสั่งซื้อได้' });
  }
};

// สร้างคำสั่งซื้อใหม่
exports.createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;
    // TODO: ใช้ userId จาก session/token
    const userId = 1; // ตัวอย่างการกำหนด userId

    const order = await prisma.order.create({
      data: {
        userId,
        items,
        total,
        status: 'pending'
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'ไม่สามารถสร้างคำสั่งซื้อได้' });
  }
}; 