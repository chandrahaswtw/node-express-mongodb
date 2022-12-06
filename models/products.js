const { getDB } = require("./../utils/database");
const ObjectId = require("mongodb").ObjectId;

class Product {
  constructor(title, imageUrl, description, price, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }

  async saveProduct() {
    const db = getDB();
    const productSavedData = await db.collection("products").insertOne(this);
  }

  static async getAllProducts() {
    const db = getDB();
    return await db.collection("products").find().toArray();
  }

  static async getFewProducts(ids) {
    // ids is an array
    const db = getDB();
    // ids = ids.map((id) => new ObjectId(id));
    return await db
      .collection("products")
      .find({ _id: { $in: ids } })
      .toArray();
  }

  static async getProductById(id) {
    const db = getDB();
    const _id = new ObjectId(id);
    return await db.collection("products").findOne({ _id });
  }

  async updateProductById(id) {
    const db = getDB();
    const _id = new ObjectId(id);
    return await db.collection("products").updateOne({ _id }, { $set: this });
  }

  static async deleteProductById(id) {
    const db = getDB();
    const _id = new ObjectId(id);
    await db.collection("products").deleteOne({ _id });
  }
}

module.exports = { Product };
