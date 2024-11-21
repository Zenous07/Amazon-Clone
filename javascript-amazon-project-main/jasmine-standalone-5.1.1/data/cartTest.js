import {addToCart,cart,loadFromStorage} from "../../data/cart.js";

describe('Test Suite: addToCart',()=>{
  it('Updates cart',()=>{

    spyOn(localStorage,'setItem');

     spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId:1
      }]);
    });

    loadFromStorage();

    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(2);

  });
  it('adds a new product to cart', ()=>{

    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(1);
  });
});