const { PrismaClient } = require('@prisma/client');
const { coffeeProducts } = require('../data/coffee-products');

const prisma = new PrismaClient();

async function main() {
  console.log('เริ่มเพิ่มข้อมูลกาแฟ...');

  for (const product of coffeeProducts) {
    await prisma.products.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        stock: product.stock,
        type: product.type
      }
    });
    console.log(`เพิ่ม ${product.name} เรียบร้อยแล้ว`);
  }

  console.log('เพิ่มข้อมูลกาแฟเสร็จสมบูรณ์');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });