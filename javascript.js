 <script>
    const products=[
      {id:1,name:'Mai Vàng',price:750000,img:'https://images.unsplash.com/photo-1501004318643-1c2d1c5b1b3f?auto=format&fit=crop&w=600&q=60'},
      {id:2,name:'Cây Thần Tài',price:350000,img:'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=600&q=60'},
      {id:3,name:'Nha Đam',price:150000,img:'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=60'},
      {id:4,name:'Phong Lan',price:500000,img:'https://images.unsplash.com/photo-1518173946685-9a9d4f0e9f0e?auto=format&fit=crop&w=600&q=60'}
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
  </script>// JavaScript Document