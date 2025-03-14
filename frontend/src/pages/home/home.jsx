import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./home.scss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (login(email, password)) {
      navigate("/profil");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  const handleRegisterClick = () => {
    // Redirection vers la page d'inscription
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
            />
          </div>

          <button type="submit" className="home__submit-btn">
            Se connecter
          </button>
        </form>

        <button type="button" onClick={handleRegisterClick}>
          S'inscrire
        </button>
      </div>
    </div>
  );
}
