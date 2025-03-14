import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import "./home.scss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, authError, register } = useContext(AuthContext); // 1. Déclare et appelle le contexte
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Tentative de connexion avec :", { email, password });
      const success = await login(email, password);
      console.log("Connexion réussie ? ", success);
      if (success) {
        console.log("Navigation vers /profil");
        navigate("/profil");
      } else {
        setError(authError || "Email ou mot de passe incorrect"); // 2. Affiche l’erreur
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = async () => {
    setIsLoading(true);
    setError(""); // Réinitialisez l'erreur
    try {
      const success = await register({
        email,
        password,
        username: email.split("@")[0],
        ville: "Inconnu",
        codePostal: "00000",
      }); // Utilisez register
      if (success) {
        navigate("/profil");
      } else {
        setError(authError || "Erreur lors de l’inscription."); // 3. affiche l’erreur ici aussi
      }
    } catch (error) {
      console.error("Erreur lors de l’inscription :", error);
      setError("Erreur lors de l’inscription.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home__container">
      <div className="home__content">
        <h1>Bienvenue sur HexaLive</h1>
        <p>Connectez-vous pour accéder à toutes les fonctionnalités</p>

        <form onSubmit={handleSubmit} className="home__login-form">
          {error && <div className="home__error">{error}</div>}

          <div className="home__form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Votre email"
              disabled={isLoading}
            />
          </div>

          <div className="home__form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Votre mot de passe"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="home__submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        <div className="home__buttons-container">
          <button
            type="button"
            onClick={handleRegisterClick}
            className="home__register-btn"
            disabled={isLoading}
          >
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}
