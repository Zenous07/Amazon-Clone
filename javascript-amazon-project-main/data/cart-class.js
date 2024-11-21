class Cart{
  cartItems ; // cartItems; === cartItems=undefined // public property
  #localStorageKey = undefined;  // private property

  constructor (localStorageKey) {
    this.#localStorageKey=localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {    //Private method
    this.cartItems=JSON.parse(localStorage.getItem(this.#localStorageKey));
    if(!this.cartItems){
      this.cartItems=[{
        productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity:2,
        deliveryOptionsId: '1'
      },
      {
        productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity:1,
        deliveryOptionsId:'2'
      }];
    }
  }

  saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(cart));
  }


  addToCart(productId,productName){
    let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId===productId){
          matchingItem=cartItem;
        }
      })
  
      if(matchingItem){
        matchingItem.quantity +=1;
      }
      else{
        this.cartItems.push({
          productName,
          productId,
          quantity:1,
          deliveryOptionsId:'1'
        });
      }
      this.saveToStorage();
  }


  removeFromCart(productId){
    let newCart=[];
    this.cartItems.forEach((item) => {
      if(item.productId != productId){
        newCart.push(item)
      }
    })
    this.cart=newCart;
    console.log(this.cartItems);
    this.saveToStorage();
  }
  

  updateDeliveryOption(productId,deliveryOptionsId){
    let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId===productId){
          matchingItem=cartItem;
        }
      })
  
      matchingItem.deliveryOptionsId=deliveryOptionsId;
  
      this.saveToStorage();
  }
}



const cart= new Cart('cart-oop');
const  bussinesCart= new Cart('cart-bussines');



console.log(cart);
console.log(bussinesCart);

console.log(bussinesCart instanceof Cart);