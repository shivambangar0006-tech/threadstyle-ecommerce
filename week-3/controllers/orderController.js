const Order = require("../models/Order");
const Product = require("../models/Product");

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("items.product", "name price");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { customerName, email, items, shippingAddress } = req.body;

    if (!customerName || !email || !items || !items.length || !shippingAddress) {
      return res.status(400).json({
        message: "customerName, email, items and shippingAddress are required"
      });
    }

    let totalAmount = 0;
    const preparedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(400).json({ message: `Product not found: ${item.product}` });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be a positive integer" });
      }

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`
        });
      }

      totalAmount += product.price * quantity;
      preparedItems.push({
        product: product._id,
        quantity,
        price: product.price
      });
    }

    const order = await Order.create({
      customerName,
      email,
      items: preparedItems,
      totalAmount,
      shippingAddress
    });

    for (const item of preparedItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const allowed = ["Pending", "Paid", "Processing", "Shipped", "Delivered", "Cancelled"];
    const { status } = req.body;

    if (!allowed.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Allowed values: ${allowed.join(", ")}`
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};
