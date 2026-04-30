import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendurl } from "@/App";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 20;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  // ✅ ADD TO CART
  const addtocart = async (itemId, size) => {
  if (!itemId) {
    toast.error("Invalid product");
    return;
  }

  if (!size) {
    toast.error("Select product size to continue");
    return;
  }

  // ❗ REQUIRE LOGIN FIRST
  if (!token) {
    toast.error("Please login to add items");
    navigate("/login");
    return;
  }

  const productExists = products.find(
    (p) => p._id.toString() === itemId
  );

  if (!productExists) {
    toast.error("Product not found");
    return;
  }

  setCartItems((prev) => {
    const updatedCart = { ...prev };

    if (!updatedCart[itemId]) {
      updatedCart[itemId] = {};
    }

    updatedCart[itemId][size] =
      (updatedCart[itemId][size] || 0) + 1;

    return updatedCart;
  });

  try {
    await axios.post(
      `${backendurl}/api/cart/add`,
      { itemId, size },
      { headers: { token } }
    );

    toast.success("Product added to cart");

  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

  // ✅ UPDATE QUANTITY
  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity < 0) {
      toast.error("Invalid quantity");
      return;
    }

    if (quantity > 10) {
      toast.error("Max 10 items allowed");
      return;
    }

    setCartItems((prev) => {
      const cartData = { ...prev };

      if (!cartData[itemId]) return prev;

      cartData[itemId] = {
        ...cartData[itemId],
        [size]: quantity,
      };

      return cartData;
    });

    if (token) {
      try {
        await axios.post(
          `${backendurl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ GET USER CART (FIXED)
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/cart/get`,
        {},
        {
          headers: {
            token: token || localStorage.getItem("token"),
          },
        }
      );

      if (response.data.success) {
        const backendCart = response.data.cartData;

        // ✅ ONLY update if backend has data
        if (backendCart && Object.keys(backendCart).length > 0) {
          setCartItems(backendCart);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // ✅ CART COUNT
  const getCartCount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) total += qty;
      }
    }

    return total;
  };

  // ✅ CART TOTAL (FIXED ID MATCH)
  const getCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (product) => product._id.toString() === itemId
      );

      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) {
          total += itemInfo.price * qty;
        }
      }
    }

    return total;
  };

  // ✅ FETCH PRODUCTS
  const getProductData = async () => {
    try {
      const response = await axios.get(
        `${backendurl}/api/product/list`
      );

      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // ✅ CLEAR CART
  const clearCart = async () => {
    setCartItems({});
    localStorage.removeItem("cartItems");

    if (token) {
      try {
        await axios.post(
          `${backendurl}/api/cart/clear`,
          {},
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ LOAD DATA ON START
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedCart = localStorage.getItem("cartItems");

    // Load local cart FIRST
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    // Then backend cart
    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }

    getProductData();
  }, []);

  // ✅ AUTO SAVE CART
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const value = {
    products,
    currency,
    searchTerm,
    cartItems,
    setCartItems,
    addtocart,
    clearCart,
    getUserCart,
    delivery_fee,
    updateSearchTerm,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;