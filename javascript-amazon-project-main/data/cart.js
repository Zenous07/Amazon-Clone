
export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart=JSON.parse(localStorage.getItem('cart'));

  if(!cart){
    cart=[{
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


function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,productName){
  let matchingItem;

    cart.forEach((cartItem) => {
      if(cartItem.productId===productId){
        matchingItem=cartItem;
      }
    })

    if(matchingItem){
      matchingItem.quantity +=1;
    }
    else{
      cart.push({
        productName,
        productId,
        quantity:1,
        deliveryOptionsId:'1'
      });
    }
    saveToStorage();
}

export function removeFromCart(productId){
  let newCart=[];
  cart.forEach((item) => {
    if(item.productId != productId){
      newCart.push(item)
    }
  })
  cart=newCart;
  console.log(cart);
  saveToStorage();
}


export function updateDeliveryOption(productId,deliveryOptionsId){
  let matchingItem;

    cart.forEach((cartItem) => {
      if(cartItem.productId===productId){
        matchingItem=cartItem;
      }
    })

    matchingItem.deliveryOptionsId=deliveryOptionsId;

    saveToStorage();
}

