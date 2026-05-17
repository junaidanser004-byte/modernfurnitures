let cart = [];


// ── NAVIGATION HISTORY ──
let navHistory = [];


function navigateTo(fn) {
navHistory.push(fn);
fn();
// Show back button whenever we're not on home
const backBtn = document.getElementById('backBtnWrap');
if (backBtn) backBtn.style.display = navHistory.length > 1 ? 'block' : 'none';
}








function goBack() {
if (navHistory.length > 1) {
 navHistory.pop(); // remove current
 const prev = navHistory[navHistory.length - 1];
 prev(); // go to previous
} else {
 navHistory = [];
 showHome();
}
const backBtn = document.getElementById('backBtnWrap');
if (backBtn) backBtn.style.display = navHistory.length > 1 ? 'block' : 'none';
}








const productData = {
'Sofa': {
 img: 'https://m.media-amazon.com/images/I/812EhSvR2dL.jpg',
 price: 5000,
 description: 'A luxurious modern sofa crafted for comfort and elegance. Perfect centerpiece for any living room.',
 specs: { Material: 'Premium Velvet Fabric', Dimensions: '220 x 90 x 85 cm', Color: 'Beige / Ivory', Seating: '3-Seater', Warranty: '2 Years' }
},
'Chair': {
 img: 'images/02.jpg',
 price: 2000,
 description: 'Elegant accent chair with sculpted shell back and gold-finish legs.',
 specs: { Material: 'Boucle Fabric & Gold Metal', Dimensions: '75 x 80 x 90 cm', Color: 'Cream / Gold', Seating: '1-Seater', Warranty: '1 Year' }
},
'Table': {
 img: 'images/03.jpg',
 price: 1500,
 description: 'Minimalist solid wood coffee table with a warm natural finish.',
 specs: { Material: 'Solid Oak Wood', Dimensions: '120 x 60 x 45 cm', Color: 'Portobello Oak', Style: 'Scandinavian', Warranty: '1 Year' }
},
'Bed': {
 img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop',
 price: 8000,
 description: 'King-size upholstered bed with a tufted headboard and solid wood frame.',
 specs: { Material: 'Linen & Solid Wood', Dimensions: '210 x 200 x 140 cm', Size: 'King', Color: 'Light Grey', Warranty: '3 Years' }
},
'L-Shape Sofa': {
 img: 'https://www.daals.co.uk/cdn/shop/files/BOSF-9381-TAUPE-BOU-5ST-LS_scene1.jpg?v=1762262271&width=2000',
 price: 9500,
 description: 'Spacious L-shape sectional sofa with deep cushioning.',
 specs: { Material: 'High-Density Foam & Fabric', Dimensions: '300 x 200 x 85 cm', Color: 'Taupe / Beige', Seating: '6-Seater', Warranty: '2 Years' }
},
'Wardrobe': {
 img: 'https://images-cdn.ubuy.qa/65a5531ef2d96f188f1d7e36-moumon-glass-wardrobe-closet-with.jpg',
 price: 6500,
 description: 'Spacious 4-door wardrobe with mirrored panels.',
 specs: { Material: 'Engineered Wood & Mirror', Dimensions: '200 x 60 x 220 cm', Doors: '4-Door', Color: 'White / Glass', Warranty: '2 Years' }
},
'Bookshelf': {
 img: 'https://images.thdstatic.com/productImages/3e055fe8-c3de-45c9-ad8c-03b156816cf2/svn/rustic-brown-tribesigns-way-to-origin-bookcases-bookshelves-hd-jw0724-hyf-44_600.jpg',
 price: 1800,
 description: 'Classic 5-tier bookshelf with an open design.',
 specs: { Material: 'Solid Pine Wood', Dimensions: '80 x 30 x 180 cm', Shelves: '5 Tiers', Color: 'Rustic Brown', Warranty: '1 Year' }
},
'Dining Table': {
 img: 'https://cdn.panhomestores.com/cdn-cgi/image/width=354px,quality=70,format=auto,dpr=1/media/catalog/product/0/5/05BUNDLE0012_01_1.JPG',
 price: 4500,
 description: 'Modern dining table with a matte black base and marble-look top.',
 specs: { Material: 'MDF & Steel', Dimensions: '180 x 90 x 76 cm', Seating: '6 Persons', Color: 'Marble / Brown', Warranty: '2 Years' }
},
'Office Chair': {
 img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNkdeuar4L_kX8kfZXWNoQXp4v_rk9aQVMrw&s',
 price: 2800,
 description: 'Ergonomic office chair with lumbar support and breathable mesh back.',
 specs: { Material: 'Mesh & Nylon', Dimensions: '65 x 65 x 115 cm', Adjustable: 'Height & Armrest', Color: 'White / Grey', Warranty: '2 Years' }
},
'Coffee Table': {
 img: 'https://img5.su-cdn.com/cdn-cgi/image/width=750,height=750/mall/file/2024/11/11/2500x2500_ab1d9a75e9680e8a4a78970e05376bf5.jpg',
 price: 1200,
 description: 'Compact round coffee table with a sleek design.',
 specs: { Material: 'Tempered Glass & Steel', Dimensions: '80 x 80 x 42 cm', Shape: 'Square', Color: 'Clear / Gold', Warranty: '1 Year' }
},
'TV Stand': {
 img: 'https://belleze.com/cdn/shop/articles/A_White_TV_Stand_with_Storage_Drawers_ea8d1cbf-b80c-4d43-ba12-c74445e30b3b.jpg?v=1778317385&width=2048',
 price: 2200,
 description: 'Modern TV stand with open shelves and cable management.',
 specs: { Material: 'Engineered Wood', Dimensions: '160 x 40 x 55 cm', 'TV Fit': 'Up to 75"', Color: 'White', Warranty: '1 Year' }
},
'Dresser': {
 img: 'https://imgres.tailbase.com/rzdimg/prods/800/792741_1.jpg',
 price: 3500,
 description: 'Contemporary 6-drawer dresser with smooth-glide drawers.',
 specs: { Material: 'Solid Wood & MDF', Dimensions: '100 x 45 x 120 cm', Drawers: '6 Drawers', Color: 'White / Oak', Warranty: '2 Years' }
},
'Nightstand': {
 img: 'https://www.littletreestore.com/cdn/shop/files/71d-5MLTqoL._AC_SL1500.jpg?v=1718770605&width=1500',
 price: 850,
 description: 'Elegant bedside nightstand with 2 drawers and open shelf for easy access.',
 specs: { Material: 'Solid Wood', Dimensions: '45 x 40 x 55 cm', Drawers: '2 Drawers', Color: 'White', Warranty: '1 Year' }
},
'Recliner': {
 img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_G8gU74wFbRfo66d4Dq8oWAw-jedDpHKG9Q&s',
 price: 3200,
 description: 'Luxury recliner chair with adjustable backrest and footrest for ultimate comfort.',
 specs: { Material: 'Premium Leather', Dimensions: '85 x 90 x 105 cm', Reclining: '150° Adjustable', Color: 'Cognac Brown', Warranty: '2 Years' }
},
'Study Desk': {
 img: 'https://urbanmood.sg/cdn/shop/products/LEX1.jpg?v=1573450563',
 price: 1600,
 description: 'Modern study desk with built-in storage drawers and cable management.',
 specs: { Material: 'Engineered Wood', Dimensions: '140 x 60 x 75 cm', Storage: '2 Drawers', Color: 'White / Oak', Warranty: '1 Year' }
},
'Ottoman': {
 img: 'https://www.rowenandwren.co.uk/cdn/shop/files/240520_Rowen_Wren_AW24Core_S10_ElbertOttoman_RustLinen_073.jpg?v=1726062631',
 price: 950,
 description: 'Versatile upholstered ottoman — use as a footrest, extra seating, or coffee table.',
 specs: { Material: 'Velvet Fabric & Wood', Dimensions: '80 x 80 x 42 cm', Style: 'Modern', Color: 'Rust / Linen', Warranty: '1 Year' }
},
'Shoe Cabinet': {
 img: 'https://qmax.qa/cdn/shop/files/8_33b22f8a-f155-4ae4-ac9e-f9381edf57fe.png?v=1756346355',
 price: 1100,
 description: 'Sleek shoe cabinet with flip-door compartments to keep your entryway tidy.',
 specs: { Material: 'Engineered Wood', Dimensions: '90 x 30 x 100 cm', Capacity: '12 Pairs', Color: 'White', Warranty: '1 Year' }
},
'Console Table': {
 img: 'https://www.humphreymunson.co.uk/app/uploads/2023/10/Humphrey-Munson-_-Handford-Console-Table-_-Portobello-oak-finish1.jpg',
 price: 1400,
 description: 'Slim console table perfect for entryways and hallways with a lower shelf.',
 specs: { Material: 'Solid Oak Wood', Dimensions: '120 x 35 x 80 cm', Shelves: '1 Lower Shelf', Color: 'Portobello Oak', Warranty: '1 Year' }
},
'Display Cabinet': {
 img: 'https://images-cdn.ubuy.co.in/63684aed59ee4b2f334b6b54-famapy-display-cabinet-with-glass-doors.jpg',
 price: 4200,
 description: 'Elegant glass display cabinet with LED lighting to showcase your collectibles.',
 specs: { Material: 'Wood & Tempered Glass', Dimensions: '90 x 40 x 190 cm', Lighting: 'Built-in LED', Color: 'White / Gold', Warranty: '2 Years' }
},
'Bunk Bed': {
 img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWbZKXOEWUOPuGQOzq9mXvJxp5MHj75elgrQ&s',
 price: 5500,
 description: 'Sturdy twin bunk bed with safety rails and integrated ladder, ideal for kids.',
 specs: { Material: 'Solid Pine Wood', Dimensions: '200 x 100 x 165 cm', Size: 'Twin over Twin', Color: 'Natural Pine', Warranty: '3 Years' }
},
'Armchair': {
 img: 'https://www.ikea.com/qa/en/images/products/herrakra-armchair-diseroed-dark-yellow__1213666_pe911202_s5.jpg?f=s',
 price: 2400,
 description: 'Comfortable accent armchair with cushioned seat and stylish tapered legs.',
 specs: { Material: 'Linen Fabric & Beech Wood', Dimensions: '80 x 82 x 88 cm', Style: 'Modern', Color: 'Dark Yellow', Warranty: '2 Years' }
},
'Bar Stool': {
 img: 'https://furniture123.co.uk/Images/780797752MCE005_2_8125575_Supersize.jpg?v=59',
 price: 680,
 description: 'Adjustable height bar stool with footrest, ideal for kitchen counters and bars.',
 specs: { Material: 'Metal & PU Leather', Dimensions: '40 x 40 x 60–80 cm', Height: 'Adjustable', Color: 'Grey / Black', Warranty: '1 Year' }
},
'Side Table': {
 img: 'https://ak1.ostkcdn.com/images/products/is/images/direct/513af267c7375ddcc9e6dec74993193347faf9d7/Narrow-Side-Table-White-Gold-Side-Table-C-Shaped-End-Table-Modern-Bedside-Table-Small-Side-Table-for-Couch-Living-Room.jpg?impolicy=medium',
 price: 750,
 description: 'Compact round side table with marble top and gold metal legs.',
 specs: { Material: 'Marble & Gold Metal', Dimensions: '45 x 45 x 55 cm', Shape: 'C-Shaped', Color: 'White / Gold', Warranty: '1 Year' }
}
};








