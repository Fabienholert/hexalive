import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth doit être utilisé à l'intérieur d'un AuthProvider"
    );
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    // Ici, vous pourriez ajouter une vraie logique d'authentification avec une API
    // Pour l'exemple, on vérifie juste si les champs ne sont pas vides
    if (email && password) {
      setIsAuthenticated(true);
      setCurrentUser({ email });
      // Stocker l'état de connexion dans localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    // Nettoyer localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
  };

  // Vérifier l'état de connexion au chargement
  React.useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedAuth === "true" && storedEmail) {
      setIsAuthenticated(true);
      setCurrentUser({ email: storedEmail });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
