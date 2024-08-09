import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "../pages/Login";
import { Users } from "../pages/Users"

export function AppRoutes() {
    return(
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Login />}   />
                <Route path="/auth/google/callback" element={<Login />}   />
                <Route path="/reset_password/:token" element={<Login />}  />
                <Route path="/users" element={<Users />}  />
            </Routes>
        </BrowserRouter>
    );
}