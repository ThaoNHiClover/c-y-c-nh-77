<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/popper.min.js"></script>
<script src="js/bootstrap-4.4.1.js"></script>
<script>
	function toggleMenu() {
      document.getElementById("navLinks").classList.toggle("active");
    }

    function toggleCart() {
      alert("Giỏ hàng đang trống!");
  $(document).ready(function(){
    $('#carouselExampleIndicators1').carousel({
      interval: 3000,   // thời gian trượt 3 giây
      ride: 'carousel'  // tự động chạy
    });
  });
</script>

<section id="sanpham">
  <div class="product-grid" id="productGrid"></div>
  </section>
<div class="cart" id="cart">
    <h4>Giỏ hàng</h4>
    <div id="cartItems"></div>
    <div style="margin-top:10px; font-weight:bold;">Tổng: <span id="cartTotal">2tr₫</span></div>
    <button class="checkout" onclick="checkout()">Thanh toán</button>
  </div>

<script>
    const products=[
  {id:1, name:'Mai Vàng', price:2000000, img:'./z6955019100560_6d54f0a3f66a01fdcf86d40726194191.jpg'},
  {id:2, name:'Cây Thần Tài', price:1000000, img:'./z6960935616586_6f8c1dd7078fa264b9e6dd38d5ee05f5.jpg'},
  {id:3, name:'Nha Đam', price:300000, img:'./z6955019166917_40324b5190a866209fc6dad028e5939a.jpg'},
  {id:4, name:'Phong Lan', price:500000, img:'./z6960935788678_994e2e54fadcdfd43221fd8ab68ee75f.jpg'}
];

    const cart=[];

    function formatPrice(num){return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")+'₫';}

    function renderProducts(){
      const grid=document.getElementById('productGrid');
      grid.innerHTML='';
      products.forEach(p=>{
        const el=document.createElement('div');
        el.className='product';
        el.innerHTML=`<img src="${p.img}" alt="${p.name}">
                      <h3>${p.name}</h3>
                      <p>Cây phong thủy cho gia đình</p>
                      <div class="price">${formatPrice(p.price)}</div>
                      <button class="btn-add" onclick="addToCart(${p.id})">Thêm vào giỏ</button>`;
        grid.appendChild(el);
      });
    }

    function addToCart(id){
      const prod=products.find(p=>p.id===id);
      const item=cart.find(i=>i.id===id);
      if(item){item.qty++;}else{cart.push({id:prod.id,name:prod.name,price:prod.price,qty:1});}
      updateCart();
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

    renderProducts();
  </script>
<input type="button" value="LIÊN HỆ" style="background-color: green; color: white;">
<h> Email: </h>
		<input type="email" required>
	<script>
	function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);} </script>
	<h>Telephone:</h>
	<input type="tel" pattern="0[0-9]{9}" required>
	<script>
  // Hàm kiểm tra số điện thoại
  function isValidPhone(phone) {
    const regex = /^(0|\+84)[0-9]{9}$/; // số bắt đầu 0 hoặc +84, sau đó có 9 số
    return regex.test(phone);
  }

  // Hàm ẩn số điện thoại
  function maskPhone(phone) {
    if (!isValidPhone(phone)) {
      return "Số điện thoại không hợp lệ";
    }
    // Ví dụ: 0912345678 => 091****678
    return phone.replace(/(\d{3})(\d{4})(\d{3})/, "$1****$3");
  }

  // Test thử
  const phone = "0912345678";
  console.log(maskPhone(phone)); // Kết quả: 091****678
</script>
	<h>Password: </h>
	<input type="password">
	<script>
		function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}</script>
	

