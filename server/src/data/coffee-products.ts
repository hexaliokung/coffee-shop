export const coffeeProducts = [
  {
    name: 'เอสเปรสโซ่',
    price: 45.00, // Schema กำหนดเป็น Decimal(10, 2)
    description: 'กาแฟเข้มข้นแบบดั้งเดิม',
    stock: 10,
    image: '/assets/menu/espresso.jpg',
    category_id: 1 // สมมติว่า 'hot coffee' คือ category_id 1
  },
  {
    name: 'คาปูชิโน่',
    price: 55.00,
    description: 'เอสเปรสโซ่ผสมนมร้อนและโฟม',
    stock: 10,
    image: '/assets/menu/cappuccino.jpg',
    category_id: 1 // สมมติว่า 'hot coffee' คือ category_id 1
  },
  {
    name: 'ลาเต้',
    price: 55.00,
    description: 'เอสเปรสโซ่ผสมนมร้อน',
    stock: 10,
    image: '/assets/menu/latte.jpg',
    category_id: 1 // สมมติว่า 'hot coffee' คือ category_id 1
  },
  {
    name: 'มอคค่า',
    price: 60.00,
    description: 'เอสเปรสโซ่ผสมช็อคโกแลตและนมร้อน',
    stock: 10,
    image: '/assets/menu/mocha.jpg',
    category_id: 1 // สมมติว่า 'hot coffee' คือ category_id 1
  },
  {
    name: 'ไอซ์ลาเต้',
    price: 60.00,
    description: 'ลาเต้เย็น',
    stock: 10,
    image: '/assets/menu/ice-latte.jpg',
    category_id: 2 // สมมติว่า 'cold coffee' คือ category_id 2
  },
  {
    name: 'คาเฟ่ฟราเป้',
    price: 65.00,
    description: 'กาแฟปั่นเย็น',
    stock: 10,
    image: '/assets/menu/frappe.jpg',
    category_id: 2 // สมมติว่า 'cold coffee' คือ category_id 2
  },
  {
    name: 'ไอซ์มอคค่า',
    price: 65.00,
    description: 'มอคค่าเย็น',
    stock: 10,
    image: '/assets/menu/ice-mocha.jpg',
    category_id: 2 // สมมติว่า 'cold coffee' คือ category_id 2
  },
  {
    name: 'คาราเมลมัคคิอาโต้',
    price: 65.00,
    description: 'เอสเปรสโซ่ผสมคาราเมลและนมร้อน',
    stock: 10,
    image: '/assets/menu/caramel-macchiato.jpg',
    category_id: 3 // สมมติว่า 'special drinks' คือ category_id 3
  },
  {
    name: 'วานิลลาไลท์',
    price: 65.00,
    description: 'ลาเต้ผสมวานิลลา',
    stock: 10,
    image: '/assets/menu/vanilla-latte.jpg',
    category_id: 3 // สมมติว่า 'special drinks' คือ category_id 3
  },
  {
    name: 'เฮเซลนัทลาเต้',
    price: 70.00,
    description: 'ลาเต้ผสมเฮเซลนัท',
    stock: 10,
    image: '/assets/menu/hazelnut-latte.jpg',
    category_id: 3 // สมมติว่า 'special drinks' คือ category_id 3
  }
];