import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRout from "./ui/ProtectedRout";
import AuthProvider from "./ui/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Navigate to="/system" />} />
          <Route
            path="/system"
            element={
              <ProtectedRout>
                <Dashboard />
              </ProtectedRout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
