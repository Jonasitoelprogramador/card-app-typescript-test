import {NavLink} from 'react-router-dom'
import ToggleSwitch from './ToggleSwitch';

interface Props {
  darkModeValue: boolean;
  toggleDarkMode: (darkModeValue: boolean) => void;
}

const NavBar = ({ darkModeValue, toggleDarkMode }: Props) => {
    return(
      <nav className="flex dark:bg-black">
        <span className="w-2/12"></span>
        <span className="flex w-8/12 justify-center gap-5">
          <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/'}>All Entries</NavLink>
          <NavLink className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 rounded-md font-medium text-white" to={'/create'}>New Entry</NavLink>
        </span>
        <span className="flex w-2/12 justify-center">
          <ToggleSwitch darkModeValue={darkModeValue} toggleDarkMode={toggleDarkMode}></ToggleSwitch>
        </span>
      </nav>
    )
}

export default NavBar