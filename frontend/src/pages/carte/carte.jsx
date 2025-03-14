import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useProfiles } from "../profil/profil.jsx";
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

export default function Carte() {
  const { profiles } = useProfiles();
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

  const sortProfiles = (profilesArray, key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    return [...profilesArray].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " ↑" : " ↓";
    }
    return "";
  };

  return (
    <div className="carte__container">
      <h2>Carte des Membres</h2>

      <div className="carte__map-container">
        <MapContainer
          center={[46.603354, 1.888334]} // Centre de la France
          zoom={6}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
        <h3>Liste des Membres</h3>
        <div className="carte__table-wrapper">
          <table className="carte__table">
            <thead>
              <tr>
                <th
                  onClick={() =>
                    setSortConfig(sortProfiles(profiles, "username"))
                  }
                >
                  Nom d'utilisateur{getSortIcon("username")}
                </th>
                <th
                  onClick={() => setSortConfig(sortProfiles(profiles, "ville"))}
                >
                  Ville{getSortIcon("ville")}
                </th>
                <th
                  onClick={() =>
                    setSortConfig(sortProfiles(profiles, "codePostal"))
                  }
                >
                  Code Postal{getSortIcon("codePostal")}
                </th>
                <th>Réseaux sociaux</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile, index) => (
                <tr key={index}>
                  <td>{profile.username}</td>
                  <td>{profile.ville}</td>
                  <td>{profile.codePostal}</td>
                  <td>
                    <div className="carte__social-icons">
                      {profile.facebook && (
                        <span className="social-icon">FB</span>
                      )}
                      {profile.instagram && (
                        <span className="social-icon">IG</span>
                      )}
                      {profile.tiktok && (
                        <span className="social-icon">TK</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="carte__profiles">
        {profiles.map((profile, index) => (
          <div key={index} className="carte__profile-card">
            <h3>{profile.username}</h3>
            <p>Ville: {profile.ville}</p>
            <p>Code Postal: {profile.codePostal}</p>
            <div className="carte__social-links">
              {profile.facebook && <p>Facebook: {profile.facebook}</p>}
              {profile.instagram && <p>Instagram: {profile.instagram}</p>}
              {profile.tiktok && <p>TikTok: {profile.tiktok}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
