import { useContext } from "react";
import ReactSwitch from "react-switch";
import { EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

interface Props {
  darkModeValue: boolean;
  toggleDarkMode: (darkModeValue: boolean) => void;
}

const ToggleSwitch = ({ darkModeValue, toggleDarkMode }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span className="font-bold dark:text-white">Dark Mode</span>
      <ReactSwitch checked={darkModeValue} onChange={toggleDarkMode} />
    </div>
  );
};

export default ToggleSwitch;
