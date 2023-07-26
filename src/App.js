import React from "react";
import Layout from "./components/layout/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import UsersPage from "./pages/UsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  const login = false;
  return (
    <Layout>
      <Routes>
        {!login && (
          <Route path="/registration" element={<AuthenticationPage />} />
        )}
        {!login && (
          <Route path="/" element={<Navigate replace to={`/registration`} />} />
        )}
        {login && (
          <Route path="/" element={<Navigate replace to={`/users`} />} />
        )}
        {login && <Route path="/users" element={<UsersPage />} />}
        {login && <Route path="/profile" element={<ProfilePage />} />}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
