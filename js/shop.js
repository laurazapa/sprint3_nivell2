// If you have time, you can move this variable "products" to a json file and load the data in this js. It will look more professional
var products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery'
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery'
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    for(let nproduct in products){
        var product = products[nproduct];
        // 2. Add found product to the cartList array
        if(product.id == id){
            cartList.push(product);
        }
    }
    console.log(nproduct);
}

// Exercise 2
function cleanCart() {
    cartList = [];
}

// Exercise 3
function calculateTotal() {
    total=0;
    // Calculate total price of the cart using the "cart" array
    for(let nproduct in cart){
        var product = cart[nproduct];
        if(product.subtotalWithDiscount != 0){
            var priceproduct = product.subtotalWithDiscount;
        }else{
            var priceproduct = product.subtotal;
        }
        total = total + priceproduct;
    }
    //console.log(total);
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    for(let nproduct in cartList){
        var product = cartList[nproduct];

        // Find if the array contains an object by comparing the property value
        if(cart.some(cart => cart.id === product.id)){
            cart.find(cart => cart.id === product.id).quantity += 1;
            cart.find(cart => cart.id === product.id).subtotal += product.price;
            // cart.subtotal = cart.subtotal + product.pricce;
        } else{
            product.quantity = 1;
            product.subtotal = product.price;
            product.subtotalWithDiscount = 0;
            cart.push(product);
        }
    }
    //console.log(cart);
}

// Exercise 5
function applyPromotionsCart() {
    // Si l'usuari compra 3 o més ampolles d'oli, el preu del producte descendeix a 10 euros
    var objIndex = cart.findIndex((product => product.id == 1));
    if(objIndex != -1){
        if(cart[objIndex].quantity >= 3){
            cart[objIndex].price = 10;
            cart[objIndex].subtotalWithDiscount = cart[objIndex].price * cart[objIndex].quantity;
        }else{
            cart[objIndex].price = 10.5;
            cart[objIndex].subtotalWithDiscount = 0;
            cart[objIndex].subtotal = cart[objIndex].price * cart[objIndex].quantity;
        }
    }
    // En comprar-se 10 o més mescles per a fer pastís, el seu preu es rebaixa a 2/3.
    var objIndex = cart.findIndex((product => product.id == 3));
    if(objIndex != -1){
        if(cart[objIndex].quantity >= 10){
            cart[objIndex].price *= 2/3;
            cart[objIndex].subtotalWithDiscount = cart[objIndex].price * cart[objIndex].quantity;
        }else{
            cart[objIndex].price = 5;
            cart[objIndex].subtotalWithDiscount = 0;
            cart[objIndex].subtotal = cart[objIndex].price * cart[objIndex].quantity;
        }
    }
    //console.log(cart);
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    for(let nproduct in products){
        var product = products[nproduct];
        // 2. Add found product to the cartList array
        if(product.id == id){
            cartList.push(product);
        }
    }
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    // Find if the array contains an object by comparing the property value
    var product = cartList.find(cartList => cartList.id === id);
    if(cart.some(cart => cart.id === product.id)){
        cart.find(cart => cart.id === product.id).quantity += 1;
        cart.find(cart => cart.id === product.id).subtotal += product.price;
        // cart.subtotal = cart.subtotal + product.pricce;
    } else{
        product.quantity = 1;
        product.subtotal = product.price;
        product.subtotalWithDiscount = 0;
        cart.push(product);
    }
    //console.log(cart);
}

// Exercise 8
function removeFromCart(id) {
    var product = cart.find(cart => cart.id === id);
    if(product){
        if(cart.find(cart => cart.id === product.id).quantity == 1){
            var objIndex = cart.findIndex((product => product.id == id));
            cart.splice(objIndex, 1);
        }else{
            cart.find(cart => cart.id === product.id).quantity -= 1;
            cart.find(cart => cart.id === product.id).subtotal -= product.price;
        }
    }
    //console.log(cart);
}

// Exercise 9
function printCart() {
    applyPromotionsCart();
    calculateTotal();
    // Fill the shopping cart modal manipulating the shopping cart dom
    cartul.innerHTML = '';
    
    //remove the information of select something if the cart is not empty
    if(cart.length != 0){
        selectsth.innerHTML= '';
        totalpricecart.innerHTML = total.toFixed(2)+'$';
    }else{
        selectsth.innerHTML= 'Select something';
        totalpricecart.innerHTML = '';
    }
    // print the products of the cart
    for(let nproduct in cart){
        var product = cart[nproduct];
        var divproduct = document.createElement('div');
        divproduct.setAttribute('class', 'd-flex alignt-items-center my-1');
        var li = document.createElement('li');
        //print the price value (with or without discount)
        if(product.subtotalWithDiscount != 0){
            var priceproduct = product.subtotalWithDiscount
        }else{
            var priceproduct = product.subtotal;
        }
        li.innerHTML = product.name + ' (x ' + product.quantity + ') ' + priceproduct.toFixed(2) + '$';
        //button to remove one item
        var but = document.createElement('button');
        but.innerHTML= 'Remove';
        but.setAttribute('onclick', 'removeFromCart('+product.id+'); '+'printCart();');
        but.setAttribute('class', 'ml-2 btn btn-secondary btn-sm');
        
        divproduct.appendChild(li);
        divproduct.appendChild(but);
        cartul.appendChild(divproduct);
    }
}
