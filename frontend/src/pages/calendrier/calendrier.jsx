import fr from "date-fns/locale/fr";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./calendrier.scss";
registerLocale("fr", fr);
setDefaultLocale("fr");

function CalendarWithModal() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    registerLocale("fr", fr);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            <p>Votre questionnaire ici...</p>
            <button onClick={closeModal}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarWithModal;
