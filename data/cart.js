import { renderPaymentSummary } from "/scripts/checkout/paymentSummary.js";

export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  clearStorage() {
    localStorage.removeItem('cart');
  }

  addToCart(productId, quantitySelectorValue) {
    let matchingItem;

    this.cartItems.forEach(cartItem => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantitySelectorValue;
    } else {
      this.cartItems.push({
        productId,
        quantity: quantitySelectorValue,
        deliveryOptionId: '1'
      })
    }

    this.saveToStorage();
  }

  countCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach(cartItem => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach(cartItem => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();

    document.querySelector('.js-checkout-cart-quantity-count')
      .innerHTML = `${this.countCartQuantity()} items`;

    renderPaymentSummary();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach(cartItem => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart('cart');

export default cart;