import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShopContext } from "@/components/context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { backendurl } from "@/App";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useContext(ShopContext);

  useEffect(() => {
    const handlePayment = async () => {
      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");

      // ✅ PAYMENT SUCCESS
      if (success === "true") {
        try {
          // 🔐 (optional but recommended)
          const token = localStorage.getItem("token");

          await axios.post(
            `${backendurl}/api/order/verifyStripe`,
            { orderId,
              success,
            },
            {
              headers: {
                token,
              },
            }
          );

          await clearCart();
          toast.success("Payment successful");

          navigate("/orders");
        } catch (err) {
          toast.error("Verification failed");
          navigate("/cart");
        }
      }

      // ❌ PAYMENT FAILED / CANCELLED
      else {
        toast.error("Payment cancelled");
        navigate("/cart"); // cart stays
      }
    };

    handlePayment();
  }, []);

  return (
    <div className="text-center mt-10 text-lg font-medium">
      Processing payment...
    </div>
  );
};

export default Verify;