import fr from "date-fns/locale/fr";
import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useProfileStore from "../../store/profileStore";
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
  const profiles = useProfileStore((state) => state.profiles);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      selectedDate: selectedDate,
      utilisateur1: utilisateur1,
      utilisateur2: utilisateur2,
      eventName: eventName,
      emailContact: emailContact,
      freeField: freeField,
    };

    console.log("Données du formulaire:", formData);
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
              <select value={utilisateur1} onChange={handleUtilisateur1Change}>
                <option value="">Sélectionner un utilisateur</option>
                {profiles.map((profile, index) => (
                  <option key={index} value={profile.username}>
                    {profile.username} ({profile.ville})
                  </option>
                ))}
              </select>
              <select value={utilisateur2} onChange={handleUtilisateur2Change}>
                <option value="">Sélectionner un utilisateur</option>
                {profiles.map((profile, index) => (
                  <option key={index} value={profile.username}>
                    {profile.username} ({profile.ville})
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Nom de l'évènement"
                value={eventName}
                onChange={handleEventNameChange}
              />
              <input
                type="email"
                placeholder="mail du contact"
                value={emailContact}
                onChange={handleEmailContactChange}
              />
              <input
                type="text"
                placeholder="champs libre"
                value={freeField}
                onChange={handleFreeFieldChange}
              />
              <input type="submit" value="Envoyer" />
              <button type="button" onClick={closeModal}>
                Fermer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarWithModal;
