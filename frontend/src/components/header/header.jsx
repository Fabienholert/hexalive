import { NavLink, useNavigate } from "react-router-dom";
import MonLogo from "../../assets/monlogo.png";
import { useAuth } from "../../contexts/AuthContext";
import "./header.scss";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <img src={MonLogo} alt="mon logo " className="header__monLogo" />
      <nav className="header__nav">
        <NavLink to="/" className="header__link">
          {" "}
          Accueil
        </NavLink>
        <NavLink to="/profil" className="header__link">
          {" "}
          Profil
        </NavLink>
        <NavLink to="/calendrier" className="header__link">
          {" "}
          Calendrier
        </NavLink>
        <NavLink to="/tableau" className="header__link">
          {" "}
          Tableau d'accréditation
        </NavLink>
        <NavLink to="/carte" className="header__link">
          {" "}
          Carte des membres
        </NavLink>
        <NavLink to="/mail" className="header__link">
          {" "}
          Mail d'accréditation
        </NavLink>
        <button onClick={handleLogout} className="header__logout-btn">
          Se déconnecter
        </button>
      </nav>
    </header>
  );
}
