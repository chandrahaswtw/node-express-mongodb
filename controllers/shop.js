const { Product } = require("../models/products");

const getProducts = async (req, res, next) => {
  const rows = await Product.getAllProducts();
  res.render("./shop/allProducts", {
    prod: rows,
    path: "/",
    docTitle: "Home",
  });
};

const viewProduct = async (req, res, next) => {
  const id = req.params.id;
  const productData = await Product.getProductById(id);
  res.render("./shop/viewProduct", {
    prod: productData,
    path: "/",
    docTitle: productData.title,
  });
};

module.exports = { getProducts, viewProduct };
