import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "utils/context";
import { useHttpService } from "utils/HttpService";

const MainNavigation = ({ isClient = false }) => {
  const location = useLocation();
  const { userToken, clientToken, setClientToken } = useContext(AuthContext);
  const [openAccountMenu, setOpenAccountMenu] = useState(false);
  const [openMainMenu, setOpenMainMenu] = useState(false);
  const { createRecord } = useHttpService("/logout");
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      if (openAccountMenu) {
        setOpenAccountMenu(false);
      }
      if (openMainMenu) {
        setOpenMainMenu(false);
      }
    }
  };
  const handleLogout = () => {
    const clearSession = (data) => {
      setClientToken();
    };

    setOpenAccountMenu(false);
    createRecord([], clearSession);
  };

  return (
    <header className="nav-grid">
      <div className="main-menu" tabIndex={0} onBlur={handleBlur}>
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
      <div className="account-menu" tabIndex={0} onBlur={handleBlur}>
        <div
          className={`account-btn ${isClient && clientToken ? "enabled" : ""}`}
          onClick={() => setOpenAccountMenu(!openAccountMenu)}
        >
          &nbsp;
        </div>
        {isClient && !clientToken && (
          <div className={`account-grid ${openAccountMenu ? "enabled" : ""}`}>
            <Link
              to="/login"
              className={`nav-btn ${
                location.pathname === "/login" ? "active" : ""
              }`}
              onClick={() => setOpenAccountMenu(false)}
            >
              Log In
            </Link>

            <Link
              to="/registration"
              className={`nav-btn ${
                location.pathname === "/registration" ? "active" : ""
              }`}
              onClick={() => setOpenAccountMenu(false)}
            >
              Registration
            </Link>
          </div>
        )}
        {isClient && clientToken && (
          <div className={`account-grid ${openAccountMenu ? "enabled" : ""}`}>
            <Link
              to="/account"
              className={`nav-btn ${
                location.pathname === "/account" ? "active" : ""
              }`}
              onClick={() => setOpenAccountMenu(false)}
            >
              Account
            </Link>

            <Link
              to="/favorites"
              className={`nav-btn ${
                location.pathname === "/favorites" ? "active" : ""
              }`}
              onClick={() => setOpenAccountMenu(false)}
            >
              Favorites
            </Link>
            <Link
              to="/"
              className={`nav-btn warning`}
              onClick={() => handleLogout()}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;