let currentProduct = null;








const categoryMap = {
'Living Room': ['Sofa', 'L-Shape Sofa', 'Coffee Table', 'TV Stand', 'Recliner', 'Armchair', 'Ottoman', 'Side Table', 'Console Table'],
'Bedroom':     ['Bed', 'Wardrobe', 'Dresser', 'Nightstand', 'Bunk Bed'],
'Dining':      ['Dining Table', 'Chair', 'Bar Stool'],
'Office':      ['Office Chair', 'Bookshelf', 'Table', 'Study Desk'],
'Storage':     ['Wardrobe', 'Bookshelf', 'Dresser', 'Shoe Cabinet', 'Display Cabinet'],
'All':         Object.keys(productData)
};








function showCategories() {
navigateTo(() => {
hideAll();
document.getElementById('categoriesSection').style.display = 'block';
});
}








function filterCategory(category) {
navigateTo(() => {
hideAll();
document.getElementById('productsSection').style.display = 'block';
document.getElementById('productsTitle').innerText = category.toUpperCase();
document.getElementById('ShopMoreWrap').style.display = 'none';








const allowed = categoryMap[category];
document.querySelectorAll('#productGrid > div').forEach(card => {
 const name = card.querySelector('h3').innerText;
 card.style.display = allowed.includes(name) ? 'block' : 'none';
});
});
}








