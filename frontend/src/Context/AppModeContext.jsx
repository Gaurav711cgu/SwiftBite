import { createContext, useContext, useState, useEffect } from "react";

export const AppModeContext = createContext(null);

// Admin credentials (hardcoded for demo — in production use backend auth)
const ADMIN_EMAIL    = "admin@swiftbite.dev";
const ADMIN_PASSWORD = "admin123";

const AppModeContextProvider = ({ children }) => {
  const [mode, setMode]           = useState(() => localStorage.getItem("sb_mode") || "user");
  const [adminAuthed, setAdminAuthed] = useState(() => localStorage.getItem("sb_admin") === "true");
  const [adminLoginErr, setAdminLoginErr] = useState("");

  const switchToAdmin = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      setMode("admin");
      setAdminLoginErr("");
      localStorage.setItem("sb_admin", "true");
      localStorage.setItem("sb_mode", "admin");
      return true;
    }
    setAdminLoginErr("Invalid admin credentials");
    return false;
  };

  const switchToUser = () => {
    setMode("user");
    localStorage.setItem("sb_mode", "user");
  };

  const logoutAdmin = () => {
    setAdminAuthed(false);
    setMode("user");
    localStorage.removeItem("sb_admin");
    localStorage.setItem("sb_mode", "user");
  };

  const isAdmin = mode === "admin" && adminAuthed;

  return (
    <AppModeContext.Provider value={{ mode, isAdmin, adminAuthed, switchToAdmin, switchToUser, logoutAdmin, adminLoginErr, setAdminLoginErr }}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => useContext(AppModeContext);
export default AppModeContextProvider;
