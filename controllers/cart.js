const { Product } = require("./../models/products");
const { User } = require("./../models/user");

const getCart = async (req, res) => {
  const userId = req.user._id;
  const cartItems = await User.getCart(userId);
  let totalItems = 0;
  let totalPrice = 0;
  for (let cartItem of cartItems) {
    totalItems += cartItem.quantity;
    totalPrice += cartItem.product.price * cartItem.quantity;
  }
  res.render("./shop/cart", {
    cartItems,
    totalItems,
    totalPrice,
    path: "/cart",
    docTitle: "cart",
  });
};

const addCart = async (req, res) => {
  const userId = req.user._id;
  const prodDetails = JSON.parse(req.body.prodDetails);
  await User.addCart(userId, prodDetails);
  res.redirect("/cart");
};

const deleteCart = async (req, res) => {
  const userId = req.user._id;
  const productId = req.body.productId;
  await User.deleteCart(userId, productId);
  res.redirect("/cart");
};

module.exports = { addCart, getCart, deleteCart };
