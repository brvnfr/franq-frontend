import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/utils/hooks/useAuth";
import LoginPage from "@/presentation/pages/LoginPage";
import RegisterPage from "@/presentation/pages/RegisterPage";
import DashboardPage from "@/presentation/pages/DashboardPage";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/*"
      element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default App;
