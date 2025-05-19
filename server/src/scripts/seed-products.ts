import { PrismaClient } from '@prisma/client';
import { coffeeProducts } from '../data/coffee-products';

const prisma = new PrismaClient();

async function main() {
  console.log('เริ่มเพิ่มข้อมูลสินค้า...');
  
  for (const product of coffeeProducts) {
    try {
      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          description: product.description,
          image: product.image,
          stock: product.stock,
          type: product.type
        }
      });
      console.log(`เพิ่มสินค้า ${product.name} สำเร็จ`);
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการเพิ่มสินค้า ${product.name}:`, error);
    }
  }
  
  console.log('เพิ่มข้อมูลสินค้าเสร็จสิ้น');
}

main()
  .catch((error) => {
    console.error('เกิดข้อผิดพลาด:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 