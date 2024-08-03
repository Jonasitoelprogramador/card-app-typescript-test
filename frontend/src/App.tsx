import { useContext, useState } from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryContext, EntryProvider } from './utilities/globalContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default function App() {
  const [darkModeValue, setDarkModeValue] = useState<boolean>(false)
  const toggleDarkMode = (darkModeValue: boolean) => {
    setDarkModeValue((darkModeValue))
  }
  return (
  <section className={`${darkModeValue ? "dark" : ""}`}>
    <Router>
    <EntryProvider>
      <NavBar darkModeValue={darkModeValue} toggleDarkMode={toggleDarkMode}></NavBar>
      <Routes>
        <Route path="/" element={<AllEntries/>}>
        </Route>
        <Route path="create" element={<NewEntry/>}>
        </Route>
        <Route path="edit/:id" element={<EditEntry/>}>
        </Route>
      </Routes>
    </EntryProvider>
    </Router>
  </section>
    
  );
}
