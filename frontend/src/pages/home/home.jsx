import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./home.scss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Tentative de connexion avec :", { email, password }); // AJOUTER : Vérification des données
      const success = await login(email, password);
      console.log("Connexion réussie ? ", success); // AJOUTER : Vérification du succès
      if (success) {
        console.log("Navigation vers /profil"); // AJOUTER : Vérification de la navigation
        navigate("/profil");
      } else {
        setError("Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    console.log("Clic sur S'inscrire, navigation vers /profil"); // AJOUTER : Vérification du clic
    navigate("/profil");
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