/* ── SAVE / LOAD CART ── */
function saveCart() {
localStorage.setItem('cartData', JSON.stringify(cart));
}








function loadCart() {
const saved = localStorage.getItem('cartData');
if (saved) cart = JSON.parse(saved);
updateCartCount();
}








function updateCartCount() {
 const total = cart.reduce((s, i) => s + i.qty, 0);
  // Navbar cart count
 const cartCount = document.getElementById('cartCount');
 if (cartCount) cartCount.innerText = total;
  // Side panel badge
 const badge = document.getElementById('cartBadge');
 if (badge) badge.innerText = total;
  // Bottom nav badge
 const bnBadge = document.getElementById('bnCartBadge');
 if (bnBadge) bnBadge.innerText = total;
}






/* ── PRODUCT MODAL ── */
function viewProduct(name) {
  window.location.href = 'product.html?product=' + encodeURIComponent(name);
}









function closeProductModal() {
document.getElementById('productModal').style.display = 'none';
currentProduct = null;
}








function addFromModal() {
if (!currentProduct) return;
addtocart(currentProduct.name, currentProduct.price);
let msg = document.getElementById('modalCartMsg');
msg.style.color = '#10b981';
msg.innerText = currentProduct.name + ' added to cart ✔';
}








/* ── TYPEWRITER ── */
function typeWriter(elementId, text, speed, callback) {
let el = document.getElementById(elementId);
if (!el) return;
if (el._typeTimer) clearInterval(el._typeTimer);
el.innerText = '';
let i = 0;
el._typeTimer = setInterval(() => {
  if (i < text.length) {
    el.innerText += text[i];
    i++;
  } else {
    clearInterval(el._typeTimer);
    el._typeTimer = null;
    if (callback) callback();
  }
}, speed);
}




function startTypewriter() {
let sub = document.getElementById('heroSub');
let title = document.getElementById('heroTitle');
 if (!title || !sub) return;
 title.innerText = '';
sub.innerText = '';
sub.style.opacity = '0';




typeWriter('heroTitle', 'Modern Furniture Collection', 80, () => {
  sub.innerText = 'Upgrade your home with style & comfort';
  sub.style.transition = 'opacity 0.8s';
  sub.style.opacity = '1';
});
}




/* ── PAGE NAVIGATION ── */
function hideAll() {
['homeSection','productsSection','aboutSection','cartSection','contactSection','categoriesSection'].forEach(id => {
 const el= document.getElementById(id);
 if (el) el.style.display = 'none';
});
}








