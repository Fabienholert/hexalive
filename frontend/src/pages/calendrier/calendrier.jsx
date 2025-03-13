import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"; // Exemple avec Material-UI
import moment from "moment";
import React, { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "./EventForm";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]); // Initialisez avec vos données d'événements
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  }, []);

  const handleSelectSlot = useCallback(({ start, end }) => {
    setSelectedEvent({ start, end }); // Passer start et end pour pré-remplir le formulaire
    setIsFormOpen(true);
  }, []);

  const handleFormSubmit = (newEvent) => {
    setEvents([...events, newEvent]); // Ajouter l'événement au calendrier
    setIsFormOpen(false);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEvent(null); // Réinitialiser l'événement sélectionné
  };

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "20px" }}
        onSelectEvent={handleSelectEvent}
        selectable={true} // Important pour activer la sélection de plages horaires
        onSelectSlot={handleSelectSlot}
      />

      <Dialog open={isFormOpen} onClose={handleCloseForm}>
        <DialogTitle>
          {selectedEvent ? "Edit Event" : "Create Event"}
        </DialogTitle>
        <DialogContent>
          <EventForm
            initialValues={
              selectedEvent || { title: "", start: new Date(), end: new Date() }
            } // Initialisation avec les valeurs de l'événement ou les dates sélectionnées
            onSubmit={handleFormSubmit}
            onCancel={handleCloseForm}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
