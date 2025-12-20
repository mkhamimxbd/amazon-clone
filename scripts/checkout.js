import { renderOrderSummary } from "/scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "/scripts/checkout/paymentSummary.js";
import { loadProducts } from "/data/products.js";

new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});