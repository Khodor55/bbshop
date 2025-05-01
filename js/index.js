// show category nav
let category_nav = document.querySelector('.category_nav');
function showCategoryBtn() {
  category_nav.classList.toggle("active");
}

// open and close item card
let item_card = document.querySelector('.item_card');
function openItemCard() {
  item_card.classList.add('active');
}
function closeItemCard() {
  item_card.classList.remove('active');
}

// إضافة المنتج إلى السلة
let allItems = []; // تخزين جميع المنتجات
let total = 0;
let itemCount = 0;

// جلب المنتجات من ملف JSON
fetch('items.json')
  .then(response => response.json())
  .then(data => {
    allItems = data;
      // عرض المنتجات عند تحميل البيانات
  })
  .catch(err => console.error("Error loading items:", err));

// جلب السلة من الـ localStorage إذا كانت موجودة
let cart = JSON.parse(localStorage.getItem('cart')) || [];
itemCount = cart.length;  // عدد العناصر في السلة
total = cart.reduce((sum, item) => sum + item.price, 0);  // حساب السعر الإجمالي
document.querySelector('.item_count').textContent = itemCount;
document.querySelector('.shop_count').textContent = itemCount;
document.querySelector('.total').textContent = `${total}$`;

// دالة لعرض المنتجات


// دالة لإضافة المنتج إلى السلة
function addToCart(index) {
  const item = allItems[index];
  if (!item) return;

  // إضافة المنتج إلى السلة
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));  // حفظ السلة في الـ localStorage

  const center = document.querySelector('.center');
  center.innerHTML += `
    <div class="card">
      <div class="img">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="text">
        <h3>${item.name}</h3>
        <p>quantity: <span class="quantity_in_card">${item.quantity}</span></p>
      </div>
      <div class="content">
        <span>${item.price}$</span>
        <i class="fa-solid fa-trash" onclick="removeItem(this, ${item.price})"></i>
      </div>
    </div>
  `;
  
  // تحديث العدّاد والسعر
  itemCount++;
  total += item.price;
  document.querySelector('.item_count').textContent = itemCount;
  document.querySelector('.shop_count').textContent = itemCount;
  document.querySelector('.total').textContent = `${total}$`;
}

// دالة لحذف عنصر من السلة
function removeItem(el, price) {
  const index = [...el.closest('.center').children].indexOf(el.closest('.card'));
  if (index > -1) {
    cart.splice(index, 1); // إزالة المنتج من السلة
    localStorage.setItem('cart', JSON.stringify(cart));  // تحديث السلة في الـ localStorage
  }

  el.closest('.card').remove();
  itemCount--;
  total -= price;
  document.querySelector('.item_count').textContent = itemCount;
  document.querySelector('.shop_count').textContent = itemCount;
  document.querySelector('.total').textContent = `${total}$`;
}

// دالة لتحميل السلة من الـ localStorage عند تحميل الصفحة
function loadCart() {
  cart.forEach(item => {
    // إعادة إضافة المنتجات من الـ localStorage عند تحميل الصفحة
    const center = document.querySelector('.center');
    center.innerHTML += `
      <div class="card">
        <div class="img">
          <img src="${item.img}" alt="${item.name}">
        </div>
        <div class="text">
          <h3>${item.name}</h3>
          <p>quantity: <span class="quantity_in_card">${item.quantity}</span></p>
        </div>
        <div class="content">
          <span>${item.price}$</span>
          <i class="fa-solid fa-trash" onclick="removeItem(this, ${item.price})"></i>
        </div>
      </div>
    `;
  });
}

// استدعاء دالة تحميل السلة عند تحميل الصفحة
loadCart();