function showHome() {
localStorage.setItem('currentPage', 'home');
hideAll();
document.getElementById('homeSection').style.display = 'block';
document.getElementById('productsSection').style.display = 'block';
document.getElementById('productsTitle').innerText = 'OUR COLLECTIONS';




const allCards = document.querySelectorAll('#productGrid > div');
allCards.forEach((card, index) => {
 card.style.display = index <= 4 ? 'block' : 'none';
});
document.getElementById('ShopMoreWrap').style.display = 'block';
startTypewriter();
}








function showProducts() {
localStorage.setItem('currentPage', 'products');
navigateTo(() => {
 hideAll();
 document.getElementById('productsSection').style.display = 'block';
 document.getElementById('productsTitle').innerText = 'ALL PRODUCTS';
 document.querySelectorAll('#productGrid > div').forEach(card => {
   card.style.display = 'block';
 });
 document.getElementById('ShopMoreWrap').style.display = 'none';
});
}








function showAbout() {
localStorage.setItem('currentPage', 'about');
navigateTo(() => {
 hideAll();
 document.getElementById('aboutSection').style.display = 'block';
});
}





        


function showContact() {
localStorage.setItem('currentPage', 'contact');
navigateTo(() => {
hideAll();
document.getElementById('contactSection').style.display = 'block';
});
}








async function submitContact(e) {
e.preventDefault();
const name    = document.getElementById('contactName').value.trim();
const email   = document.getElementById('contactEmail').value.trim();
const subject = document.getElementById('contactSubject')?.value?.trim() || '';
const message = document.getElementById('contactMessage')?.value?.trim() || '';
const msg     = document.getElementById('contactMsg');
msg.style.color='#6b7280'; msg.innerText='Sending...';
try {
  const res  = await fetch(API_BASE + '/contact', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ name, email, subject, message })
  });
  const data = await res.json();
  if (res.ok) {
    msg.style.color='green'; msg.innerText='Thank you, ' + name + '! We will get back to you soon.';
    e.target.reset();
  } else {
    msg.style.color='red'; msg.innerText = data.error || 'Failed to send message ❌';
  }
} catch(err) {
  msg.style.color='red'; msg.innerText='Server error. Make sure backend is running ❌';
}
}








/* ── SLIDE-IN CART PANEL ── */
function openCartPanel() {
renderCartPanel();
document.getElementById('cartPanel').classList.add('open');
document.getElementById('cartOverlay').classList.add('open');
}








function closeCartPanel() {
document.getElementById('cartPanel').classList.remove('open');
document.getElementById('cartOverlay').classList.remove('open');
}




function viewcartpage() {
window.location.href = 'cart.html';
}


function renderCartPanel() {
const box = document.getElementById('cartPanelItems');
let total = 0;








if (cart.length === 0) {
 box.innerHTML = '<div class="cart-empty-msg">Your cart is empty.</div>';
 document.getElementById('cartPanelTotal').innerText = 'QAR 0';
 updateCartCount();
 return;
}








box.innerHTML = '';
cart.forEach((item, index) => {
 const p = productData[item.name];
 const img = p ? p.img : '';
 const itemTotal = item.price * item.qty;
 total += itemTotal;
 box.innerHTML += `
<div class="cp-item">
 <img src="${img}" alt="${item.name}" onerror="this.style.background='#e5e7eb'">
 <div class="cp-item-info">
   <div style="display:flex; justify-content:space-between; align-items:flex-start;">
     <div class="cp-name">${item.name}</div>
     <button class="cp-remove-btn" onclick="removePanelItem(${index})">&#10005;</button>
   </div>
   <div class="qty-control" style="margin:8px 0;">
     <button onclick="changePanelQty(${index},-1)">&#8722;</button>
     <span>${item.qty}</span>
     <button onclick="changePanelQty(${index},1)">&#43;</button>
   </div>
   <div style="display:flex; justify-content:space-between; align-items:center;">
     <div class="cp-price">QAR ${item.price.toLocaleString()}</div>
     <div class="cp-item-price">QAR ${itemTotal.toLocaleString()}</div>
   </div>
 </div>
</div>`;
});








document.getElementById('cartPanelTotal').innerText = 'QAR ' + total.toLocaleString();
updateCartCount();
}








function changePanelQty(index, delta) {
cart[index].qty += delta;
if (cart[index].qty <= 0) cart.splice(index, 1);
saveCart();
renderCartPanel();
}








function removePanelItem(index) {
cart.splice(index, 1);
saveCart();
renderCartPanel();
}








function goCheckoutAll() {
if (cart.length === 0) { 
  alert('Your cart is empty!'); 
  return; 
}
closeCartPanel();
window.location.href = 'checkout.html';
}








/* ── VIEW CART PAGE ── */
function showcart() {
  if (typeof renderFullCart === 'function') renderFullCart();
}








