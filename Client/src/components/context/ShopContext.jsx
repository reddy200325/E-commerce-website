import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendurl } from "@/App";
import { Navigate, useNavigate } from "react-router-dom";

export const ShopContext = createContext();
const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 20;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState('');

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const addtocart = async (itemId, size) => {
     if (!itemId) {
    toast.error("Invalid product");
    return;
  }
    if (!size) {
      toast.error("Select product size to continue");
      return;
    }
      const productExists = products.find(p => p._id === itemId);

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

    toast.success("Product added to cart");

    if (token) {
      try {
        await axios.post(`${backendurl}/api/cart/add`, {
          itemId,
          size,
        }, {
          headers: { token: token },
        }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) totalCount += qty;
      }
    }

    return totalCount;
  };

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

    // 🔥 CALL BACKEND
    if (token) {
      try {
        await axios.post(
          backendurl + "/api/cart/update",
          { itemId, size, quantity },
          {
            headers: { token }
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getUserCart = async (token) => {
  try {
    const response = await axios.post(
      backendurl + "/api/cart/get",
      {},
      {
        headers: {
          token: token || localStorage.getItem("token")
        }
      }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (product) => product._id === itemId
      );

      if (itemInfo) {
        for (const size in cartItems[itemId]) {
          totalAmount +=
            itemInfo.price * cartItems[itemId][size];
        }
      }
    }

    return totalAmount;
  };
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendurl}/api/product/list`);

      if (response.data.success) {
        setProducts(response.data.products);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message)
    }
  };

  useEffect(() => {
    getProductData(token);
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
      getUserCart(localStorage.getItem('token'))
    }
  }, [])

  const value = {
    products,
    currency,
    searchTerm,
    cartItems,
    setCartItems,
    addtocart,
    getUserCart,
    delivery_fee,
    updateSearchTerm,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;