const { getDB } = require("./../utils/database");
const ObjectId = require("mongodb").ObjectId;

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async saveProduct() {
    const db = getDB();
    const productSavedData = await db.collection("products").insertOne(this);
  }

  static async getAllProducts() {
    const db = getDB();
    return await db.collection("products").find().toArray();
  }

  static async getProductById(id) {
    const db = getDB();
    const _id = new ObjectId(id);
    return await db.collection("products").findOne({ _id });
  }

  static async updateProduct(modifiedProduct) {
    const db = getDB();
    const _id = new ObjectId(modifiedProduct._id);
    modifiedProduct._id = _id;
    return await db.collection("products").replaceOne({ _id }, modifiedProduct);
  }

  static async deleteProductById(id) {
    const db = getDB();
    const _id = new ObjectId(id);
    await db.collection("products").deleteOne({ _id });
  }
}

module.exports = { Product };
