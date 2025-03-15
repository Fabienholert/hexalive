import axios from "axios";
import fr from "date-fns/locale/fr";
import React, { useContext, useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import { AuthContext } from "../../contexts/AuthContext";
import "./calendrier.scss";

// Assurez-vous que cette ligne soit présente pour l'accessibilité
Modal.setAppElement("#root"); // Remplacez '#root' par l'id de votre élément racine si nécessaire

registerLocale("fr", fr);
setDefaultLocale("fr");

function CalendarWithModal() {
  const { currentUser } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour le formulaire
  const [utilisateur1, setUtilisateur1] = useState("");
  const [utilisateur2, setUtilisateur2] = useState("");
  const [emailContact, setEmailContact] = useState("");
  const [motifDemande, setMotifDemande] = useState("report photo");
  const [eventName, setEventName] = useState("");
  const [freeField, setFreeField] = useState("");

  // Récupérer les demandes stockées pour marquer les dates dans le calendrier
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    // Charger les demandes depuis localStorage
    const demandesStockees = localStorage.getItem("demandes");
    if (demandesStockees) {
      setDemandes(JSON.parse(demandesStockees));
    }

    // Charger les profils utilisateurs
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/users"
        );
        setProfiles(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des profils:", err);
        setError("Impossible de charger les profils");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div>Chargement des profils...</div>;
  if (error) return <div>{error}</div>;

  // Fonction pour vérifier si une date a des événements
  const hasEvents = (date) => {
    return demandes.some((demande) => {
      const demandeDate = new Date(demande.selectedDate);
      return (
        demandeDate.getDate() === date.getDate() &&
        demandeDate.getMonth() === date.getMonth() &&
        demandeDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Fonction pour ouvrir la modale avec la date sélectionnée
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalIsOpen(true);

    // Pré-remplir avec l'utilisateur actuel comme premier utilisateur si disponible
    if (currentUser) {
      setUtilisateur1(currentUser.username || currentUser.email);
      // Ne pas pré-remplir l'email de contact
      setEmailContact("");
    }
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation : utilisateur obligatoire
    if (!utilisateur1) {
      alert("Veuillez sélectionner un utilisateur principal");
      return;
    }

    // Créer une nouvelle demande
    const nouvelleDemande = {
      id: Date.now().toString(), // ID unique simple
      selectedDate: selectedDate.toISOString(),
      utilisateur1,
      utilisateur2,
      emailContact,
      motifDemande,
      eventName,
      freeField,
      status: "en attente de validation", // Statut par défaut
    };

    // Récupérer les demandes existantes
    const demandesStockees = localStorage.getItem("demandes");
    let demandesArray = [];

    if (demandesStockees) {
      demandesArray = JSON.parse(demandesStockees);
    }

    // Ajouter la nouvelle demande
    demandesArray.push(nouvelleDemande);

    // Sauvegarder dans localStorage
    localStorage.setItem("demandes", JSON.stringify(demandesArray));

    // Mettre à jour l'état local pour afficher les indicateurs du calendrier
    setDemandes(demandesArray);

    // Fermer la modale et réinitialiser le formulaire
    setModalIsOpen(false);
    resetForm();
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setUtilisateur1("");
    setUtilisateur2("");
    setEmailContact("");
    setMotifDemande("report photo");
    setEventName("");
    setFreeField("");
  };

  // Rendu personnalisé pour afficher un indicateur sur les dates avec événements
  const renderDayContents = (day, date) => {
    const formattedDate = date.getDate();
    const hasEventOnDate = hasEvents(date);

    return (
      <div className="custom-day-content">
        {formattedDate}
        {hasEventOnDate && <div className="event-indicator">•</div>}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateClick}
        inline
        locale="fr"
        renderDayContents={renderDayContents}
      />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Formulaire d'événement"
        className="event-modal"
        overlayClassName="event-modal-overlay"
      >
        <h2>
          Créer une demande pour le {selectedDate.toLocaleDateString("fr-FR")}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Utilisateur principal* :</label>
            <select
              value={utilisateur1}
              onChange={(e) => setUtilisateur1(e.target.value)}
              required
            >
              <option value="">Sélectionnez un utilisateur</option>
              {profiles.map((profile) => (
                <option
                  key={profile._id}
                  value={profile.username || profile.email}
                >
                  {profile.username || profile.email}{" "}
                  {profile.ville ? `(${profile.ville})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Utilisateur secondaire :</label>
            <select
              value={utilisateur2}
              onChange={(e) => setUtilisateur2(e.target.value)}
            >
              <option value="">Sélectionnez un utilisateur (optionnel)</option>
              {profiles
                .filter(
                  (profile) =>
                    (profile.username || profile.email) !== utilisateur1
                )
                .map((profile) => (
                  <option
                    key={profile._id}
                    value={profile.username || profile.email}
                  >
                    {profile.username || profile.email}{" "}
                    {profile.ville ? `(${profile.ville})` : ""}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label>Email de contact pour la demande :</label>
            <input
              type="email"
              value={emailContact}
              onChange={(e) => setEmailContact(e.target.value)}
              placeholder="Email du destinataire de la demande"
            />
          </div>

          <div className="form-group">
            <label>Motif de demande :</label>
            <select
              value={motifDemande}
              onChange={(e) => setMotifDemande(e.target.value)}
            >
              <option value="report photo">Report photo</option>
              <option value="chronique album">Chronique album</option>
              <option value="demande d'interview">Demande d'interview</option>
            </select>
          </div>

          <div className="form-group">
            <label>Nom de l'événement :</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Nom de l'événement"
              required
            />
          </div>

          <div className="form-group">
            <label>Informations supplémentaires :</label>
            <textarea
              value={freeField}
              onChange={(e) => setFreeField(e.target.value)}
              placeholder="Informations supplémentaires..."
              rows="4"
            />
          </div>

          <div className="form-buttons">
            <button type="button" onClick={() => setModalIsOpen(false)}>
              Annuler
            </button>
            <button type="submit">Envoyer la demande</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CalendarWithModal;