function renderCart() {
const box = document.getElementById('cartItems');
let subtotal = 0;








if (cart.length === 0) {
 box.innerHTML = `
   <div class="cart-page-layout">
     <div>
       <div class="cart-table-header"><span>PRODUCT</span><span>TOTAL</span></div>
       <p style="text-align:center;color:#9ca3af;padding:40px 0;font-size:14px;">Your cart is empty.</p>
     </div>
     <div class="cart-totals-box">
       <h3>CART TOTALS</h3>
       <div class="coupon-toggle" onclick="this.nextElementSibling.classList.toggle('show')">
         <span>Add coupons</span><span>&#8964;</span>
       </div>
       <div class="coupon-open">
         <input type="text" placeholder="Coupon code">
         <button>Apply</button>
       </div>
       <div class="totals-row"><span>Subtotal</span><span>QAR 0</span></div>
       <div class="totals-row"><span>Flat rate</span><span>QAR 50</span></div>
       <div class="totals-row estimated"><span>Estimated total</span><span>QAR 0</span></div>
       <button class="proceed-btn" onclick="window.location.href='checkout.html'">Proceed to Checkout</button>
     </div>
   </div>`;
 document.getElementById('cartTotal').innerText = '';
 return;
}








let rows = '';
cart.forEach((item, index) => {
 const p = productData[item.name];
 const img = p ? p.img : '';
 const itemTotal = item.price * item.qty;
 subtotal += itemTotal;
 rows += `
   <div class="cart-product-row">
     <img src="${img}" alt="${item.name}" onerror="this.style.background='#e5e7eb'">
     <div class="cart-product-info">
       <div class="cp-row-name">${item.name}</div>
       <div class="cp-row-price">QAR ${item.price.toLocaleString()}</div>
       <div class="cart-row-qty" style="margin-top:8px;">
         <button onclick="changeCartQty(${index},-1)">&#8722;</button>
         <span>${item.qty}</span>
         <button onclick="changeCartQty(${index},1)">&#43;</button>
       </div>
     </div>
     <div class="cart-row-total">QAR ${itemTotal.toLocaleString()}</div>
     <button class="cart-row-remove" onclick="removeCartItem(${index})">&#10005;</button>
   </div>`;
});








const estimated = subtotal + 50;
box.innerHTML = `
 <div class="cart-page-layout">
   <div>
     <div class="cart-table-header"><span>PRODUCT</span><span>TOTAL</span></div>
     ${rows}
   </div>
   <div class="cart-totals-box">
     <h3>CART TOTALS</h3>
     <div class="coupon-toggle" onclick="this.nextElementSibling.classList.toggle('show')">
       <span>Add coupons</span><span>&#8964;</span>
     </div>
     <div class="coupon-open">
       <input type="text" placeholder="Coupon code">
       <button>Apply</button>
     </div>
     <div class="totals-row"><span>Subtotal</span><span>QAR ${subtotal.toLocaleString()}</span></div>
     <div class="totals-row"><span>Flat rate</span><span>QAR 50</span></div>
     <div class="totals-row estimated"><span>Estimated total</span><span>QAR ${estimated.toLocaleString()}</span></div>
     <button class="proceed-btn" onclick="proceedCheckout()">Proceed to Checkout</button>
   </div>
 </div>`;
document.getElementById('cartTotal').innerText = '';
}








function changeCartQty(index, delta) {
cart[index].qty += delta;
if (cart[index].qty <= 0) cart.splice(index, 1);
saveCart();
updateCartCount();
renderCart();
}








function removeCartItem(index) {
cart.splice(index, 1);
saveCart();
updateCartCount();
renderCart();
}








function proceedCheckout() {
if (cart.length === 0) { alert('Your cart is empty!'); return; }
const item = cart[0];
const p = productData[item.name];
item.img = p ? p.img : '';
localStorage.setItem('selectedProduct', JSON.stringify(item));
window.location.href = 'checkout.html';
}








/* ── ADD TO CART ── */
function addtocart(name, price) {
let existing = cart.find(i => i.name === name);
if (existing) { existing.qty++; }
else { cart.push({ name, qty: 1, price }); }
saveCart();
updateCartCount();
}

function searchProducts() {
  let input = document.getElementById('searchInput').value.toLowerCase();
  if (input === '') {
    showHome();
    return;
  }

  hideAll();
  document.getElementById('homeSection').style.display = 'block';
  document.getElementById('productsSection').style.display = 'block';
  document.getElementById('productsTitle').innerText = 'SEARCH RESULTS';
  document.getElementById('ShopMoreWrap').style.display = 'none';

  const allNames = Object.keys(productData);
  const matched = allNames.filter(name => name.toLowerCase().includes(input));

  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  if (matched.length === 0) {
    grid.innerHTML = '<p style="color:#6b7280; padding:40px;">No products found.</p>';
    return;
  }

  matched.forEach(name => {
    const p = productData[name];
    grid.innerHTML += `
      <div style="width:200px; background:white; border-radius:12px; padding:14px;
        box-shadow:0 4px 14px rgba(0,0,0,0.08); display:flex; flex-direction:column;">
        <img src="${p.img}" alt="${name}" onclick="viewProduct('${name}')"
          style="cursor:pointer; width:100%; height:150px; object-fit:cover; border-radius:10px;">
        <h3 style="margin:10px 0 4px; font-size:15px; color:#1f2937;">${name}</h3>
        <p style="color:#6b7280; font-size:13px; margin-bottom:10px;">QAR ${p.price.toLocaleString()}</p>
        <button class="btn-view" onclick="viewProduct('${name}')" style="margin-top:auto;">View</button>
      </div>`;
  });
}

