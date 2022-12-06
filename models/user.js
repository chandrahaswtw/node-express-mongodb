const { getDB } = require("./../utils/database");
const ObjectId = require("mongodb").ObjectId;
const { Product } = require("./products");

class User {
  constructor(name, email, cart = { items: [] }) {
    this.name = name;
    this.email = email;
    this.cart = cart;
  }

  async saveUser() {
    const db = getDB();
    await db.collection("users").insertOne(this);
  }

  static async getUserById(id) {
    const db = getDB();
    const _id = new ObjectId(id);
    return db.collection("users").findOne({ _id });
  }

  static async getCart(userId) {
    const user = await User.getUserById(userId);
    const cart = user.cart;
    const productIds = cart.items.map((item) => item.productId);
    const desiredProducts = await Product.getFewProducts(productIds);
    const cartItems = desiredProducts.map((desiredProduct) => {
      const cartItem = {};
      cartItem.product = desiredProduct;
      const cartProduct = cart.items.find(
        (item) => item.productId.toString() == desiredProduct._id.toString()
      );
      cartItem.quantity = cartProduct.quantity;
      return cartItem;
    });

    return cartItems;
  }

  static async addCart(userId, prodDetails) {
    const db = getDB();
    const user_id = new ObjectId(userId);
    const product_id = new ObjectId(prodDetails._id);
    delete prodDetails._id;
    delete prodDetails.userId;
    // Check if user exists with the product in cart
    const userWithProducts = await db.collection("users").findOne({
      $and: [{ _id: user_id }, { "cart.items.productId": product_id }],
    });

    if (userWithProducts) {
      // User has the product in his cart => Increment the qunatity by 1
      await db.collection("users").updateOne(
        {
          _id: user_id,
          "cart.items": {
            $elemMatch: { productId: product_id },
          },
        },
        { $inc: { "cart.items.$.quantity": 1 } }
      );
    } else {
      // User has no product in his cart => Push a new product
      await db.collection("users").updateOne(
        { _id: user_id },
        {
          $push: {
            "cart.items": { productId: product_id, quantity: 1, prodDetails },
          },
        }
      );
    }
  }

  static async deleteCart(userId, productId) {
    const db = getDB();
    await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { "cart.items": { productId: new ObjectId(productId) } } }
      );
  }

  static async addOrders() {}

  static async getOrders() {}
}

module.exports = { User };
