  async function addToCart(id, name, price) {
  await fetch("http://localhost:3000/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, price })
  });
  refreshCart();
}

async function updateQty(id, qty) {
  await fetch(`http://localhost:3000/api/cart/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qty })
  });
  refreshCart();
}

async function removeFromCart(id) {
  await fetch(`http://localhost:3000/api/cart/${id}`, { method: "DELETE" });
  refreshCart();
}

async function refreshCart() {
  const res = await fetch("http://localhost:3000/api/cart");
  const data = await res.json();
  updateCart(data);
}

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
