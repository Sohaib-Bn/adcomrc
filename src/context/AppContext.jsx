import { createContext, useContext, useState } from "react";
import { MARKETSOPTIONS } from "../data/centers";

const AppContext = createContext();

function AppProvider({ children }) {
  const [market, setMarket] = useState(
    () => localStorage.getItem("market") || "main"
  );

  const [activity, setActivity] = useState(
    () =>
      localStorage.getItem("activity") || MARKETSOPTIONS[market]?.activities[0]
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
