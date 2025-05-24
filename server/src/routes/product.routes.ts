import { Router, Request, Response } from 'express';
import { PrismaClient, Prisma } from '@prisma/client'; // Import Prisma for specific error types if needed

const router = Router();
const prisma = new PrismaClient();

// เพิ่มสินค้าใหม่
router.post('/', async (req: Request, res: Response) => {
  try {
    // 1. เปลี่ยนจากการรับ `type` เป็น `category_id`
    const { name, price, description, image, stock, category_id } = req.body;

    // 3. แก้ไข field ใน `data` ให้ตรงกับ schema (ใช้ category_id)
    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
        description,
        image,
        stock: parseInt(stock),
        category_id: parseInt(category_id)
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
    const products = await prisma.product.findMany({
      include: {
        category: true // จะดึงข้อมูล Category ที่เกี่ยวข้องกับ Product นั้นๆ มาด้วย
      }
    });
    res.json(products);
  } catch (error) {
    console.error('Database error during fetching products:', error);
    res.status(500).json({
      error: 'เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;