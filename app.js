let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');

//wish list 
let iconWish = document.querySelector('.icon-wish');
let iconWishSpan = document.querySelector('.icon-wish span');

let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

let closeWish = document.querySelector('.close');
let products = [];
let cart = [];
let wish = [];



iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

iconWish.addEventListener('click', () => {
    body.classList.toggle('showWish');
})

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

closeWish.addEventListener('click', () => {
    body.classList.toggle('showWish');
})

    const addDataToHTML = () => {
    // remove datas default from HTML
    listProductHTML.innerHTML = '';

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>
                <button class="addFav">Add To Favorite</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="Products">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();

//wish list 
// Function to toggle the wish list
iconWish.addEventListener('click', () => {
    body.classList.toggle('showWish');
  });
  
  closeWish.addEventListener('click', () => {
    body.classList.toggle('showWish');
  });
  
  const addWishToMemory = () => {
    localStorage.setItem('wish', JSON.stringify(wish));
  };
  
  const addWishToHTML = () => {
  // Update the wish list HTML
  listWishHTML.innerHTML = '';
  if (wish.length > 0) {
    wish.forEach(item => {
      let newItem = document.createElement('div');
      newItem.classList.add('item');
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex((value) => value.id == item.product_id);
      let info = products[positionProduct];
      listWishHTML.appendChild(newItem);
      newItem.innerHTML = `
        <div class="Products">
          <img src="${info.image}">
        </div>
        <div class="name">
          ${info.name}
        </div>
        <div class="remove">
          <button class="removeFromWish">Remove</button>
        </div>
      `;
    });
  }
};
  
  // Function to add a product to the wish list
  const addToWish = (product_id) => {
    // Check if the product is not already in the wish list
    let positionThisProductInWish = wish.findIndex((value) => value.product_id == product_id);
    if (wish.length <= 0) {
      wish = [{
        product_id: product_id,
      }];
    } else if (positionThisProductInWish < 0) {
      wish.push({
        product_id: product_id,
      });
    } else {
      // Handle if the product is already in the wish list
      // You can choose to remove it or show a message to the user
    }
    addWishToHTML();
    addWishToMemory();
  };
  
  // ... (existing code)
  
  // Event listener for adding a product to the wish list
  listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addFav')) {
      let id_product = positionClick.parentElement.dataset.id;
      addToWish(id_product);
    }
  });
  
  // ... (existing code)
  
  // Event listener for the wish list
    listWishHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('removeFromWish')) {
      let product_id = positionClick.parentElement.dataset.id;
      removeFromWish(product_id);
    }
    });
  
  // Function to remove a product from the wish list
  const removeFromWish = (product_id) => {
    let positionItemInWish = wish.findIndex((value) => value.product_id == product_id);
    if (positionItemInWish >= 0) {
      wish.splice(positionItemInWish, 1);
      addWishToHTML();
      addWishToMemory();
    }
  };
  
  
  // Initialization function
  const initApp1 = () => {
    // ... (existing code)
  
    // Get data wish from memory
    if (localStorage.getItem('wish')) {
      wish = JSON.parse(localStorage.getItem('wish'));
      addWishToHTML();
    }
  };
  
  // Initialize the application
  initApp1();
  
  // search function

  function displayProducts(filteredProducts) {
    const productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        const productName = document.createElement("p");
        productName.textContent = product.name;

        const productPrice = document.createElement("p");
        productPrice.textContent = `Price: $${product.price}`;

        const productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = product.name;

        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productImage);

        productContainer.appendChild(productDiv);
    });
}

function searchProducts() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchInput));
    displayProducts(filteredProducts);
}

// Initial display of all products
displayProducts(products);

//checkou 
// Event listener for checkout button (replace with your actual event logic)
var checkoutButton = document.querySelector('.checkOut');
checkoutButton.addEventListener('click', function () {
  // Implement your checkout logic here, e.g., redirect to a payment page
  window.location.href = 'paymentGateway.html';
});