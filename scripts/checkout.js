import { renderOrderSummary } from "/scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "/scripts/checkout/paymentSummary.js";
import { loadProducts, loadProductsFecth } from "/data/products.js";

async function loadPage() {
  try {
    await loadProductsFecth();
  } catch (error) {
    alert('unexpected error. try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();