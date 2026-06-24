const app = document.getElementById("app");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ------------------------
   CART FUNCTIONS
------------------------- */

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount(){

    const count = document.getElementById("cartCount");

    if(count){
        count.textContent = cart.length;
    }
}

function addToCart(id){

    const product = products.find(
        p => p.id === id
    );

    cart.push(product);

    saveCart();

    updateCartCount();

    alert(product.name + " added to cart!");
}

function removeCart(index){

    cart.splice(index,1);

    saveCart();

    updateCartCount();

    cartPage();
}

/* ------------------------
   HOME PAGE
------------------------- */

function homePage(){

app.innerHTML = `

<section class="hero">

<div class="glass-box">

<h1>Luxury Technology Store</h1>

<p>
Discover Apple, Samsung, Sony,
DJI and premium flagship products.
</p>

<a href="#products">
<button>Explore Products</button>
</a>

</div>

</section>

<section class="stats">

<div class="glass-card">
<h2>16+</h2>
<p>Premium Products</p>
</div>

<div class="glass-card">
<h2>25K+</h2>
<p>Happy Customers</p>
</div>

<div class="glass-card">
<h2>4.9★</h2>
<p>Verified Reviews</p>
</div>

<div class="glass-card">
<h2>15+</h2>
<p>Global Brands</p>
</div>

</section>

<section class="categories">

<div class="glass-card">🍎 Apple</div>

<div class="glass-card">📱 Samsung</div>

<div class="glass-card">🎧 Sony</div>

<div class="glass-card">🚁 DJI</div>

</section>

<section class="featured">

<h2>Featured Products</h2>

<div class="products">

${products.slice(0,4).map(product => `

<div class="card">

<img
src="${product.image}"
alt="${product.name}"
onerror="this.src='https://via.placeholder.com/600x400?text=Product+Image'"
>

<div class="card-content">

<h3>${product.name}</h3>

<p>${product.price}</p>

<button onclick="viewProduct(${product.id})">
View
</button>

</div>

</div>

`).join("")}

</div>

</section>
`;
}

/* ------------------------
   PRODUCTS PAGE
------------------------- */

function productPage(){

let html = `

<h2>All Products</h2>

<div class="products">
`;

products.forEach(product => {

html += `

<div class="card">

<img
src="${product.image}"
alt="${product.name}"
onerror="this.src='https://via.placeholder.com/600x400?text=Product+Image'"
>

<div class="card-content">

<h3>${product.name}</h3>

<p>${product.price}</p>

<button onclick="viewProduct(${product.id})">
View
</button>

<button onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>

</div>
`;
});

html += `</div>`;

app.innerHTML = html;
}

/* ------------------------
   PRODUCT DETAILS
------------------------- */

function viewProduct(id){

const p = products.find(
    item => item.id === id
);

app.innerHTML = `

<div class="glass-box">

<h2>${p.name}</h2>

<br>

<img
src="${p.image}"
width="300"
style="
max-width:100%;
border-radius:20px;
"
>

<br><br>

<h3>${p.price}</h3>

<br>

<button onclick="addToCart(${p.id})">
Add To Cart
</button>

<button
onclick="location.hash='products'"
>
Back
</button>

</div>
`;
}

/* ------------------------
   CART PAGE
------------------------- */

function cartPage(){

if(cart.length === 0){

app.innerHTML = `

<div class="glass-box">

<h2>Your Cart Is Empty</h2>

<p>
Add some premium products.
</p>

</div>
`;

return;
}

let total = 0;

let html = `
<h2>Shopping Cart</h2>

<div class="products">
`;

cart.forEach((item,index)=>{

total += Number(
item.price.replace(/[₹,]/g,"")
);

html += `

<div class="card">

<img
src="${item.image}"
alt="${item.name}"
>

<div class="card-content">

<h3>${item.name}</h3>

<p>${item.price}</p>

<button onclick="removeCart(${index})">
Remove
</button>

</div>

</div>
`;
});

html += `
</div>

<br>

<div class="glass-box">

<h2>
Total:
₹${total.toLocaleString()}
</h2>

<br>

<button>
Proceed To Checkout
</button>

</div>
`;

app.innerHTML = html;
}

/* ------------------------
   ABOUT PAGE
------------------------- */

function aboutPage(){

app.innerHTML = `

<div class="glass-box">

<h2>About Us</h2>

<br>

<p>

ShopEase is a modern premium
technology marketplace featuring
Apple, Samsung, Sony, DJI and
other flagship brands.

Built with HTML, CSS and
JavaScript using a Liquid Glass UI.

</p>

</div>
`;
}

/* ------------------------
   ROUTER
------------------------- */

function router(){

const route =
window.location.hash.replace("#","");

switch(route){

case "products":
productPage();
break;

case "cart":
cartPage();
break;

case "about":
aboutPage();
break;

default:
homePage();
}
}

/* ------------------------
   EVENTS
------------------------- */

window.addEventListener(
"hashchange",
router
);

window.addEventListener(
"load",
()=>{

updateCartCount();

router();

}
);