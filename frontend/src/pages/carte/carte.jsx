import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { AuthContext } from "../../contexts/AuthContext";
import "./carte.scss";

// Correction des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const API_URL = "http://localhost:3000/api";

export default function Carte() {
  const { currentUser } = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer tous les profils
    const fetchAllProfiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/users`);
        console.log("Profils récupérés:", response.data);
        setProfiles(response.data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des profils:", err);
        setError("Impossible de charger les profils");
        // Si l'utilisateur est connecté, au moins afficher son profil
        if (currentUser) {
          setProfiles([currentUser]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllProfiles();
  }, [currentUser]);

  const [profilesWithCoords, setProfilesWithCoords] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    // Fonction pour convertir les codes postaux en coordonnées
    const fetchCoordinates = async (profile) => {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${profile.codePostal}&limit=1`
        );
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].geometry.coordinates;
          return { ...profile, coordinates: [lat, lng] };
        }
        return null;
      } catch (error) {
        console.error("Erreur lors de la récupération des coordonnées:", error);
        return null;
      }
    };

    // Convertir tous les codes postaux en coordonnées
    const updateCoordinates = async () => {
      const profilesWithCoordsPromises = profiles.map(fetchCoordinates);
      const results = await Promise.all(profilesWithCoordsPromises);
      setProfilesWithCoords(results.filter(Boolean));
    };

    updateCoordinates();
  }, [profiles]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProfiles = React.useMemo(() => {
    const sortableProfiles = [...profiles];
    if (sortConfig.key) {
      sortableProfiles.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProfiles;
  }, [profiles, sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  if (loading)
    return <div className="carte__loading">Chargement de la carte...</div>;

  return (
    <div className="carte__container">
      <h2>Carte des Membres</h2>

      {error && <div className="carte__error">{error}</div>}

      <div className="carte__map-container">
        <MapContainer
          center={[46.603354, 1.888334]} // Centre de la France
          zoom={6}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {profilesWithCoords.map((profile, index) => (
            <Marker key={index} position={profile.coordinates}>
              <Popup>
                <div className="carte__popup">
                  <h3>{profile.username}</h3>
                  <p>Ville: {profile.ville}</p>
                  <p>Code Postal: {profile.codePostal}</p>
                  {profile.facebook && <p>Facebook: {profile.facebook}</p>}
                  {profile.instagram && <p>Instagram: {profile.instagram}</p>}
                  {profile.tiktok && <p>TikTok: {profile.tiktok}</p>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="carte__table-container">
        <h3>Liste des Membres ({profiles.length})</h3>
        <div className="carte__table-wrapper">
          <table className="carte__table">
            <thead>
              <tr>
                <th onClick={() => requestSort("username")}>
                  Nom d'utilisateur{getSortIcon("username")}
                </th>
                <th onClick={() => requestSort("ville")}>
                  Ville{getSortIcon("ville")}
                </th>
                <th onClick={() => requestSort("codePostal")}>
                  Code Postal{getSortIcon("codePostal")}
                </th>
                <th>Réseaux sociaux</th>
              </tr>
            </thead>
            <tbody>
              {sortedProfiles.map((profile, index) => (
                <tr
                  key={index}
                  className={
                    profile._id === currentUser?._id
                      ? "carte__current-user"
                      : ""
                  }
                >
                  <td>{profile.username}</td>
                  <td>{profile.ville}</td>
                  <td>{profile.codePostal}</td>
                  <td>
                    <div className="carte__social-icons">
                      {profile.facebook && (
                        <span className="social-icon" title={profile.facebook}>
                          FB
                        </span>
                      )}
                      {profile.instagram && (
                        <span className="social-icon" title={profile.instagram}>
                          IG
                        </span>
                      )}
                      {profile.tiktok && (
                        <span className="social-icon" title={profile.tiktok}>
                          TK
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
