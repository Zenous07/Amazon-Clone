import {cart} from '../../data/cart.js'
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {getProduct} from "../../data/products.js";
import { formatMoney } from '../utils/money.js';
import { addOrder } from '../../data/order.js';

export function renderPaymentSummary(){
  let productPriceCents=0;
  let shippingPriceCents =0;


  cart.forEach((cartItem) =>{
    const product=getProduct(cartItem.productId);
    productPriceCents +=product.priceCents * cartItem.quantity;

    const deliveryOption=getDeliveryOption(cartItem.deliveryOptionsId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents =totalBeforeTax*0.1;
  const totalAfterTax =totalBeforeTax+taxCents;
/*   console.log(totalBeforeTax);
  console.log(taxCents);
  console.log(totalAfterTax); */

  const paymentSummaryHTML=`
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatMoney(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatMoney(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatMoney(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatMoney(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatMoney(totalAfterTax)}</div>
      </div>

      <button class="place-order-button button-primary js-place-order">
        Place your order
      </button>
  `
  /* document.querySelector('.payment-summary').innerHTML=paymentSummaryHTML;
  if(paymentSummaryHTML===null){
    console.log("True Null");
  }
  else{
    console.log('False no Null');
  } */
 if(document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML){
  console.log('No Error');
 }
 else{
  console.log('Error Found');
 }

 document.querySelector('.js-place-order').addEventListener('click', async () => {
  try{
    const response =await fetch('https://supersimplebackend.dev/orders',{
      method :'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        cart:cart
      })
    });
  
    const order = await response.json()
    addOrder(order); 
  } catch (error) {
    console.log("Error")
  }

  window.location.href='orders.html';
 });
  
}

  renderPaymentSummary();