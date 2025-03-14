import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Importez AuthContext
import "./header.scss";

function Header() {
  const { currentUser, logout } = useContext(AuthContext); // Utilisez useContext pour accéder au contexte

  return (
    <header className="header">
      <div className="header__logo">HexaLive</div>
      <nav className="header__nav">
        <Link to="/" className="header__nav-link">
          Accueil
        </Link>
        <Link to="/carte" className="header__nav-link">
          Carte
        </Link>
        <Link to="/calendrier" className="header__nav-link">
          Calendrier
        </Link>
        <Link to="/tableau" className="header__nav-link">
          Tableau
        </Link>
        <Link to="/mail" className="header__nav-link">
          Mail
        </Link>
        {currentUser ? (
          <>
            <Link to="/profil" className="header__nav-link">
              Profil
            </Link>
            <button onClick={logout} className="header__nav-button">
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/" className="header__nav-link">
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
