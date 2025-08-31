


$(document).ready(function(){
  $('#carouselExampleIndicators1').carousel({
    interval: 3000,
    ride: 'carousel'
  });
});

const cart=[];

function formatPrice(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+'₫';
}

function renderProducts(){
  const grid=document.getElementById('productGrid');
  grid.innerHTML='';
  products.forEach(p=>{
    const el=document.createElement('div');
    el.className='product';
    el.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>Cây phong thủy cho gia đình</p>
      <div class="price">${formatPrice(p.price)}</div>
      <button class="btn-add" onclick="addToCart(${p.id})">Thêm vào giỏ</button>`;
    grid.appendChild(el);
  });
}

async function addToCart(id) {
  const prod = products.find(p => p.id === id);

  await fetch("http://localhost:3000/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: prod.id, name: prod.name, price: prod.price })
  });

  const res = await fetch("http://localhost:3000/api/cart");
  const data = await res.json();

  cart.length = 0;
  cart.push(...data);

  updateCart();
  showPopup(`${prod.name} đã được thêm vào giỏ hàng!`);
}

function updateCart(){
  const container=document.getElementById('cartItems');
  container.innerHTML='';
  let total=0;
  cart.forEach(i=>{
    total+=i.price*i.qty;
    const row=document.createElement('div');
    row.className='cart-item';
    row.innerHTML=`<span>${i.name} x${i.qty}</span><span>${formatPrice(i.price*i.qty)}</span>`;
    container.appendChild(row);
  });
  document.getElementById('cartTotal').innerText=formatPrice(total);
}

function toggleCart(){
  const cartBox=document.getElementById('cart');
  cartBox.style.display=(cartBox.style.display==='block')?'none':'block';
}

function checkout(){
  if(cart.length===0){alert('Giỏ hàng trống');return;}
  alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ sớm.');
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPhone(phone) {
  const regex = /^(0|\+84)[0-9]{9}$/;
  return regex.test(phone);
}

function maskPhone(phone) {
  if (!isValidPhone(phone)) {
    return "Số điện thoại không hợp lệ";
  }
  return phone.replace(/(\d{3})(\d{4})(\d{3})/, "$1****$3");
}
// Test thử
console.log(maskPhone("0912345678"));

function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

function showPopup(msg) {
  const popup = document.createElement("div");
  popup.className = "alert alert-success";
  popup.innerText = msg;
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.zIndex = 9999;
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 2000);
}

renderProducts();

