import {cart, removeFromCart,updateDeliveryOption} from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import {formatMoney} from './../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary(){


  let cartSummaryHTML='';

  cart.forEach((cartItem) => {
    const productId=cartItem.productId;

    const matchingItem=getProduct(productId);


    const deliveryOptionsId=cartItem.deliveryOptionsId;
    const deliveryOption=getDeliveryOption(deliveryOptionsId);

    const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMM D');

    cartSummaryHTML +=
    `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
            ${matchingItem.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary" data-product-id="${matchingItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryoptionsHTML(matchingItem,cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryoptionsHTML(matchingItem,cartItem) {
    let html='';
    deliveryOptions.forEach((deliveryOptions) => {

      const today=dayjs();
      const deliveryDate=today.add(deliveryOptions.deliveryDays,'days');
      const dateString=deliveryDate.format('dddd, MMM D');
      const priceString = deliveryOptions.priceCents === 0
        ?'Free'
        :`$${formatMoney(deliveryOptions.priceCents)} -`;

      const isChecked = deliveryOptions.id === cartItem.deliveryOptionsId;

      html +=
      `
      <div class="delivery-option js-delivery-option" 
      data-product-id="${matchingItem.id}" 
      data-delivery-options-id="${deliveryOptions.id}">
            <input type="radio" ${isChecked ?'checked':''}
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>
      `
    });
    return html;
  }

  document.querySelector('.order-summary').innerHTML=cartSummaryHTML;

  document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () =>{
      const productId =link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      renderPaymentSummary();
    });
  })

  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click', () =>{
        const {productId,deliveryOptionsId} =element.dataset;
        updateDeliveryOption(productId,deliveryOptionsId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  }