/* ── PROFILE ── */
function toggleProfile() {
  const menu = document.getElementById('profileMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function(e) {
  const menu = document.getElementById('profileMenu');
  const btn  = document.getElementById('profileBtn');
  if (menu && menu.style.display === 'block' && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.style.display = 'none';
  }
});

function updateProfileMenu() {
  const token    = localStorage.getItem('token');
  const email    = localStorage.getItem('userEmail');
  const guest    = document.getElementById('menuGuest');
  const userDiv  = document.getElementById('menuUser');
  const emailEl  = document.getElementById('menuEmail');
  const btn      = document.getElementById('profileBtn');
  const mobileLogin  = document.getElementById('mobileMenuLogin');
  const mobileLogout = document.getElementById('mobileMenuLogout');
  if (token && email) {
    if (guest)   guest.style.display   = 'none';
    if (userDiv) userDiv.style.display = 'block';
    if (emailEl) emailEl.innerText     = email;
    const letter = email[0].toUpperCase();
    if (btn) btn.innerHTML = `<span class="profile-avatar">${letter}</span>`;
    if (mobileLogin)  mobileLogin.style.display  = 'none';
    if (mobileLogout) mobileLogout.style.display = 'block';
  } else {
    if (guest)   guest.style.display   = 'block';
    if (userDiv) userDiv.style.display = 'none';
    if (btn) btn.innerHTML = '&#128100;<span class="profile-label"> Profile</span>';
    if (mobileLogin)  mobileLogin.style.display  = 'block';
    if (mobileLogout) mobileLogout.style.display = 'none';
  }
}

async function openMyFeedback() {
  document.getElementById('profileMenu').style.display = 'none';
  const box  = document.getElementById('myReviewsBox');
  const list = document.getElementById('myReviewsList');
  box.style.display = 'flex';
  list.innerHTML = '<div style="color:#9ca3af;font-size:13px;text-align:center;padding:20px;">Loading...</div>';
  const email = localStorage.getItem('userEmail');
  if (!email) { list.innerHTML = '<div style="color:#9ca3af;font-size:13px;">Please log in to see your reviews.</div>'; return; }
  try {
    const res  = await fetch(API_BASE.replace('/api','') + '/api/feedback/user/' + encodeURIComponent(email));
    const data = await res.json();
    if (!Array.isArray(data) || !data.length) {
      list.innerHTML = '<div style="color:#9ca3af;font-size:13px;text-align:center;padding:20px;">No reviews yet. Your feedback will appear here after your order.</div>';
      return;
    }
    const stars = n => '<span style="color:#f59e0b">' + '★'.repeat(n) + '</span><span style="color:#d1d5db">' + '☆'.repeat(5-n) + '</span>';
    list.innerHTML = data.map(f => `
      <div style="background:#f9fafb;border-radius:10px;padding:14px 16px;">
        <div style="font-size:16px;margin-bottom:4px;">${stars(f.rating)}</div>
        ${f.text ? `<p style="font-size:13px;color:#374151;margin-bottom:6px;">"${f.text}"</p>` : ''}
        <div style="font-size:11px;color:#9ca3af;">${new Date(f.createdAt).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</div>
      </div>`).join('');
  } catch(e) {
    list.innerHTML = '<div style="color:#9ca3af;font-size:13px;text-align:center;padding:20px;">Cannot connect to backend.</div>';
  }
}

function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('userEmail');
  document.getElementById('profileMenu').style.display = 'none';
  updateProfileMenu();
}








function toggleModalLoginPassword() {
  const input = document.getElementById('loginPassword');
  const open = document.getElementById('modalLoginEyeOpen');
  const closed = document.getElementById('modalLoginEyeClosed');
  if (input.type === 'password') { input.type = 'text'; open.style.display = 'none'; closed.style.display = ''; }
  else { input.type = 'password'; open.style.display = ''; closed.style.display = 'none'; }
}

function toggleModalRegPassword() {
  const input = document.getElementById('regPassword');
  const open = document.getElementById('modalRegEyeOpen');
  const closed = document.getElementById('modalRegEyeClosed');
  if (input.type === 'password') { input.type = 'text'; open.style.display = 'none'; closed.style.display = ''; }
  else { input.type = 'password'; open.style.display = ''; closed.style.display = 'none'; }
}

function toggleModalNewPassword() {
  const input = document.getElementById('newPassword');
  const open = document.getElementById('modalNewEyeOpen');
  const closed = document.getElementById('modalNewEyeClosed');
  if (input.type === 'password') { input.type = 'text'; open.style.display = 'none'; closed.style.display = ''; }
  else { input.type = 'password'; open.style.display = ''; closed.style.display = 'none'; }
}

function openLogin() {
window.location.href = 'login.html';
}








function openRegister() {
document.getElementById('profileMenu').style.display = 'none';
document.getElementById('registerBox').style.display = 'flex';
document.getElementById('loginBox').style.display = 'none';
}








