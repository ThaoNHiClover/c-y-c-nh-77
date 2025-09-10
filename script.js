// Hàm mở modal giỏ hàng (cho nút toggleCart() cũ)
function toggleCart() {
  // Dùng Bootstrap 4 để hiển thị modal
  $('#cartModal').modal('show');
  refreshCart(); // load lại giỏ hàng mỗi khi mở
}

// Link backend Render của bạn
const API_URL = "https://c-y-c-nh-77-2.onrender.com";

// Thêm vào giỏ hàng
async function addToCart(id, name, price) {
  await fetch(`${API_URL}/api/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, price })
  });
  refreshCart();
}

// Cập nhật số lượng
async function updateQty(id, qty) {
  await fetch(`${API_URL}/api/cart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty })
  });
  refreshCart();
}

// Xóa khỏi giỏ hàng
async function removeFromCart(id) {
  await fetch(`${API_URL}/api/cart/${id}`, { method: "DELETE" });
  refreshCart();
}

// Refresh giỏ hàng
async function refreshCart() {
  const res = await fetch(`${API_URL}/api/cart`);
  const data = await res.json();
  updateCart(data);
}

// Cập nhật hiển thị giỏ hàng
function updateCart(cart) {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    total += i.price * i.qty;
    const row = document.createElement("div");
    row.innerHTML = `
      ${i.name} x${i.qty} - ${formatPrice(i.price * i.qty)}
      <button onclick="updateQty(${i.id}, ${i.qty - 1})">-</button>
      <button onclick="updateQty(${i.id}, ${i.qty + 1})">+</button>
      <button onclick="removeFromCart(${i.id})">Xóa</button>
    `;
    container.appendChild(row);
  });
  document.getElementById("cartTotal").innerText = formatPrice(total);
}

// Định dạng tiền tệ VND
function formatPrice(value) {
  return value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// Thanh toán
async function checkout() {
  const res = await fetch(`${API_URL}/api/cart`);
  const cart = await res.json();

  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }

  let summary = "Bạn đã đặt:\n";
  let total = 0;
  cart.forEach(item => {
    summary += `- ${item.name} x${item.qty} = ${formatPrice(item.price * item.qty)}\n`;
    total += item.price * item.qty;
  });

  summary += `\nTổng cộng: ${formatPrice(total)}`;
  alert(summary);

  // Sau khi thanh toán, clear giỏ hàng ở backend
  await fetch(`${API_URL}/api/cart/clear`, { method: "POST" });
  refreshCart();
}





