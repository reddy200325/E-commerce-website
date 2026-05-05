import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendurl } from "@/App";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const delivery_fee = 20;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const addtocart = async (itemId, size) => {
    if (!itemId) return toast.error("Invalid product");
    if (!size) return toast.error("Select product size");

    if (!token) {
      toast.error("Please login to add items");
      return;
    }

    const productExists = products.find(
      (p) => p._id.toString() === itemId
    );

    if (!productExists) return toast.error("Product not found");

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

  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity < 0 || quantity > 10) return;

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
      }
    }
  };

  const getUserCart = async (tokenValue) => {
    try {
      const response = await axios.post(
        `${backendurl}/api/cart/get`,
        {},
        {
          headers: {
            token: tokenValue,
          },
        }
      );

      console.log("CART RESPONSE:", response.data);

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      } else {
        setCartItems({});
      }
    } catch (error) {
      console.log(error);
      setCartItems({});
    }
  };

  const getCartCount = () => {
    if (!token) return 0;

    let total = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        total += cartItems[itemId][size];
      }
    }
    return total;
  };

  const getCartAmount = () => {
    let total = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (product) => product._id.toString() === itemId
      );

      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        total += itemInfo.price * cartItems[itemId][size];
      }
    }

    return total;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(
        `${backendurl}/api/product/list`
      );

      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      }
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `${backendurl}/api/cart/get`,
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedCart = localStorage.getItem("cartItems");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedCart && !storedToken) {
      setCartItems(JSON.parse(storedCart));
    }

    getProductData();
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      const currentToken = token || localStorage.getItem("token");

      if (currentToken) {
        await getUserCart(currentToken);
      } else {
        setCartItems({});
      }
    };

    loadCart();
  }, [token]);

  useEffect(() => {
    if (!token) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

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