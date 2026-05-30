import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({
  children,
}) {

  const [admin, setAdmin] =
    useState(null);

  useEffect(() => {

    const storedAdmin =
      localStorage.getItem("admin");

    if (storedAdmin) {
      setAdmin(
        JSON.parse(storedAdmin)
      );
    }

  }, []);

  const login = (
    adminData,
    token
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "admin",
      JSON.stringify(adminData)
    );

    setAdmin(adminData);
  };

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "admin"
    );

    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}