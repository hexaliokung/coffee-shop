import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// เพิ่มสินค้าใหม่
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, price, description, image, stock, type } = req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        image,
        stock: parseInt(stock),
        type
      }
    });

    res.json(product);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'เกิดข้อผิดพลาดในการเพิ่มสินค้า',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// ดึงข้อมูลสินค้าทั้งหมด
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router; 