export const cart = [];

export function addToCart(productId, quantitySelectorValue) {
  let matchingItem;

  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantitySelectorValue;
  } else {
    cart.push({
      productId,
      quantity: quantitySelectorValue
    })
  }
}