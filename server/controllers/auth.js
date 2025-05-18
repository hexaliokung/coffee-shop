const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = new PrismaClient()

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    // ตรวจสอบข้อมูลที่ส่งมา
    if (!email) {
      return res.status(400).json({ message: 'กรุณากรอกอีเมล' })
    }
    if (!password) {
      return res.status(400).json({ message: 'กรุณากรอกรหัสผ่าน' })
    }

    // ตรวจสอบว่ามีอีเมลนี้ในระบบแล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'อีเมลนี้มีอยู่ในระบบแล้ว' })
    }

    // เข้ารหัสรหัสผ่าน
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // สร้างผู้ใช้ใหม่
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'user' // กำหนดบทบาทเริ่มต้นเป็น user
      }
    })

    // ลบรหัสผ่านออกจากข้อมูลที่จะส่งกลับ
    const { password: _, ...userWithoutPassword } = user

    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      payload: userWithoutPassword
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // ตรวจสอบข้อมูลที่ส่งมา
    if (!email) {
      return res.status(400).json({ message: 'กรุณากรอกอีเมล' })
    }
    if (!password) {
      return res.status(400).json({ message: 'กรุณากรอกรหัสผ่าน' })
    }

    // ค้นหาผู้ใช้จากอีเมล
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // ตรวจสอบว่ามีผู้ใช้หรือไม่
    if (!user) {
      return res.status(400).json({ message: 'ไม่พบผู้ใช้งานในระบบ' })
    }

    // ตรวจสอบรหัสผ่าน
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' })
    }

    // สร้าง JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    )

    // ลบรหัสผ่านออกจากข้อมูลที่จะส่งกลับ
    const { password: _, ...userWithoutPassword } = user

    res.status(200).json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token,
      payload: userWithoutPassword
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' })
  }
}

exports.currentUser = async (req, res) => {

  try {
    res.send('Hello current user');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' })
  }
}