/**
 * Cart controller
 */

const db = require("../model/db");
const validateItem = require("../model/cartItem").validateItem;

module.exports = {
  addToCart(item) {
    item = validateItem(item);
    db.cart.push(item);
    return item;
  },

  removeFromCart(itemName) {
    let removed = {};
    db.cart.forEach((item, i) => {
      if (item.name === itemName) {
        removed = db.cart.splice(i, 1)[0];
        return;
      }
    });
    return removed;
  },

  emptyCart() {
    db.cart = [];
    return db.cart;
  },

  total(hasLoyaltyCard) {
    return db.cart.reduce((total, item) => {
      return total + item.price;
    }, 0);
  }
};
