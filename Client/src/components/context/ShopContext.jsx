import { createContext, useState } from "react";
import { product } from "../../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 20;

  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState(product);
  const [searchTerm, setSearchTerm] = useState("");

  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  const addtocart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size to continue");
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

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems((prev) => {
      const cartData = { ...prev };

      if (!cartData[itemId]) return prev;

      cartData[itemId] = {
        ...cartData[itemId],
        [size]: quantity,
      };

      return cartData;
    });
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

  const value = {
    products,
    currency,
    searchTerm,
    cartItems,
    addtocart,
    delivery_fee,
    updateSearchTerm,
    getCartCount,
    updateQuantity,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;