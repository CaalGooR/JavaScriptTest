function ShippingCart (){
    
    /* Atributtes */
    this.total;
    this.products = [];

    /* Methods */
    this.addProduct = function(product){
        if (this.products[product.tag] == undefined){
            this.products = {
              ...this.products,
              [product.tag]:product
            };
        }else{
            this.products[product.tag].inCart++;
        }
    };

    this.findProductByTag = function findProductByTag(productTag){
        Object.values(this.products).map(product => {
            if (product.tag == productTag){
                return product;
            }
        }); 
    };

    this.editProduct = function (productName,productAttribute,newValue) {
        if(this.products[productName] != undefined && this.products[productName][productAttribute] != undefined){
            this.products[productName][productAttribute] = newValue;
        }else{
            return "Product or atributte is not found";
        }
    };

    this.eraseProduct = function (productTag) { delete this.products[productTag];};

    this.getProducts = function(){return this.products};

    
}