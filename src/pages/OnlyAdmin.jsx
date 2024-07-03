import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./useUser";
import SpinnerFullPage from "../ui/SpinnerFullPage";

function OnlyAdmin({ children }) {
  const navigate = useNavigate();

  // 1. LOADING CURRENT USER
  const { isLoading, isAdmin } = useUser();

  // 2. REDIRECT TO LOGIN PAGE IF USER IS'T AUTHORIZED
  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/");
    }
  }, [isLoading, isAdmin, navigate]);

  // 3. RETURN SPINNER WHILE LOAIDNG
  if (isLoading) return <SpinnerFullPage />;

  // 4. RETURN CONTENT IF USER IS AUTHORIZED

  return isAdmin ? children : null;
}

export default OnlyAdmin;
