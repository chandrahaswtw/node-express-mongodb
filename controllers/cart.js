const { Product } = require("./../models/products");

const getCart = async (req, res) => {
  const cart = await req.user.getCart();
  const allProducts = await cart.getProducts();
  let totalPrice = 0;
  let totalItems = 0;
  for (let i of allProducts) {
    totalItems += i.cartitem.quantity;
    totalPrice += i.price * i.cartitem.quantity;
  }
  res.render("./shop/cart", {
    cartItems: allProducts,
    totalItems,
    totalPrice,
    path: "/cart",
    docTitle: "cart",
  });
};

const addCart = async (req, res) => {
  let newQuantity = 1;
  let desiredProduct;
  const { productId } = req.body;
  const cart = await req.user.getCart();
  const existingProductsInCart = await cart.getProducts({
    where: { id: productId },
  });
  if (existingProductsInCart && existingProductsInCart.length) {
    // There is already a product in cart, increment the value by 1
    newQuantity = existingProductsInCart[0].cartitem.quantity + 1;
    desiredProduct = existingProductsInCart[0];
  } else {
    // The product doesn't exist in cart at all
    desiredProduct = await Product.findByPk(productId);
  }
  await cart.addProduct(desiredProduct, { through: { quantity: newQuantity } });
  res.redirect("/cart");
};

const deleteCart = async (req, res) => {
  const productId = req.body.productId;
  const cart = await req.user.getCart();
  const product = await cart.getProducts({ where: { id: productId } });
  await product[0].cartitem.destroy();
  res.redirect("/cart");
};

module.exports = { addCart, getCart, deleteCart };
