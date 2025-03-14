import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./layout.jsx";
import Calendrier from "./pages/calendrier/calendrier.jsx";
import Carte from "./pages/carte/carte.jsx";
import Home from "./pages/home/home.jsx";
import Mail from "./pages/mail/mail.jsx";
import Profil from "./pages/profil/profil.jsx";
import Tableau from "./pages/tableau/tableau.jsx";

export default function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Routes publiques */}

            {/* Routes privées */}
            <Route
              path="/profil"
              element={
                <PrivateRoute>
                  <Layout>
                    <Profil />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/calendrier"
              element={
                <PrivateRoute>
                  <Layout>
                    <Calendrier />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tableau"
              element={
                <PrivateRoute>
                  <Layout>
                    <Tableau />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/carte"
              element={
                <PrivateRoute>
                  <Layout>
                    <Carte />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/mail"
              element={
                <PrivateRoute>
                  <Layout>
                    <Mail />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
