let carts = document.querySelectorAll('.add-cart');
let table = document.getElementById('tableContent');
    
let productsInCart = 0;
let totalCost = 0;
let shippingCart = new ShippingCart();
let currentProducts = new ShippingCart();
let basketTotal = document.getElementById('basketTotal');    
let txtCart = document.getElementById('cart_num');
                        
currentProducts.addProduct(new Product("Gaming Computer","Computer",1,15000,"public/img/gaming_computer.jpg"));
currentProducts.addProduct(new Product("Processor i9","Processor",1,20000,"public/img/processor_i9.png"));

Object.values(currentProducts.products).map(product => {
    //console.log(product);
    showNewProduct(product);
});

/*for (let i = 0; i<carts.length;i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i]);
        updateTable();
    });
}*/

function buyProducts(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        
        if (result.value) {

            Object.values(shippingCart.products).map(item =>{
                delete shippingCart.products[item];
            });
            productsInCart = 0;
            totalCost = 0;
            txtCart.innerHTML = 0;
            basketTotal.innerHTML = "Basket total = $"+totalCost;
            updateTable();
            
            Swal.fire(
                'Deleted!',
                'Your produc has been deleted.',
                'success'
            )
        }
    })
}
    
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers){
        let txtCart = document.getElementById('cart_num');
        txtCart.innerHTML = localStorage.getItem('cartNumbers');
    }
}

function cartNumbers(productTag){
/*
    let productNumbers = localStorage.getItem('cartNumbers');
    let txtCart = document.getElementById('cart_num');
    productNumbers = parseInt(productNumbers);

    if (productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
    }else{
        localStorage.setItem('cartNumbers',1);
    }
    txtCart.innerHTML = localStorage.getItem('cartNumbers');
    setItems(productTag);*/
    productsInCart++;
    txtCart.innerHTML = productsInCart;
    shippingCart.addProduct(currentProducts.products[productTag]);
    totalCost += currentProducts.products[productTag].price;
    basketTotal.innerHTML ="Basket total = $"+ totalCost.toFixed(2);
    updateTable();
}

function setItems(product){
    /*
        let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems);

        if (cartItems != null){
            if(cartItems[product.tag] == undefined){
                cartItems = {
                    ...cartItems,
                    [product.tag]: product
                }
            }   
            cartItems[product.tag].inCart += 1;
        }else{
            product.inCart = 1;
            cartItems = {
                [product.tag]: product
            }
        }
        localStorage.setItem("productsInCart",JSON.stringify(cartItems));
        totalCost(product);
    */
    
}

/*function totalCost(product){
    let total = localStorage.getItem('totalCost');

    if (total){
        total = parseFloat(total);
        total += product.price;
        localStorage.setItem('totalCost',total);
    }
    else{
        localStorage.setItem('totalCost',product.price);
    }
    
}*/

function displayCart(){
    if (shippingCart.products && table){
        Object.values(shippingCart.products).map(item =>{
            let row = table.insertRow();
            row.setAttribute("id","row_"+item.tag);
            row.insertCell().innerHTML = `<button id="${item.tag}" onClick="removeProduct(this.id)" class="errase-product btn btn-outline-danger">X</button>`
            row.insertCell().innerHTML = `<img src=${item.pathImg} class="img-fluid  mw-100  \9" alt="Responsive image">`;
            row.insertCell().innerHTML = item.price;
            row.insertCell().innerHTML = item.inCart;
            row.insertCell().innerHTML ="$ "+ (parseFloat(item.price) * parseFloat(item.inCart)).toFixed(2);
        });
    }
    /*let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    if (cartItems && table){
        Object.values(cartItems).map(item =>{
            let row = table.insertRow();
            row.setAttribute("id",item.tag);
            row.insertCell().innerHTML = `<button id="${item.tag}" onClick="removeProduct(this.id)" class="errase-product btn btn-outline-danger">X</button>`
            row.insertCell().innerHTML = `<img src=${item.img} class="img-fluid  mw-100  \9" alt="Responsive image">`;
            row.insertCell().innerHTML = item.price;
            row.insertCell().innerHTML = item.inCart;
            row.insertCell().innerHTML ="$ "+ (parseFloat(item.price) * parseFloat(item.inCart)).toFixed(2);
        });
    }
    let basketTotal = document.getElementById('basketTotal');
    if (basketTotal)
        basketTotal.innerHTML ="Basket total = $"+ parseFloat(localStorage.getItem('totalCost')).toFixed(2);
    */
}

function removeProduct(idRow){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        
        if (result.value) {
            Object.values(shippingCart.products).map(item =>{
                if(item.tag == idRow){
                    let row = document.getElementById("row_"+item.tag);
                    totalCost -= (item.price * item.inCart);
                    productsInCart -= item.inCart;
                    basketTotal.innerHTML ="Basket total = $"+totalCost.toFixed(2);
                    txtCart.innerHTML = productsInCart;
                    delete shippingCart.products[item.tag];
                    console.log(shippingCart.products);
                    console.log(table.rows["row_"+item.tag].rowIndex);
                    updateTable()
                    return;
                }
            });
            Swal.fire(
                'Deleted!',
                'Your produc has been deleted.',
                'success'
            )
        }
    })
}

function updateTable(){
    if (table){
        table.innerHTML = "";
        displayCart();
    }
}

function showNewProduct(product){

    Object.values(currentProducts.products).map(item => {
        if (item.tag == product.tag)
            return;
    });

    container = document.getElementById("productsContainer");
    container.innerHTML += `
        <div class="col-sm-4 col-md-3">
            <div class="products">
                <img src=${product.pathImg} class="img-fluid" alt="Responsive image">
                <h4 class="text-info">${product.name}</h4>
                <h4>${product.price}</h4>
                <input type="hidden" name="name" value=${product.name} />
                <input type="hidden" name="price" value=${product.price} />
                <input onclick="cartNumbers(this.id)" id=${product.tag} type="submit" class="btn btn-info" 
                    value="Add to Cart" style="margin-top: 10px;" />
            </div>
        </div>`;
}

displayCart();
onLoadCartNumbers();   
