const { Product } = require("../models/products");

const getProducts = async (req, res, next) => {
  const rows = await req.user.getProducts();
  res.render("./shop/allProducts", {
    prod: rows,
    path: "/",
    docTitle: "Home",
  });
};

const viewProduct = async (req, res, next) => {
  const id = req.params.id;
  const row = await Product.findByPk(id);
  res.render("./shop/viewProduct", {
    prod: row,
    path: "/",
    docTitle: row.title,
  });
};

module.exports = { getProducts, viewProduct };
