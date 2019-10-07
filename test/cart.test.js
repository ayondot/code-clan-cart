const test = require("tape");
const db = require("../model/db");
const controller = require("../controller/cart");
const items = require("./items/items.mock").cart;

test("add to cart", function(t) {
  t.throws(function() {
    controller.addToCart(items[1]);
  }, "price is required");

  const newItem = controller.addToCart(items[0]);
  t.equal(db.cart.length, 1, "cart should now contain 1 item");
  t.equal(db.cart[0].name, newItem.name);
  t.equal(db.cart[0].count, 1, "default count is 1");
  t.equal(db.cart[0].bogof, false, "item is not bogof by default");
  t.end();
});

test("remove from cart", function(t) {
  controller.addToCart(items[0]);
  const removedItem = controller.removeFromCart(items[0].name);
  t.equal(db.cart.length, 1, "1 item should be left in cart");
  t.equal(db.cart[0].name, removedItem.name);
  t.end();
});

test("empty cart", function(t) {
  controller.emptyCart();
  t.equal(db.cart.length, 0, "no item should be left in cart");
  t.end();
});

test("cart items total price", function(t) {
  controller.addToCart(items[0]);
  controller.addToCart(items[0]);
  controller.addToCart(items[0]);

  t.equal(db.cart.length, 3, "there should be 3 items in cart");
  t.equal(controller.total(), 16.5, "total price should be the sum of the prices of the three items");
  t.end();
});
