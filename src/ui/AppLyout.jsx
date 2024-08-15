import { Outlet } from "react-router-dom";
import AppProvider from "../context/AppContext";

function AppLyout() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}

export default AppLyout;
