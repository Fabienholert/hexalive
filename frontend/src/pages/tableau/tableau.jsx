import React, { useEffect, useState } from "react";
import "./tableau.scss";

const Tableau = () => {
  const [demandes, setDemandes] = useState([]);

  // Simuler le chargement des données (à remplacer par votre API)
  useEffect(() => {
    const demandesStockees = localStorage.getItem("demandes");
    if (demandesStockees) {
      setDemandes(JSON.parse(demandesStockees));
    }
  }, []);

  // Sauvegarder les changements dans le localStorage
  useEffect(() => {
    localStorage.setItem("demandes", JSON.stringify(demandes));
  }, [demandes]);

  const handleStatusChange = (demandeId, newStatus) => {
    setDemandes((prevDemandes) => {
      if (newStatus === "refuser") {
        return prevDemandes.filter((demande) => demande.id !== demandeId);
      }
      return prevDemandes.map((demande) =>
        demande.id === demandeId ? { ...demande, status: newStatus } : demande
      );
    });
  };

  const getStatusColor = (status) => {
    const statusColors = {
      "en attente de validation": "status-waiting",
      "à faire": "status-todo",
      "à relancer": "status-reminder",
      valider: "status-validated",
      refuser: "status-refused",
    };
    return statusColors[status] || "";
  };

  return (
    <div className="tableau-container">
      <h2>Suivi des Demandes</h2>
      <div className="tableau-wrapper">
        <table className="demandes-tableau">
          <thead>
            <tr>
              <th>Date</th>
              <th>Motif</th>
              <th>Utilisateur 1</th>
              <th>Utilisateur 2</th>
              <th>Contact Email</th>
              <th>Informations</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande) => (
              <tr key={demande.id}>
                <td>
                  {new Date(demande.selectedDate).toLocaleDateString("fr-FR")}
                </td>
                <td>{demande.motifDemande}</td>
                <td>{demande.utilisateur1}</td>
                <td>{demande.utilisateur2}</td>
                <td>{demande.emailContact}</td>
                <td>{demande.freeField}</td>
                <td>
                  <select
                    value={demande.status}
                    onChange={(e) =>
                      handleStatusChange(demande.id, e.target.value)
                    }
                    className={`status-select ${getStatusColor(
                      demande.status
                    )}`}
                  >
                    <option value="en attente de validation">
                      En attente de validation
                    </option>
                    <option value="à faire">À faire</option>
                    <option value="à relancer">À relancer</option>
                    <option value="valider">Validé</option>
                    <option value="refuser">Refusé</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tableau;
