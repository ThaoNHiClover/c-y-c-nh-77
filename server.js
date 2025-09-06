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
const app = express();

app.get("/", (req, res) => {
  res.send("Hello từ backend Render!");
});

// Render sẽ tự set PORT qua biến môi trường
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server chạy trên port ${PORT}`));

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
