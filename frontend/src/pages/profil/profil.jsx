import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Importez le contexte
import "./profil.scss";

export default function Profil() {
  const { currentUser, updateProfile, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
    console.log("Profil : currentUser =", currentUser);
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
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Ne garder que les champs autorisés par l'API
      const updateData = {
        username: formData.username,
        ville: formData.ville,
        codePostal: formData.codePostal,
        facebook: formData.facebook || "",
        instagram: formData.instagram || "",
        tiktok: formData.tiktok || "",
      };

      console.log("Données envoyées à l'API :", updateData);

      if (currentUser) {
        const success = await updateProfile(updateData);
        if (success) {
          setIsEditing(false);
          alert("Profil mis à jour avec succès!");
        } else {
          setError(
            "Erreur lors de la mise à jour du profil. Veuillez réessayer."
          );
        }
      } else {
        // Pour l'inscription, on a besoin de l'email et du mot de passe
        const registerData = {
          ...updateData,
          email: formData.email,
          password: formData.password,
        };
        console.log("Tentative d'inscription avec:", registerData);
        const success = await register(registerData);
        if (success) {
          alert("Profil créé avec succès!");
          navigate("/carte");
        } else {
          setError("Erreur lors de la création du profil. Veuillez réessayer.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la modification du profil:", error);
      setError(
        error.response?.data?.message ||
          "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
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

          {error && <div className="profil__error">{error}</div>}

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
              required={!currentUser}
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password" // Correction ici
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
            <button
              type="submit"
              className="profil__submit-button"
              disabled={isLoading}
            >
              {isLoading
                ? "Chargement..."
                : currentUser
                ? "Mettre à jour"
                : "Créer le profil"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="profil__cancel-button"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
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
