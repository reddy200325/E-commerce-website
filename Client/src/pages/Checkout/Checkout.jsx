import { useContext, useState } from "react";
import axios from "axios";
import razorpay from "@/assets/razorpay_logo.png";
import stripe from "@/assets/stripe_logo.png";
import { ShopContext } from "@/components/context/ShopContext";
import { toast } from "react-toastify";
import { backendurl } from "@/App";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const {
    cartItems,
    setCartItems,
    clearCart,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    country: "",
    phone: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // Validate user input before placing order
  const validateForm = () => {
    if (!formData.firstName.trim()) return toast.error("First name is required"), false;
    if (!formData.lastName.trim()) return toast.error("Last name is required"), false;
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Enter a valid email"), false;
    if (!/^\d{10}$/.test(formData.phone)) return toast.error("Phone must be 10 digits"), false;
    if (!formData.street.trim()) return toast.error("Street address is required"), false;
    if (!formData.city.trim()) return toast.error("City is required"), false;
    if (!formData.state.trim()) return toast.error("State is required"), false;
    if (!/^\d{5,6}$/.test(formData.zipcode)) return toast.error("Enter valid zipcode"), false;
    if (!formData.country.trim()) return toast.error("Country is required"), false;
    return true;
  };

  // Handle form field updates
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Submit order
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (getCartAmount() === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      let orderItems = [];

      // Convert cartItems into order format
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find(
                (product) => product._id.toString() === items
              )
            );

            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      const token = localStorage.getItem("token");

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendurl + "/api/order/place",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            await clearCart();
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "stripe": {
          const responseStripe = await axios.post(
            backendurl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        case "razorpay": {
          const responseStripe = await axios.post(
            backendurl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        }

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form id="checkout-form" onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-6">

      {/* Payment methods */}
      <div className="border rounded-lg p-6 text-center mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Payment Options</h2>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => setMethod("stripe")}
            className={`px-6 py-2 rounded-md border ${
              method === "stripe" ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            <img src={stripe} alt="stripe" className="h-5" />
          </button>

          <button
            type="button"
            onClick={() => setMethod("razorpay")}
            className={`px-6 py-2 rounded-md border ${
              method === "razorpay" ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            <img src={razorpay} alt="razorpay" className="h-5" />
          </button>

          <button
            type="button"
            onClick={() => setMethod("cod")}
            className={`px-6 py-2 rounded-md border ${
              method === "cod" ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            COD
          </button>
        </div>
      </div>

      {/* Shipping form */}
      <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="firstName" placeholder="First Name" onChange={onChangeHandler} required className="border p-3 rounded-md" />
        <input name="lastName" placeholder="Last Name" onChange={onChangeHandler} required className="border p-3 rounded-md" />
        <input name="email" placeholder="Email Address" onChange={onChangeHandler} required className="col-span-2 border p-3 rounded-md" />
        <input name="phone" placeholder="Phone Number" onChange={onChangeHandler} required className="col-span-2 border p-3 rounded-md" />
        <input name="street" placeholder="Street Address" onChange={onChangeHandler} required className="col-span-2 border p-3 rounded-md" />
        <input name="city" placeholder="City" onChange={onChangeHandler} required className="border p-3 rounded-md" />
        <input name="state" placeholder="State" onChange={onChangeHandler} required className="border p-3 rounded-md" />
        <input name="zipcode" placeholder="Zipcode" onChange={onChangeHandler} required className="border p-3 rounded-md" />
        <input name="country" placeholder="Country" required onChange={onChangeHandler} className="border p-3 rounded-md" />
      </div>

    </form>
  );
};

export default Checkout;