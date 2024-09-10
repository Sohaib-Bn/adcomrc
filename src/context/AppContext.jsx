import { createContext, useContext, useState } from "react";
import { MARKETSOPTIONS } from "../data/centers";

const AppContext = createContext();

function AppProvider({ children }) {
  const [market, setMarket] = useState(
    () => localStorage.getItem("market") || Object.keys(MARKETSOPTIONS)[0]
  );

  const [activity, setActivity] = useState(
    () =>
      localStorage.getItem("activity") ||
      MARKETSOPTIONS[Object.keys(MARKETSOPTIONS)[0]]?.activities[0].activity
  );

  return (
    <AppContext.Provider value={{ market, setMarket, activity, setActivity }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

export function useAppContext() {
  const value = useContext(AppContext);

  if (value === undefined)
    throw new Error("AppContext have been used outside the provider");

  return value;
}
