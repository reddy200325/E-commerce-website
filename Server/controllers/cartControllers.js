import userModel from "../models/userModels.js";

export const addToCart = async (req, res) => {
  try {
   const { itemId, size } = req.body;
    const userId = req.user.id; 
    const userData = await userModel.findById(userId);
    let cartData = await userData.cartData;

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (cartData[itemId]) {
      cartData[itemId][size] = cartData[itemId][size] + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;

    // ✅ correct way to get userId
    const userId = req.user?.id;

    console.log("USER:", req.user);
    console.log("USER ID:", userId);
    console.log("BODY:", req.body);

    // 🔴 check auth
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    const userData = await userModel.findById(userId);

    // 🔴 check user exists
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    let cartData = userData.cartData || {};

    // ✅ ensure structure
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    // ✅ update / delete logic
    if (quantity === 0) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cartData
    });

  } catch (error) {
    console.log("UPDATE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cartData = userData.cartData;

    res.status(200).json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
