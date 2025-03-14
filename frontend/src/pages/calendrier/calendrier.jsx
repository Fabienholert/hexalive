import fr from "date-fns/locale/fr";
import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useProfiles } from "../profil/profil.jsx";
import "./calendrier.scss";

registerLocale("fr", fr);
setDefaultLocale("fr");

function CalendarWithModal() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [utilisateur1, setUtilisateur1] = useState("");
  const [utilisateur2, setUtilisateur2] = useState("");
  const [eventName, setEventName] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [freeField, setFreeField] = useState("");
  const [motifDemande, setMotifDemande] = useState("");
  const { profiles } = useProfiles();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUtilisateur1Change = (e) => {
    setUtilisateur1(e.target.value);
  };

  const handleUtilisateur2Change = (e) => {
    setUtilisateur2(e.target.value);
  };

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEmailContactChange = (e) => {
    setEmailContact(e.target.value);
  };

  const handleFreeFieldChange = (e) => {
    setFreeField(e.target.value);
  };

  const handleMotifDemandeChange = (e) => {
    setMotifDemande(e.target.value);
  };

  const resetForm = () => {
    setSelectedDate(null);
    setUtilisateur1("");
    setUtilisateur2("");
    setEventName("");
    setEmailContact("");
    setFreeField("");
    setMotifDemande("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Créer un nouvel ID unique
    const newId = Date.now().toString();

    const formData = {
      id: newId,
      selectedDate: selectedDate,
      utilisateur1: utilisateur1,
      utilisateur2: utilisateur2,
      eventName: eventName,
      emailContact: emailContact,
      freeField: freeField,
      motifDemande: motifDemande,
      status: "en attente de validation", // Statut par défaut
    };

    // Récupérer les demandes existantes
    const existingDemandes = JSON.parse(
      localStorage.getItem("demandes") || "[]"
    );

    // Ajouter la nouvelle demande
    const updatedDemandes = [...existingDemandes, formData];

    // Sauvegarder dans le localStorage
    localStorage.setItem("demandes", JSON.stringify(updatedDemandes));

    // Réinitialiser le formulaire
    resetForm();

    // Fermer le modal
    closeModal();
  };

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="dd/MM/yyyy"
        locale="fr"
      />

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Questionnaire pour le {selectedDate?.toLocaleDateString()}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Informations de l'événement</h3>
                <input
                  type="text"
                  placeholder="Nom de l'évènement"
                  value={eventName}
                  onChange={handleEventNameChange}
                  required
                />
                <select
                  value={motifDemande}
                  onChange={handleMotifDemandeChange}
                  required
                  className="motif-select"
                >
                  <option value="">Sélectionner le motif de la demande</option>
                  <option value="report-photo">Report photo</option>
                  <option value="interview">Interview</option>
                  <option value="chronique-album">Chronique album</option>
                </select>
              </div>

              <div className="form-section">
                <h3>Participants</h3>
                <div className="participant-field">
                  <label>Utilisateur principal *</label>
                  <select
                    value={utilisateur1}
                    onChange={handleUtilisateur1Change}
                    required
                  >
                    <option value="">Sélectionner un utilisateur</option>
                    {profiles.map((profile, index) => (
                      <option key={index} value={profile.username}>
                        {profile.username} ({profile.ville})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="participant-field">
                  <label>Utilisateur secondaire (optionnel)</label>
                  <select
                    value={utilisateur2}
                    onChange={handleUtilisateur2Change}
                  >
                    <option value="">Aucun utilisateur secondaire</option>
                    {profiles.map((profile, index) => (
                      <option key={index} value={profile.username}>
                        {profile.username} ({profile.ville})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h3>Informations de contact</h3>
                <input
                  type="email"
                  placeholder="Email du contact"
                  value={emailContact}
                  onChange={handleEmailContactChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Informations complémentaires"
                  value={freeField}
                  onChange={handleFreeFieldChange}
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={closeModal}>
                  Annuler
                </button>
                <button type="submit">Envoyer la demande</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarWithModal;
