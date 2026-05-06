import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "@/components/context/ShopContext";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return <p className="text-center mt-10">Logging you in...</p>;
};

export default GoogleSuccess;