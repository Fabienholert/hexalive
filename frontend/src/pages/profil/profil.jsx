import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProfileStore from "../../store/profileStore";
import "./profil.scss";

export default function Profil() {
  const navigate = useNavigate();
  const addProfile = useProfileStore((state) => state.addProfile);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [username, setUsername] = useState(""); // Ajout de l'état pour le nom d'utilisateur

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProfile = {
      username,
      email,
      ville,
      codePostal,
      facebook,
      instagram,
      tiktok,
    };

    try {
      addProfile(newProfile);
      alert("Profil créé avec succès!");
      navigate("/carte"); // Redirection vers la carte après création
    } catch (error) {
      console.error("Erreur lors de la création du profil:", error);
      alert("Erreur lors de la création du profil. Veuillez réessayer.");
    }
  };

  return (
    <div className="profil__container">
      <form onSubmit={handleSubmit}>
        <h2>Informations personnelles</h2>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Votre nom d'utilisateur"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Votre email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Votre mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="codepostal">Code Postal</label>
        <input
          type="text" // Utilisation de type="text" pour gérer les codes postaux commençant par 0
          id="codepostal"
          name="codepostal"
          placeholder="Votre code postal"
          required
          pattern="[0-9]{5}" // Validation: 5 chiffres
          title="Veuillez entrer un code postal à 5 chiffres"
          value={codePostal}
          onChange={(e) => setCodePostal(e.target.value)}
        />
        <label htmlFor="ville">Ville</label>
        <input
          type="text"
          id="ville"
          name="ville"
          placeholder="Votre ville"
          required
          value={ville}
          onChange={(e) => setVille(e.target.value)}
        />

        <h2>Réseaux sociaux</h2>
        <label htmlFor="facebook">Facebook</label>
        <input
          type="text"
          id="facebook"
          name="facebook"
          placeholder="Votre profil Facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label htmlFor="instagram">Instagram</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          placeholder="Votre profil Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label htmlFor="tiktok">TikTok</label>
        <input
          type="text"
          id="tiktok"
          name="tiktok"
          placeholder="Votre profil TikTok"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
        />
        <input type="submit" value="Enregistrer" />
      </form>
    </div>
  );
}
