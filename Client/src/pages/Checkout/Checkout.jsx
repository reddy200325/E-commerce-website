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
  const { cartItems, setCartItems, clearCart, getCartAmount, delivery_fee, products } =
    useContext(ShopContext);

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
  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast.error("First name is required");
      return false;
    }

    if (!formData.lastName.trim()) {
      toast.error("Last name is required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Enter a valid email");
      return false;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone must be 10 digits");
      return false;
    }

    if (!formData.street.trim()) {
      toast.error("Street address is required");
      return false;
    }

    if (!formData.city.trim()) {
      toast.error("City is required");
      return false;
    }

    if (!formData.state.trim()) {
      toast.error("State is required");
      return false;
    }

    if (!/^\d{5,6}$/.test(formData.zipcode)) {
      toast.error("Enter valid zipcode");
      return false;
    }

    if (!formData.country.trim()) {
      toast.error("Country is required");
      return false;
    }

    return true;
  };


  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (getCartAmount() === 0) {
      toast.error("Your cart is empty");
      return;
    }
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find(
                (product) => product._id.toString() === items // ✅ ONLY FIX
              )
            )

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
        case "cod":
          const response = await axios.post(
            backendurl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            await clearCart();
            navigate("/orders");
          }
          else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe': {
          const responseStripe = await axios.post(backendurl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;
        }
        case 'razorpay': {
          const responseStripe = await axios.post(backendurl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
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

      {/* Payment Options */}
      <div className="border rounded-lg p-6 text-center mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Payment Options</h2>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => setMethod("stripe")}
            className={`px-6 py-2 rounded-md border ${method === "stripe" ? "bg-orange-500 text-white" : "bg-white"
              }`}
          >
            <img src={stripe} alt="stripe" className="h-5" />
          </button>

          <button
            type="button"
            onClick={() => setMethod("razorpay")}
            className={`px-6 py-2 rounded-md border ${method === "razorpay" ? "bg-orange-500 text-white" : "bg-white"
              }`}
          >
            <img src={razorpay} alt="razorpay" className="h-5" />
          </button>

          <button
            type="button"
            onClick={() => setMethod("cod")}
            className={`px-6 py-2 rounded-md border ${method === "cod" ? "bg-orange-500 text-white" : "bg-white"
              }`}
          >
            COD
          </button>
        </div>
      </div>

      {/* Shipping Address */}
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