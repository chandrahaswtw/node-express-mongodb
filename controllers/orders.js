const { Order } = require("./../models/order");

const createOrder = async (req, res, next) => {
  const { _id: userId } = req.user;
  await Order.createOrder(userId);
  res.redirect("/orders");
};

const getOrders = async (req, res, next) => {
  const { _id: userId } = req.user;
  let ordersData = (await Order.getOrders(userId)) || [];
  const orders = ordersData.map((order) => {
    let orderCost = order.items.reduce((acc, cur) => {
      return acc + cur.quantity * cur.prodDetails.price;
    }, 0);
    order.orderCost = orderCost;
    return order;
  });
  console.log(JSON.stringify(orders));
  res.render("./shop/orders", {
    docTitle: "Orders",
    path: "/orders",
    docTitle: "My orders",
    orders,
  });
};

module.exports = { createOrder, getOrders };
