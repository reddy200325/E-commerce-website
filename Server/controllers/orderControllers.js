import orderModel from "../models/orderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = "usd";
const deliveryCharge = 12;

// ================= GET ALL ORDERS (ADMIN) =================
export const allOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= GET USER ORDERS =================
export const userOrder = async (req, res) => {
  try {
    const userId = req.user.id.toString();
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= PLACE ORDER (COD) =================
export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "Order Placed",
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    // Clear cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: [] });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= PLACE ORDER (STRIPE) =================
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "Order Placed",
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Convert items into Stripe format
    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charge as separate item
    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charge" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= VERIFY STRIPE PAYMENT =================
export const verifyStripe = async (req, res) => {
  const { orderId, success } = req.body;
  const userId = req.user.id;

  try {
    if (success === "true") {
      // Mark order as paid
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Paid",
      });

      // Clear user cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true });
    } else {
      // Delete order if payment failed
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= PLACE ORDER (RAZORPAY - TODO) =================
export const placeOrderRazorpay = async (req, res) => {
  try {
    // Not implemented yet
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ================= UPDATE ORDER STATUS (ADMIN) =================
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};