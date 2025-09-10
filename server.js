const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// File lưu giỏ hàng
const CART_FILE = path.join(__dirname, "cart.json");

// Hàm đọc giỏ hàng từ file
function loadCart() {
  try {
    if (fs.existsSync(CART_FILE)) {
      const data = fs.readFileSync(CART_FILE, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (err) {
    console.error("❌ Lỗi đọc cart.json:", err);
    return [];
  }
}

// Hàm ghi giỏ hàng ra file
function saveCart(cart) {
  try {
    fs.writeFileSync(CART_FILE, JSON.stringify(cart, null, 2));
  } catch (err) {
    console.error("❌ Lỗi ghi cart.json:", err);
  }
}

// Giỏ hàng load từ file
let cart = loadCart();

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
  const id = req.params.id;
  const { qty } = req.body;

  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty = qty;
    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart(cart); // Lưu sau khi cập nhật
    return res.json({ success: true, cart });
  }

  res.status(404).json({ success: false, msg: "Sản phẩm không tồn tại" });
});

// API: Xóa sản phẩm
app.delete("/api/cart/:id", (req, res) => {
  const id = req.params.id;

  const before = cart.length;
  cart = cart.filter(i => i.id !== id);

  if (cart.length < before) {
    saveCart(cart); // Lưu sau khi xóa
    return res.json({ success: true, cart });
  }

  res.status(404).json({ success: false, msg: "Không tìm thấy sản phẩm để xóa" });
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
// API: Xóa toàn bộ giỏ hàng sau khi checkout
app.post("/api/cart/clear", (req, res) => {
  cart = [];
  res.json({ success: true, cart });
});







