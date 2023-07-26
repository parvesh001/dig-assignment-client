import React, { useContext } from "react";
import Layout from "./components/layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import { AuthContext } from "./context/authContext";

export default function App() {
  const {isLogedIn} = useContext(AuthContext)
  return (
    <Layout>
      <Routes>
        {!isLogedIn && (
          <Route path="/registration" element={<AuthenticationPage />} />
        )}
        {!isLogedIn && (
          <Route path="/" element={<Navigate replace to={`/registration`} />} />
        )}
        {isLogedIn && (
          <Route path="/" element={<Navigate replace to={`/users`} />} />
        )}
        {isLogedIn && <Route path="/users" element={<UsersPage />} />}
        {isLogedIn && <Route path="/profile" element={<ProfilePage />} />}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
