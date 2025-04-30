// show category nav
let category_nav = document.querySelector('.category_nav');
function showCategoryBtn(){
    category_nav.classList.toggle("active")
}
// open and close item card
let item_card = document.querySelector('.item_card');
function openItemCard(){
    item_card.classList.add('active')
}
function closeItemCard(){
    item_card.classList.remove('active')
}