import { useContext, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { EntryContext, EntryProvider } from "./utilities/globalContext";

export default function App() {
  const [darkModeValue, setDarkModeValue] = useState<boolean>(false);
  const toggleDarkMode = (darkModeValue: boolean) => {
    setDarkModeValue(darkModeValue);
  };
  return (
    <section className={`${darkModeValue ? "dark" : ""}`}>
      <Router>
        <EntryProvider>
          <NavBar darkModeValue={darkModeValue} toggleDarkMode={toggleDarkMode}></NavBar>
          <Routes>
            <Route path="/" element={<AllEntries />}></Route>
            <Route path="create" element={<NewEntry />}></Route>
            <Route path="edit/:id" element={<EditEntry />}></Route>
          </Routes>
        </EntryProvider>
      </Router>
    </section>
  );
}
