const { User } = require("./user");
const { getDB } = require("./../utils/database");
const ObjectId = require("mongodb").ObjectId;

class Order {
  static async createOrder(userId) {
    const db = getDB();
    userId = new ObjectId(userId);
    const userData = await User.getUserById(userId);
    const { items } = userData.cart;
    await db.collection("orders").insertOne({
      userId,
      items,
    });
    await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { "cart.items": [] } });
  }

  static async getOrders(userId) {
    const db = getDB();
    userId = new ObjectId(userId);
    return await db
      .collection("orders")
      .find({
        userId,
      })
      .toArray();
  }
}

module.exports = { Order };
