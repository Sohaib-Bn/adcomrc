import { createContext, useContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [market, setMarket] = useState(() => localStorage.getItem("market"));
  return (
    <AppContext.Provider value={{ market, setMarket }}>
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
