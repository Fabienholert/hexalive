import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.scss";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialisation de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulation d'une requête à l'API (à remplacer par votre code réel)
    try {
      // ***REMPLACER CECI AVEC VOTRE APPEL API RÉEL***
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok) {
      //   throw new Error('Échec de la connexion');
      // }

      // const data = await response.json();
      // console.log('Connexion réussie:', data);

      // Redirection après la connexion réussie (à remplacer par votre route)
      navigate("/calendrier");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      // Afficher un message d'erreur à l'utilisateur (par exemple, dans un état local)
      alert("Erreur de connexion. Veuillez réessayer."); // À remplacer par une meilleure gestion des erreurs
    } finally {
      setEmail(""); // Réinitialise l'état local
      setPassword(""); // Réinitialise l'état local
    }
  };

  const handleRegisterClick = () => {
    // Redirection vers la page d'inscription
    navigate("/profil");
  };

  return (
    <div className="home__container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Votre email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="votre mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Se connecter" />
        <button type="button" onClick={handleRegisterClick}>
          S'inscrire
        </button>
      </form>
    </div>
  );
}
