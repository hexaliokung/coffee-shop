const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs');

// ✅ Middleware ต้องอยู่ด้านบนก่อน route
app.use(cors()); // เพื่อให้ frontend เชื่อมต่อได้
app.use(express.json()); // เพื่อให้ req.body ทำงาน
app.use(morgan('dev'));  // สำหรับ log request

const orderRoutes = require('./routes/orders');

app.use('/orders', orderRoutes);

// ✅ ใช้แบบ dynamic จากโฟลเดอร์ routes
readdirSync('./routes').map((item) => {
  app.use('/api', require('./routes/' + item));
});

// ✅ Start Server
app.listen(5001, () => console.log('Server is running on port 5001'));
