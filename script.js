// JavaScript Code for E-Commerce Website

// Elements
const cartButtons = document.querySelectorAll('.addcart');
const buyButtons = document.querySelectorAll('.buy');
const cartContainer = document.getElementById('cartContainer');
const cartItemsList = document.getElementById('cartItems');
const formModal = document.getElementById('formModal');
const closeModal = document.getElementById('closeModal');
const userForm = document.getElementById('userForm');
const searchInput = document.getElementById('inputsearch');
const menuIcon = document.querySelectorAll('.icon i');
const navList = document.querySelector('.navs ul');

// Cart items array
let cartItems = [];

// Add to cart functionality
cartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const productCard = button.closest('.p1, .p2, .lp1, .lp2');
    const productName = productCard.querySelector('p').innerText;
    const productPrice = productCard.querySelectorAll('p')[1].innerText;
    const productImage = productCard.querySelector('img.productimage, .launchimg').src;

    const item = { name: productName, price: productPrice, image: productImage };

    // Avoid duplicate items
    if (!cartItems.find(i => i.name === item.name)) {
      cartItems.push(item);
      updateCartUI();
    } else {
      alert('Item already in cart.');
    }
  });
});

// Update cart UI
function updateCartUI() {
  cartItemsList.innerHTML = '';
  cartItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-img">
      <span>${item.name}</span>
      <span>${item.price}</span>
      <button class="removeItem" data-index="${index}">Remove</button>
    `;
    cartItemsList.appendChild(listItem);
  });

  // Remove item event
  const removeButtons = document.querySelectorAll('.removeItem');
  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      cartItems.splice(index, 1);
      updateCartUI();
    });
  });
}

// Open modal on "Buy Now"
buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    formModal.style.display = 'block';
  });
});

// Close modal
closeModal.addEventListener('click', () => {
  formModal.style.display = 'none';
});

// Submit form
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your purchase!');
  userForm.reset();
  formModal.style.display = 'none';
});

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchText = e.target.value.toLowerCase();
  const productCards = document.querySelectorAll('.p1, .p2, .lp1, .lp2');
  productCards.forEach(card => {
    const productName = card.querySelector('p').innerText.toLowerCase();
    if (productName.includes(searchText)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
});

// Mobile menu toggle
menuIcon.forEach(icon => {
  icon.addEventListener('click', () => {
    navList.classList.toggle('active');
  });
});
