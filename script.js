// ==================== CẤU HÌNH BACKEND ====================
// Dùng localhost khi dev, dùng link Render khi deploy
const API_URL = "https://c-y-c-nh-77-2.onrender.com";

// ==================== LOAD SẢN PHẨM ====================
async function loadProducts() {
  try {
    const res = await fetch("product.json"); // file product.json
    const products = await res.json();

    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    products.forEach(p => {
      const div = document.createElement("div");
      div.className = "col-md-3 mb-4";
      div.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${p.image}" class="card-img-top" style="height:200px;object-fit:cover">
          <div class="card-body text-center">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text text-danger font-weight-bold">${formatPrice(p.price)}</p>
            <button class="btn btn-success" onclick="addToCart('${p.id}', '${p.name.replace(/'/g, "\\'")}', ${p.price})">
              🛒 Thêm vào giỏ
            </button>
          </div>
        </div>
      `;
      grid.appendChild(div);
    });
  } catch (err) {
    console.error("❌ Lỗi load product.json:", err);
  }
}

// ==================== HÀM ĐỊNH DẠNG GIÁ ====================
function formatPrice(value) {
  return Number(value).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// ==================== GIỎ HÀNG ====================

// Mở popup giỏ hàng
function toggleCart() {
  const modal = document.getElementById("cartModal");
  if (modal) {
    // Nếu bạn dùng Bootstrap 5:
    const cartModal = new bootstrap.Modal(modal);
    cartModal.show();
  } else {
    alert("Không tìm thấy phần tử #cartModal trong HTML!");
  }
  refreshCart();
}

// Thêm vào giỏ hàng
async function addToCart(id, name, price) {
  try {
    const res = await fetch(`${API_URL}/api/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, price })
    });

    if (!res.ok) throw new Error("Lỗi khi thêm giỏ hàng");

    await refreshCart();
    // Hiện popup ngay khi thêm
    toggleCart();
  } catch (err) {
    console.error("❌ Lỗi addToCart:", err);
    alert("Không thể thêm vào giỏ hàng (kiểm tra backend Render).");
  }
}

// Cập nhật số lượng
async function updateQty(id, qty) {
  if (qty < 1) return removeFromCart(id);
  await fetch(`${API_URL}/api/cart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty })
  });
  refreshCart();
}

// Xóa sản phẩm
async function removeFromCart(id) {
  await fetch(`${API_URL}/api/cart/${id}`, { method: "DELETE" });
  refreshCart();
}

// Lấy giỏ hàng từ backend
async function refreshCart() {
  try {
    const res = await fetch(`${API_URL}/api/cart`);
    const data = await res.json();
    updateCart(data);
  } catch (err) {
    console.error("❌ Lỗi refreshCart:", err);
  }
}

// Render giỏ hàng trong popup
function updateCart(cart) {
  const container = document.getElementById("cartItems");
  container.innerHTML = "";
  let total = 0;

  if (!cart || cart.length === 0) {
    container.innerHTML = "<p>🛒 Giỏ hàng trống!</p>";
    document.getElementById("cartTotal").innerText = formatPrice(0);
    return;
  }

  cart.forEach(i => {
    total += i.price * i.qty;
    const row = document.createElement("div");
    row.className = "d-flex justify-content-between align-items-center mb-2";
    row.innerHTML = `
      <div>${i.name} x${i.qty} - ${formatPrice(i.price * i.qty)}</div>
      <div>
        <button class="btn btn-sm btn-outline-secondary" onclick="updateQty('${i.id}', ${i.qty - 1})">-</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="updateQty('${i.id}', ${i.qty + 1})">+</button>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart('${i.id}')">Xóa</button>
      </div>
    `;
    container.appendChild(row);
  });

  document.getElementById("cartTotal").innerText = formatPrice(total);
}

// Thanh toán
async function checkout() {
  const res = await fetch(`${API_URL}/api/cart`);
  const cart = await res.json();

  if (cart.length === 0) {
    alert("🛒 Giỏ hàng đang trống!");
    return;
  }

  let summary = "✅ Bạn đã đặt:\n";
  let total = 0;
  cart.forEach(item => {
    summary += `- ${item.name} x${item.qty} = ${formatPrice(item.price * item.qty)}\n`;
    total += item.price * item.qty;
  });

  summary += `\nTổng cộng: ${formatPrice(total)}`;
  alert(summary);

  await fetch(`${API_URL}/api/cart/clear`, { method: "POST" });
  refreshCart();
}

// ==================== KHI LOAD TRANG ====================
window.onload = () => {
  loadProducts();
  refreshCart();
};




