import { NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="nav">
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/habits">Habits</NavLink></li>
        <li><NavLink to="/reminders">Reminders</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
