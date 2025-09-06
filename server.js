// Hàm thêm sản phẩm vào giỏ
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  // kiểm tra nếu sản phẩm đã có trong giỏ thì tăng số lượng
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({...product, qty: 1});
  }

  renderCart();
}

// Hiển thị giỏ hàng
function renderCart() {
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  cartItems.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.textContent = `${item.name} x${item.qty} - ${formatPrice(item.price * item.qty)}`;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = formatPrice(total);
}

// Hàm thanh toán
function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }

  let summary = "Bạn đã đặt:\n";
  cart.forEach(item => {
    summary += `- ${item.name} x${item.qty} = ${formatPrice(item.price * item.qty)}\n`;
  });

  summary += `\nTổng cộng: ${document.getElementById('cartTotal').textContent}`;
  alert(summary);

  // Reset giỏ sau khi thanh toán
  cart = [];
  renderCart();
}




const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = path.join(__dirname, "products.json");

// ----------- PRODUCTS CRUD (lưu file JSON) -----------

// Đọc file JSON
function readData() {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
}

// Ghi file JSON
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

// READ all
app.get("/api/products", (req, res) => {
  const products = readData();
  res.json(products);
});

// CREATE
app.post("/api/products", (req, res) => {
  const products = readData();
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  writeData(products);
  res.json(newProduct);
});

// UPDATE
app.put("/api/products/:id", (req, res) => {
  const products = readData();
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

  products[index] = { ...products[index], ...req.body };
  writeData(products);
  res.json(products[index]);
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  const products = readData();
  const id = parseInt(req.params.id);
  const newList = products.filter(p => p.id !== id);
  writeData(newList);
  res.json({ success: true });
});

// ----------- CART CRUD (lưu tạm trong RAM) -----------
let cart = [];

// READ: lấy giỏ hàng
app.get("/api/cart", (req, res) => {
  res.json(cart);
});

// CREATE: thêm sản phẩm vào giỏ
app.post("/api/cart", (req, res) => {
  const { id, name, price } = req.body;
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  res.json(cart);
});

// UPDATE: chỉnh sửa số lượng
app.put("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { qty } = req.body;

  const item = cart.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Sản phẩm không có trong giỏ" });

  if (qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  } else {
    item.qty = qty;
  }

  res.json(cart);
});

// DELETE: xóa sản phẩm khỏi giỏ
app.delete("/api/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(i => i.id !== id);
  res.json(cart);
});

// CLEAR: làm trống giỏ hàng
app.delete("/api/cart", (req, res) => {
  cart = [];
  res.json({ success: true });
});

// ----------- START SERVER -----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server chạy tại http://localhost:${PORT}`));

