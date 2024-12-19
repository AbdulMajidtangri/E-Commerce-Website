
const menuIcon = document.querySelector('.icon i');
const menuIcon2 = document.querySelector('.profileAndcartAndSearch .icon i');
const slider = document.querySelector('.slider');
const cartIcon = document.querySelector('.cart i');
const cartContainer = document.querySelector('.cart-container');
const sliderCartIcon = document.querySelector('#sliderCart');
const body = document.querySelector('body');
let isSliderVisible = false;
let isCartVisible = false;

function showElement(element) {
    element.style.display = 'block';
}
function hideElement(element) {
    element.style.display = 'none';
}
menuIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    if (isSliderVisible) {
        hideElement(slider);
        isSliderVisible = false;
    } else {
        hideElement(cartContainer); 
        isCartVisible = false;
        showElement(slider);
        isSliderVisible = true;
    }
});
menuIcon2.addEventListener('click', (event) => {
    event.stopPropagation(); 
    if (isSliderVisible) {
        hideElement(slider);
        isSliderVisible = false;
    } else {
        hideElement(cartContainer); 
        isCartVisible = false;
        showElement(slider);
        isSliderVisible = true;
    }
});

cartIcon.addEventListener('click', (event) => {
    event.stopPropagation(); 
    if (isCartVisible) {
        hideElement(cartContainer);
        isCartVisible = false;
    } else {
        hideElement(slider);
        isSliderVisible = false;
        showElement(cartContainer);
        isCartVisible = true;
    }
});

sliderCartIcon.addEventListener('click', (event) => {
    event.stopPropagation(); 
    hideElement(slider); 
    isSliderVisible = false;

    showElement(cartContainer); 
    isCartVisible = true;
});

body.addEventListener('click', () => {
    if (isSliderVisible) {
        hideElement(slider);
        isSliderVisible = false;
    }
    if (isCartVisible) {
        hideElement(cartContainer);
        isCartVisible = false;
    }});
slider.addEventListener('click', (event) => event.stopPropagation());
cartContainer.addEventListener('click', (event) => event.stopPropagation());
//profile
const profileIcon = document.querySelector('.profile'); 
const formModal = document.getElementById('formModal'); ;
const closeModal = document.getElementById('closeModal');
const userForm = document.getElementById('userForm'); 

profileIcon.addEventListener('click', () => {
  formModal.style.display = 'block'; 
});

closeModal.addEventListener('click', () => {
  formModal.style.display = 'none'; 
});

window.addEventListener('click', (event) => {
  if (event.target === formModal) {
    formModal.style.display = 'none';
  }
});

userForm.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Form submitted successfully!');
  formModal.style.display = 'none'; 
});
// Updated Cart Code
document.addEventListener("DOMContentLoaded", function () {
    const addCartButtons = document.querySelectorAll(".addcart");
    const cartContainer = document.getElementById("cartContainer");
    const cartItems = document.getElementById("cartItems");
    const buyNowButton = cartContainer.querySelector(".buy");

    buyNowButton.style.display = "none";

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.style.display = "none";
    document.body.appendChild(notification);

    // Load cart items from localStorage
    loadCartFromLocalStorage();

    addCartButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            const productElement = event.target.closest(".p1, .p2, .lp1, .lp2"); 
            if (productElement) {
                const productName = productElement.querySelector("p").textContent;
                const productPrice = productElement.querySelector("p:nth-of-type(2)").textContent;

                const cartItem = document.createElement("li");
                cartItem.classList.add("cart-item");
                cartItem.innerHTML = `
                    ${productName} - ${productPrice}
                    <button class="remove">Remove</button>
                `;
                cartItems.appendChild(cartItem);

                updateBuyNowButtonVisibility();

                // Save cart to localStorage
                saveCartToLocalStorage();

                showNotification(`${productName} has been added to the cart!`);

                const removeButton = cartItem.querySelector(".remove");
                removeButton.addEventListener("click", function () {
                    cartItem.remove();
                    updateBuyNowButtonVisibility();
                    saveCartToLocalStorage(); // Update localStorage after removal
                });
            }
        });
    });

    function updateBuyNowButtonVisibility() {
        if (cartItems.children.length > 0) {
            buyNowButton.style.display = "inline-block";
        } else {
            buyNowButton.style.display = "none";
        }
    }

    function saveCartToLocalStorage() {
        const cartData = [];
        cartItems.querySelectorAll(".cart-item").forEach((item) => {
            const [name, price] = item.textContent.split(" - ");
            cartData.push({ name: name.trim(), price: price.trim() });
        });
        localStorage.setItem("cart", JSON.stringify(cartData));
    }

    function loadCartFromLocalStorage() {
        const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
        cartData.forEach((item) => {
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                ${item.name} - ${item.price}
                <button class="remove">Remove</button>
            `;
            cartItems.appendChild(cartItem);

            const removeButton = cartItem.querySelector(".remove");
            removeButton.addEventListener("click", function () {
                cartItem.remove();
                updateBuyNowButtonVisibility();
                saveCartToLocalStorage();
            });
        });

        updateBuyNowButtonVisibility();
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = "block";
        notification.classList.add("show");

        setTimeout(() => {
            notification.style.display = "none";
            notification.classList.remove("show");
        }, 3000);
    }
});

// Form Modal Logic
document.addEventListener("DOMContentLoaded", function () {
    const showFormButtons = document.querySelectorAll(".showFormButton");
    const formModal = document.getElementById("formModal");
    const closeModalButton = document.getElementById("closeModal");
    const userForm = document.getElementById("userForm");

    showFormButtons.forEach((button) => {
        button.addEventListener("click", function () {
            formModal.style.display = "flex"; 
        });
    });

    closeModalButton.addEventListener("click", function () {
        formModal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === formModal) {
            formModal.style.display = "none";
        }
    });
    userForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Form submitted successfully!");
        formModal.style.display = "none"; 
        userForm.reset(); 
    });
});

// Product Navigation
document.getElementById('product1').addEventListener('click', function () {
    window.location.href = 'p1.html'; 
});
document.getElementById('product2').addEventListener('click', function () {
    window.location.href = 'p2.html'; 
});
document.getElementById('product3').addEventListener('click', function () {
    window.location.href = 'p3.html'; 
});
document.getElementById('product4').addEventListener('click', function () {
    window.location.href = 'p4.html'; 
});
document.getElementById('product5').addEventListener('click', function () {
    window.location.href = 'p5.html'; 
});
document.getElementById('product6').addEventListener('click', function () {
    window.location.href = 'p6.html'; 
});
document.getElementById('product7').addEventListener('click', function () {
    window.location.href = 'p7.html'; 
});
document.getElementById('launchproduct1').addEventListener('click', function () {
    window.location.href = 'lp1.html'; 
});
document.getElementById('launchproduct2').addEventListener('click', function () {
    window.location.href = 'lp2.html'; 
});
document.getElementById('launchproduct3').addEventListener('click', function () {
    window.location.href = 'lp3.html'; 
});
document.getElementById('launchproduct4').addEventListener('click', function () {
    window.location.href = 'lp4.html'; 
});
