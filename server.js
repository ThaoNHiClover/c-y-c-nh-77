
// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let cart = [];

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

// API: Gửi liên hệ
app.post("/api/contact", (req, res) => {
  const { email, phone, message } = req.body;
  console.log("📩 Liên hệ từ:", { email, phone, message });
  res.json({ success: true, msg: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm." });
});

app.listen(3000, () => console.log("✅ Server chạy tại http://localhost:3000"));
