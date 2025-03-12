import { Outlet } from "react-router-dom";
import Header from "../components/header/header";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Les routes enfants seront affichées ici */}
      </main>
    </>
  );
}