function closeLogin() { document.getElementById('loginBox').style.display = 'none'; }
function closeRegister() { document.getElementById('registerBox').style.display = 'none'; }








let forgotOtp = '';








function openForgot() {
document.getElementById('loginBox').style.display = 'none';
document.getElementById('forgotBox').style.display = 'flex';
document.getElementById('forgotEmail').value = '';
document.getElementById('forgotOtpField').value = '';
document.getElementById('newPassword').value = '';
document.getElementById('forgotStep2').style.display = 'none';
document.getElementById('forgotMsg').innerText = '';
}








function closeForgot() { document.getElementById('forgotBox').style.display = 'none'; }








async function sendForgotOtp() {
const email = document.getElementById('forgotEmail').value.trim();
const msg   = document.getElementById('forgotMsg');
if (!email) { msg.style.color='red'; msg.innerText='Please enter your email ❌'; return; }
msg.style.color='#6b7280'; msg.innerText='Sending OTP...';
try {
  const res  = await fetch(API_BASE + '/auth/forgot-password', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (res.ok) {
    document.getElementById('forgotStep2').style.display = 'block';
    msg.style.color = 'green'; msg.innerText = data.message || 'OTP sent! Check your email.';
  } else {
    msg.style.color = 'red'; msg.innerText = data.error || 'Failed to send OTP ❌';
  }
} catch(e) {
  msg.style.color='red'; msg.innerText='Server error. Make sure backend is running ❌';
}
}








async function resetPassword() {
const email = document.getElementById('forgotEmail').value.trim();
const otp   = document.getElementById('forgotOtpField').value.trim();
const pass  = document.getElementById('newPassword').value.trim();
const msg   = document.getElementById('forgotMsg');
if (!otp || !pass) { msg.style.color='red'; msg.innerText='Enter OTP and new password ❌'; return; }
try {
  const res  = await fetch(API_BASE + '/auth/reset-password', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, otp, newPassword: pass })
  });
  const data = await res.json();
  if (res.ok) {
    msg.style.color='green'; msg.innerText='Password reset successful ✔';
    setTimeout(() => { closeForgot(); openLogin(); }, 1500);
  } else {
    msg.style.color='red'; msg.innerText = data.error || 'Invalid OTP or Password ❌';
  }
} catch(e) {
  msg.style.color='red'; msg.innerText='Server error. Make sure backend is running ❌';
}
}








async function loginUser() {
const email = (document.getElementById('loginEmail') || document.getElementById('loginEmail'))?.value?.trim();
const pass  = document.getElementById('loginPassword')?.value?.trim();
const msg   = document.getElementById('loginMsg');
if (!email || !pass) { msg.style.color='red'; msg.innerText='Enter Email & Password ❌'; return; }
msg.style.color='#6b7280'; msg.innerText='Logging in...';
try {
  const res  = await fetch(API_BASE + '/auth/login', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, password: pass })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userEmail', data.email);
    msg.style.color='green'; msg.innerText='Login Successful ✔';
    updateProfileMenu();
    setTimeout(() => { closeLogin(); }, 1000);
  } else {
    msg.style.color='red'; msg.innerText = data.error || 'Invalid email or password ❌';
  }
} catch(e) {
  msg.style.color='red'; msg.innerText='Server error. Make sure backend is running ❌';
}
}








let generatedOtp = '';
async function sendOtp() {
const email = document.getElementById('regEmail')?.value?.trim();
const msg   = document.getElementById('registerMsg');
if (!email) { msg.style.color='red'; msg.innerText='Enter your email first ❌'; return; }
msg.style.color='#6b7280'; msg.innerText='Sending OTP...';
try {
  const res  = await fetch(API_BASE + '/auth/send-otp', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email })
  });
  const data = await res.json();
  if (res.ok) {
    msg.style.color='green'; msg.innerText = data.message || 'OTP sent! Check your email.';
  } else {
    msg.style.color='red'; msg.innerText = data.error || 'Failed to send OTP ❌';
  }
} catch(e) {
  msg.style.color='red'; msg.innerText='Server error. Make sure backend is running ❌';
}
}








async function registerUser() {
const email = document.getElementById('regEmail')?.value?.trim();
const otp   = document.getElementById('regOtp')?.value?.trim();
const pass  = document.getElementById('regPassword')?.value?.trim();
const msg   = document.getElementById('registerMsg');
if (!email || !otp || !pass) { msg.style.color='red'; msg.innerText='Fill all fields ❌'; return; }
msg.style.color='#6b7280'; msg.innerText='Registering...';
try {
  const res  = await fetch(API_BASE + '/auth/register', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ email, otp, password: pass })
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userEmail', data.email);
    msg.style.color='green'; msg.innerText='Register Successful ✔';
    updateProfileMenu();
    setTimeout(() => { if (typeof closeRegister === 'function') closeRegister(); }, 1000);
  } else {
    msg.style.color='red'; msg.innerText = data.error || 'Registration failed ❌';
  }
} catch(e) {
  msg.style.color='red'; msg.innerText='Server error. Make sure backend is running ❌';
}
}








