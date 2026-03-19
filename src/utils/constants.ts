export const TYPE_FORM = {
    LOGIN: "login",
    REGISTER: "register",
    FORGET: "forget",
    RESET: "reset",
} as const;

export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

export const API_GOOGLE_AUTH_URL = "http://localhost:3001/auth/google";