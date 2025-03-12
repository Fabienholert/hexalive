import { NavLink } from "react-router-dom";
import MonLogo from "../../assets/monlogo.png";
import "./header.scss";

export default function Header() {
  return (
    <header className="header">
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
      </nav>
      <img src={MonLogo} alt="mon logo " className="header__monLogo" />
    </header>
  );
}
