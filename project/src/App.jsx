import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Shop from "./pages/Shop";
import ProductPages from "./pages/ProductPages";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import { login, logout, selectIsAuth } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuth ? (
            <Navigate to="/feed" />
          ) : (
            <Login onLogin={() => dispatch(login())} />
          )
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <Layout onLogout={() => dispatch(logout())} />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/feed" />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductPages />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
