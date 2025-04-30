fetch('items.json')
.then(response => response.json())
.then(data => {
let product_sales = document.querySelector('.product_sales');
data.forEach((item, index) => {
    if(item.old){

        product_sales.innerHTML +=`
        
          <div class="card">
                    <div class="img">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="content">
                        <div class="text">
                            <h1>${item.name}</h1>
                            <p>${item.desc}</p>
                            <span>${item.price}$ <small>${item.old}</small></span>
                        </div>
                        <div class="btns">
                        <div class='quantity'>
                        <button>-</button>
                        <span>1</span>
                        <button>+</button>
                        </div>
                            <button>add to cart</button>
                        </div>
                    </div>
                </div>
        
        `
    }
})
})
.catch(error => {
  console.error('في خطأ:', error);
});
