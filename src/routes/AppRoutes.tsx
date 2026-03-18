import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const LoginPage = lazy(() =>
  import("../pages/Login").then((module) => ({ default: module.Login })),
);
const UsersPage = lazy(() =>
  import("../pages/Users").then((module) => ({ default: module.Users })),
);

export function AppRoutes() {
  return (
    <BrowserRouter basename="/">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/auth/google/callback" element={<LoginPage />} />
          <Route path="/reset_password/:token" element={<LoginPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
