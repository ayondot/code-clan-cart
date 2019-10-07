/**
 * Cart item model
 */

module.exports = {
  // schema enforces the attributes of the cart items. All schema keys
  // are required properties of cart items (required by default)
  schema: {
    bogof: {
      type: "boolean",
      defaultsTo: false
    },
    name: {
      type: "string"
    },
    count: {
      type: "number",
      defaultsTo: 1
    },
    price: {
      type: "number"
    }
  },

  // the function below is used to validate items being added to the cart
  validateItem(item) {
    const itemSchema = module.exports.schema;
    const schemaKeys = Object.keys(itemSchema);
    schemaKeys.forEach(i => {
      if (typeof item === "object") {
        if (!item[i]) {
          if (typeof itemSchema[i].defaultsTo !== "undefined") {
            item[i] = itemSchema[i].defaultsTo;
          } else throw new Error(`${i} is required`);
        } else if (typeof item[i] !== itemSchema[i].type) {
          throw new Error(`${i} should be a ${itemSchema[i].type}`);
        }
      } else throw new Error(`item must be an object having properties: name, count, bogof`);
    });
    return item;
  }
};
