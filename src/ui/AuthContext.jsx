import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") || false
  );

  const login = function () {
    const loginPassword = import.meta.env.VITE_REACT_APP_LOGIN_PASSWORD;
    const isAuthenticated = password === loginPassword;

    setIsAuthenticated(isAuthenticated);
  };
  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        password,
        setPassword,
        isAuthenticated,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const value = useContext(AuthContext);

  if (value === undefined)
    throw new Error("AppContext have been used outside the provider");

  return value;
}

export default AuthProvider;
