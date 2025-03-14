import fr from "date-fns/locale/fr";
import React, { useContext, useEffect, useState } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../contexts/AuthContext"; // Importez AuthContext
import "./calendrier.scss";

registerLocale("fr", fr);
setDefaultLocale("fr");

function CalendarWithModal() {
  const { currentUser } = useContext(AuthContext); // Utilisez useContext pour obtenir les infos de l'utilisateur

  const [profiles, setProfiles] = useState([]); //état local pour stocker les profils

  useEffect(() => {
    // Utilisez currentUser pour créer un tableau de profils (ou récupérez-les d'une autre source)
    if (currentUser) {
      setProfiles([currentUser]); // Créez un tableau avec l'utilisateur actuel comme seul profil
    } else {
      setProfiles([]);
    }
  }, [currentUser]);

  return <div className="calendar-container"></div>;
}

export default CalendarWithModal;
