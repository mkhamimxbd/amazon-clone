import cart from '/data/cart.js';
import { products, getProduct, loadProductsFecth } from '/data/products.js';
import { getDeliveryOption } from '/data/deliveryOptions.js';
import { formatCurrency } from '/scripts/utils/money.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

async function loadOrders() {
  await loadProductsFecth();
  renderOrderHTML();
}

function renderOrderHTML() {
  let ordersHTML = '';
  let orderHTML = '';

  let productPriceCents = 0;
  let shippingPriceCents = 0;

  const today = dayjs().format('MMMM D');

  cart.cartItems.forEach(cartItem => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents

    function getDeliveryDate() {
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'MMMM D'
      );

      return dateString;
    }

    orderHTML += `
  <div class="product-image-container">
    <img src="${matchingProduct.image}">
  </div>

  <div class="product-details">
    <div class="product-name">
      ${matchingProduct.name}
    </div>
    <div class="product-delivery-date">
      Arriving on: ${getDeliveryDate()}
    </div>
    <div class="product-quantity">
      Quantity: ${cartItem.quantity}
    </div>
    <a href="/amazon.html" class="buy-again-link">
      <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
      </button>
    </a>
  </div>
  `;
  });

  const totalbeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalbeforeTaxCents * 0.1;
  const totalCents = totalbeforeTaxCents + taxCents;

  ordersHTML += `
  <div class="order-container">

    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${today}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(totalCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>b6b6c212-d30e-4d4a-805d-90b52ce6b37d</div>
      </div>
    </div>

    <div class="order-details-grid">
      ${orderHTML}
    </div>
  </div>
`;

  document.querySelector('.orders-grid')
    .innerHTML = ordersHTML;
}

document.querySelector('.js-cart-quantity')
 .innerHTML = cart.countCartQuantity();

loadOrders();



