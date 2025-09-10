const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Giỏ hàng lưu tạm trong RAM
let cart = [];

// Trang chủ test
app.get("/", (req, res) => {
  res.send("✅ Backend đang chạy!");
});

// API: Thêm vào giỏ hàng
app.post("/api/cart/add", (req, res) => {
  const { id, name, price } = req.body;
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  res.json({ success: true, cart });
});

// API: Xem giỏ hàng
app.get("/api/cart", (req, res) => {
  res.json(cart);
});

// API: Cập nhật số lượng
app.put("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { qty } = req.body;
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = qty;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
  }
  res.json(cart);
});

// API: Xóa sản phẩm
app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(i => i.id !== id);
  res.json(cart);
});

// API: Gửi liên hệ
app.post("/api/contact", (req, res) => {
  const { email, phone, message } = req.body;
  console.log("📩 Liên hệ từ:", { email, phone, message });
  res.json({ success: true, msg: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm." });
});

// Chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));


