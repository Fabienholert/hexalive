import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout.jsx";
import Calendrier from "./pages/calendrier/calendrier.jsx";
import Carte from "./pages/carte/carte.jsx";
import Home from "./pages/home/home.jsx";
import Mail from "./pages/mail/mail.jsx";
import Profil, { ProfileProvider } from "./pages/profil/profil.jsx";
import Tableau from "./pages/tableau/tableau.jsx";

export default function App() {
  return (
    <div className="App">
      <ProfileProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/calendrier" element={<Calendrier />} />
              <Route path="/tableau" element={<Tableau />} />
              <Route path="/carte" element={<Carte />} />
              <Route path="/mail" element={<Mail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </div>
  );
}
