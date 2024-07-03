import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Admin from "./pages/Admin";
import AppLyout from "./ui/AppLyout";
import ProtectedRoute from "./ui/ProtectedRout";
import OnlyAdmin from "./ui/OnlyAdmin";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLyout />
              </ProtectedRoute>
            }
          >
            <Route path="/" index element={<Navigate to="/system" />} />
            <Route path="/system" element={<Dashboard />} />
            <Route
              path="/admin"
              element={
                <OnlyAdmin>
                  <Admin />
                </OnlyAdmin>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toesOpetions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxwidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-50)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
