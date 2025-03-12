import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/home.jsx";
import Layout from "./layout.jsx";

export default function App() {
  return (
    <div className="App">
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
    </div>
  );
}
