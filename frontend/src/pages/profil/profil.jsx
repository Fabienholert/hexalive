import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profil.scss";

// Création du contexte pour les profils
export const ProfileContext = createContext();

// Hook personnalisé pour utiliser le contexte des profils
export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfiles doit être utilisé à l'intérieur d'un ProfileProvider"
    );
  }
  return context;
};

// Provider component
export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const addProfile = (profile) => {
    setProfiles((currentProfiles) => [...currentProfiles, profile]);
    setCurrentUser(profile); // Définir l'utilisateur actuel lors de la création du profil
  };

  const updateProfile = (updatedProfile) => {
    setProfiles((currentProfiles) =>
      currentProfiles.map((profile) =>
        profile.email === updatedProfile.email ? updatedProfile : profile
      )
    );
    setCurrentUser(updatedProfile);
  };

  const getProfiles = () => profiles;

  return (
    <ProfileContext.Provider
      value={{ profiles, currentUser, addProfile, updateProfile, getProfiles }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default function Profil() {
  const navigate = useNavigate();
  const { addProfile, updateProfile, currentUser } = useProfiles();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ville: "",
    codePostal: "",
    facebook: "",
    instagram: "",
    tiktok: "",
    username: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentUser) {
        await updateProfile(formData);
        setIsEditing(false);
        alert("Profil mis à jour avec succès!");
      } else {
        await addProfile(formData);
        alert("Profil créé avec succès!");
        navigate("/carte");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du profil:", error);
      alert("Erreur lors de la modification du profil. Veuillez réessayer.");
    }
  };

  return (
    <div className="profil__container">
      {currentUser && !isEditing ? (
        <div className="profil__view">
          <h2>Mon Profil</h2>
          <div className="profil__info">
            <div className="profil__section">
              <h3>Informations personnelles</h3>
              <p>
                <strong>Nom d'utilisateur:</strong> {currentUser.username}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>Ville:</strong> {currentUser.ville}
              </p>
              <p>
                <strong>Code Postal:</strong> {currentUser.codePostal}
              </p>
            </div>

            <div className="profil__section">
              <h3>Réseaux sociaux</h3>
              {currentUser.facebook && (
                <p>
                  <strong>Facebook:</strong> {currentUser.facebook}
                </p>
              )}
              {currentUser.instagram && (
                <p>
                  <strong>Instagram:</strong> {currentUser.instagram}
                </p>
              )}
              {currentUser.tiktok && (
                <p>
                  <strong>TikTok:</strong> {currentUser.tiktok}
                </p>
              )}
            </div>

            <button
              className="profil__edit-button"
              onClick={() => setIsEditing(true)}
            >
              Modifier le profil
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profil__form">
          <h2>{currentUser ? "Modifier le profil" : "Créer un profil"}</h2>

          <div className="profil__form-section">
            <h3>Informations personnelles</h3>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Votre nom d'utilisateur"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Votre email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <label htmlFor="codepostal">Code Postal</label>
            <input
              type="text"
              id="codepostal"
              name="codePostal"
              placeholder="Votre code postal"
              required
              pattern="[0-9]{5}"
              title="Veuillez entrer un code postal à 5 chiffres"
              value={formData.codePostal}
              onChange={handleInputChange}
            />
            <label htmlFor="ville">Ville</label>
            <input
              type="text"
              id="ville"
              name="ville"
              placeholder="Votre ville"
              required
              value={formData.ville}
              onChange={handleInputChange}
            />
          </div>

          <div className="profil__form-section">
            <h3>Réseaux sociaux</h3>
            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              placeholder="Votre profil Facebook"
              value={formData.facebook}
              onChange={handleInputChange}
            />
            <label htmlFor="instagram">Instagram</label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              placeholder="Votre profil Instagram"
              value={formData.instagram}
              onChange={handleInputChange}
            />
            <label htmlFor="tiktok">TikTok</label>
            <input
              type="text"
              id="tiktok"
              name="tiktok"
              placeholder="Votre profil TikTok"
              value={formData.tiktok}
              onChange={handleInputChange}
            />
          </div>

          <div className="profil__form-actions">
            <button type="submit" className="profil__submit-button">
              {currentUser ? "Mettre à jour" : "Créer le profil"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="profil__cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
