import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MainNavigation = () => {
  const location = useLocation();
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [openMainMenu, setOpenMainMenu] = useState(false);

  return (
    <header className="nav-grid">
      <div className="main-menu">
        <div
          className="main-menu-btn"
          onClick={() => setOpenMainMenu(!openMainMenu)}
        >
          &nbsp;
        </div>
        <div className={`main-menu-grid ${openMainMenu ? "enabled" : ""}`}>
          <Link
            to="/"
            className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/programs"
            className={`nav-btn ${
              location.pathname === "/programs" ? "active" : ""
            }`}
          >
            Programs
          </Link>

          <Link
            to="/channels"
            className={`nav-btn ${
              location.pathname === "/channels" ? "active" : ""
            }`}
          >
            Channels
          </Link>
        </div>
      </div>
      <div className="account-menu">
        <div
          className="account-btn"
          onClick={() => setOpenAccountMenu(!openAccountMenu)}
        >
          &nbsp;
        </div>
        <div className={`account-grid ${openAccountMenu ? "enabled" : ""}`}>
          <Link
            to="/login"
            className={`nav-btn ${
              location.pathname === "/login" ? "active" : ""
            }`}
          >
            Log In
          </Link>

          <Link
            to="/registration"
            className={`nav-btn ${
              location.pathname === "/registration" ? "active" : ""
            }`}
          >
            Registration
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
