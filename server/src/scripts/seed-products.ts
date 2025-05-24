import { PrismaClient } from '@prisma/client';
import { coffeeProducts } from '../data/coffee-products'; // ตรวจสอบว่า path ถูกต้อง

const prisma = new PrismaClient();

async function main() {
  console.log('⏳ เริ่มเพิ่มข้อมูลสินค้า (seeding)...');

  // --- คำแนะนำ: เพิ่มการ seed ข้อมูล Category ก่อน Product ---
  // หากยังไม่มีข้อมูล Category ในฐานข้อมูล คุณควรเพิ่มข้อมูล Category ก่อน
  // ตัวอย่าง (คุณอาจจะต้องสร้างไฟล์ data สำหรับ categories แยกต่างหาก):
  // const categoriesToCreate = [
  //   { id: 1, category_name: 'hot coffee' },
  //   { id: 2, category_name: 'cold coffee' },
  //   { id: 3, category_name: 'special drinks' },
  // ];
  // for (const category of categoriesToCreate) {
  //   try {
  //     await prisma.category.upsert({ // ใช้ upsert เพื่อไม่ให้ error ถ้ามี id อยู่แล้ว
  //       where: { id: category.id },
  //       update: { category_name: category.category_name },
  //       create: { id: category.id, category_name: category.category_name },
  //     });
  //     console.log(`เพิ่ม/อัปเดต Category: ${category.category_name} สำเร็จ`);
  //   } catch (error) {
  //     console.error(`เกิดข้อผิดพลาดในการเพิ่ม Category ${category.category_name}:`, error);
  //   }
  // }
  // console.log('--- เพิ่มข้อมูล Category เสร็จสิ้น ---');
  // --- สิ้นสุดคำแนะนำ ---

  for (const productData of coffeeProducts) { // เปลี่ยนชื่อตัวแปรเป็น productData เพื่อไม่ให้สับสนกับ model Product
    try {
      // ตรวจสอบว่า category_id มีอยู่ใน productData หรือไม่
      if (productData.category_id === undefined) {
        console.warn(`⚠️ ข้ามสินค้า ${productData.name}: ไม่พบ category_id`);
        continue; // ข้ามไป product ถัดไป
      }

      await prisma.product.create({
        data: {
          name: productData.name,
          price: productData.price, // Prisma จะจัดการ Decimal type ให้
          description: productData.description,
          image: productData.image,
          stock: productData.stock,
          // แก้ไขตรงนี้: เปลี่ยนจาก type เป็น category_id
          // และใช้ productData.category_id ที่มาจากไฟล์ข้อมูล
          category_id: productData.category_id
          // หรือถ้าต้องการใช้ connect syntax (ให้ผลเหมือนกัน):
          // category: {
          //   connect: { id: productData.category_id }
          // }
        }
      });
      console.log(`✅ เพิ่มสินค้า "${productData.name}" สำเร็จ`);
    } catch (error: any) { // ระบุ type ของ error เพื่อเข้าถึง property
      // ตรวจสอบว่าเป็น Foreign Key Constraint Error หรือไม่
      if (error.code === 'P2003' && error.meta?.field_name?.includes('category_id')) {
        console.error(
          `❌ เกิดข้อผิดพลาดในการเพิ่มสินค้า "${productData.name}": ไม่พบ Category ID ${productData.category_id} ในฐานข้อมูล โปรดตรวจสอบว่า Category นี้มีอยู่จริง`
        );
      } else if (error.code === 'P2002' && error.meta?.target?.includes('name')) { // สมมติว่า name เป็น unique
         console.error(
          `❌ เกิดข้อผิดพลาดในการเพิ่มสินค้า "${productData.name}": สินค้านี้มีชื่อซ้ำในระบบแล้ว`
        );
      }
      else {
        console.error(`❌ เกิดข้อผิดพลาดในการเพิ่มสินค้า "${productData.name}":`, error.message);
      }
    }
  }

  console.log('🏁 เพิ่มข้อมูลสินค้าเสร็จสิ้น');
}

main()
  .catch((error) => {
    console.error('❌ เกิดข้อผิดพลาดร้ายแรงในระหว่างการ seed ข้อมูล:', error);
    process.exit(1);
  })
  .finally(async () => {
    console.log('🔌 ปิดการเชื่อมต่อ Prisma...');
    await prisma.$disconnect();
    console.log('🚪 การเชื่อมต่อ Prisma ปิดเรียบร้อย');
  });