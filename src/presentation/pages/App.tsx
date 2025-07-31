import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/utils/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy loading das páginas (code splitting por rota)
const LoginPage = lazy(() => import("@/presentation/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/presentation/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/presentation/pages/DashboardPage"));

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Skeleton className="w-24 h-24 rounded-full mb-6" />
      <Skeleton className="w-72 h-6 mb-2" />
      <Skeleton className="w-60 h-5" />
    </div>
  );
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => (
  <Suspense
    fallback={
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Skeleton className="w-24 h-24 rounded-full mb-6" />
        <Skeleton className="w-72 h-6 mb-2" />
        <Skeleton className="w-60 h-5" />
      </div>
    }
  >
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
  </Suspense>
);

export default App;
