const { Product } = require("./../models/products");

const getAddProduct = (req, res, next) => {
  res.render("./admin/editProduct", {
    docTitle: "Add products",
    path: "/addProduct",
    docTitle: "Add products",
    edit: false,
  });
};

const postAddProduct = async (req, res, next) => {
  const { title, image, description, price } = req.body;
  await req.user.createProduct({ title, image, description, price });
  return res.redirect("/");
};

const getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const id = req.params.id;
  const row = await req.user.getProducts({ where: { id } });
  if (!row) {
    return res.redirect("/");
  }
  res.render("./admin/editProduct", {
    docTitle: "Add products",
    path: "/editProduct",
    docTitle: "Add products",
    prod: row[0],
    edit: editMode,
  });
};

const postEditProduct = async (req, res, next) => {
  const { id, title, image, description, price } = req.body;
  const prod = await Product.findByPk(id);
  prod.title = title;
  prod.image = image;
  prod.description = description;
  prod.price = price;
  await prod.save();
  res.redirect("/");
};

const postDeleteProduct = async (req, res, next) => {
  const { id } = req.body;
  await Product.destroy({ where: { id } });
  res.redirect("/");
};

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