/* ── HERO SLIDER ── */
function startHeroSlider() {
const slides = document.querySelectorAll('.hero-slide');
let current = 0;
setInterval(() => {
 slides[current].classList.remove('active');
 current = (current + 1) % slides.length;
 slides[current].classList.add('active');
}, 4000);
}








window.addEventListener('load', () => {
loadCart();
startHeroSlider();
showHome();
updateProfileMenu();
});








/* ── MOBILE MENU ── */
function toggleMobileMenu() {
document.getElementById('mobileMenu').classList.toggle('open');
document.getElementById('mobileMenuOverlay').classList.toggle('open');
}








function closeMobileMenu() {
document.getElementById('mobileMenu').classList.remove('open');
document.getElementById('mobileMenuOverlay').classList.remove('open');
}








/* ── SEARCH MODAL ── */
function toggleBottomSearch() {
const modal = document.getElementById('searchModal');
modal.classList.toggle('open');
if (modal.classList.contains('open')) {
 setTimeout(() => document.getElementById('searchModalInput').focus(), 100);
}
}








function closeSearchModal(event) {
if (event.target === document.getElementById('searchModal')) {
 document.getElementById('searchModal').classList.remove('open');
}
}








function searchFromModal() {
let input = document.getElementById('searchModalInput').value.toLowerCase();
document.getElementById('searchInput').value = input;
searchProducts();
}








/* ── SHOW ALL PRODUCTS ── */
function showAllProducts() {
document.querySelectorAll('#productGrid > div').forEach(card => {
 card.style.display = 'block';
});
document.getElementById('ShopMoreWrap').style.display = 'block';
}








window.onload = function () {
loadCart();
startHeroSlider();








// Restore last visited page
const lastPage = localStorage.getItem('currentPage') || 'home';
restorePage(lastPage);








// Make all card images clickable
document.querySelectorAll('#productGrid > div').forEach(card => {
 const img = card.querySelector('img');
 const name = card.querySelector('h3').innerText;
 if (img) {
   img.style.cursor = 'pointer';
   img.onclick = () => viewProduct(name);
 }
});
};








function restorePage(page) {
switch(page) {
 case 'about':    showAbout();    break;
 case 'contact':  showContact();  break;
 case 'products': showProducts(); break;
 case 'cart':     window.location.href = 'cart.html'; break;
 default:         showHome();     break;
}
}








function toggleApt() {
const wrap = document.getElementById('aptWrap');
const toggle = document.getElementById('aptToggle');
const visible = wrap.style.display === 'block';
wrap.style.display = visible ? 'none' : 'block';
toggle.innerText = visible ? '+ Add apartment, suite, unit, etc.' : '− Remove';
}








function toggleBillApt() {
const wrap = document.getElementById('billAptWrap');
const toggle = document.getElementById('billAptToggle');
const visible = wrap.style.display === 'block';
wrap.style.display = visible ? 'none' : 'block';
toggle.innerText = visible ? '+ Add apartment, suite, unit, etc.' : '− Remove';
}








function toggleBilling() {
  const checked = document.getElementById('sameBilling').checked;
  const section = document.getElementById('billingSection');
  if (section) section.style.display = checked ? 'none' : 'block';
}




window.addEventListener('DOMContentLoaded', function() {
loadCart();
showcart();
 // Hero section only exists on index.html
const heroTitle = document.getElementById('heroTitle');
const heroSub   = document.getElementById('heroSub');
if (heroTitle && heroSub) {
  heroTitle.innerText = 'Modern Furniture Collection';
  heroSub.innerText   = 'Upgrade your home with style & comfort';
  heroSub.style.opacity = '1';
  startTypewriter();
  let slideIndex = 0;
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 0) {
    setInterval(() => {
      slides.forEach(s => s.classList.remove('active'));
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add('active');
    }, 3500);
  }
}
});




function showThanks(reason) {
document.getElementById('thanksMsg').innerText =
  'Thank you for ' + reason + '. We are committed to providing you the best furniture experience in Qatar! 🏠';
document.getElementById('thanksPopup').style.display = 'flex';
}




function closeThanks() {
document.getElementById('thanksPopup').style.display = 'none';
}


function addToCartPage(name, price) {
 addtocart(name, price);
 const msg = document.getElementById('cartSuccessMsg');
 if (msg) {
   msg.innerText = name + ' added to cart ✔';
   msg.style.color = '#10b981';
 }
}

const API_BASE = 'https://modernfurnitures-backend.onrender.com/api';

function toggleFaqHome(el) {
  const answer = el.nextElementSibling;
  const arrow  = el.querySelector('.faq-arrow');
  const isOpen = answer.style.display === 'block';
  document.querySelectorAll('.faq-a').forEach(a => a.style.display = 'none');
  document.querySelectorAll('.faq-arrow').forEach(a => a.style.transform = '');
  if (!isOpen) {
    answer.style.display  = 'block';
    arrow.style.transform = 'rotate(180deg)';
  }
}

function addToWishlist(name) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  if (!wishlist.includes(name)) {
    wishlist.push(name);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }
  const msg = document.createElement('div');
  msg.innerText = '❤️ ' + name + ' added to wishlist!';
  msg.style = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#ec4899;color:white;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;z-index:9999;';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}



