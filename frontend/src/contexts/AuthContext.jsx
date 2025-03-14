import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api";
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
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null); // Nouvel état pour les erreurs

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/profile`);
      setCurrentUser(response.data);
      setIsAuthenticated(true);
      setAuthError(null); // Effacer les erreurs précédentes
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      // Vérifier le code d'état avant de déconnecter l'utilisateur
      if (error.response && error.response.status === 401) {
        logout(); // Déconnecter si le token est invalide
      } else {
        // Gérer les autres erreurs (par exemple, afficher un message à l'utilisateur)
        setAuthError("Erreur lors de la récupération du profil.");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Tentative de connexion avec :", { email, password }); // AJOUTER
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      console.log("Réponse de l'API :", response); // AJOUTER
      console.log("Statut de la réponse :", response.status); // AJOUTER
      console.log("Données de la réponse :", response.data); // AJOUTER

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setCurrentUser(user);
      setIsAuthenticated(true);
      setAuthError(null); // Effacer les erreurs précédentes
      return true;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      console.error("Détails de l'erreur :", error.response); // AJOUTER

      setAuthError(
        error.response?.data?.message || "Email ou mot de passe incorrect"
      ); // Définir le message d'erreur
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setCurrentUser(user);
      setIsAuthenticated(true);
      setAuthError(null); // Effacer les erreurs précédentes
      return true;
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      setAuthError(
        error.response?.data?.message || "Erreur lors de l'inscription"
      ); // Définir le message d'erreur
      return false;
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/auth/profile`, userData);
      setCurrentUser(response.data); // Mettre à jour avec les données complètes
      setAuthError(null); // Effacer les erreurs précédentes
      return true;
    } catch (error) {
      console.error("Erreur de mise à jour du profil:", error);
      setAuthError(
        error.response?.data?.message ||
          "Erreur lors de la mise à jour du profil"
      ); // Définir le message d'erreur
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setCurrentUser(null);
    setIsAuthenticated(false);
    setAuthError(null); // Effacer les erreurs
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        register,
        updateProfile,
        authError, // Fournir l'état d'erreur
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
