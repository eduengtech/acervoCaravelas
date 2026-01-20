import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { Login } from "../pages/Login/Login";
import { Dashboard } from "../pages/dashboard/dashboard";

export const AppRouters = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingSpinner />;
      </div>
    );
  }

  return (
    <Routes>
      {/* Se acessar a raiz "/", manda para o lugar certo */}
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />

      {/* Rota de Login: Bloqueia se já estiver logado */}
      <Route
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
      />

      {/* Rota de Dashboard: Bloqueia se NÃO estiver logado */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
