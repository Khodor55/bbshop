fetch('items.json')
.then(response => response.json())
.then(data => {
let laptop = document.querySelector('.laptop');

data.forEach((item, index) => {
    let old_is
    if(item.type == "laptop"){
  if(item.old){
old_is = item.old + '$'
  }else{
    old_is ='' 
  }
        laptop.innerHTML +=`
        
          <div class="card">
                    <div class="img">
                        <img src="${item.img}" alt="">
                    </div>
                    <div class="content">
                        <div class="text">
                            <h1>${item.name}</h1>
                            <p>${item.desc}</p>
                            <span>${item.price}$ <small>${old_is}</small></span>
                        </div>
                        <div class="btns">
                       <!-- <div class='quantity'>
                     <button>-</button>
                        <span>1</span>
                        <button>+</button>
                        </div>
                        -->
                            <button onclick="addToCart(${index})" class='itemBtn'>add to cart</button>
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
