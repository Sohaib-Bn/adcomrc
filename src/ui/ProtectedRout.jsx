import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";

function ProtectedRout({ children }) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");

    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRout;
