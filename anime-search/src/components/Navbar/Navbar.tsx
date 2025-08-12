import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/favorites" className="navbar-link">
            Favorites
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/recommended" className="navbar-link">
            Recommended
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
