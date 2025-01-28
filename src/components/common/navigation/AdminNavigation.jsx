import { Link, useLocation } from "react-router-dom";

const AdminNavigation = () => {
  const location = useLocation();

  return (
    <header className="side-nav-grid">
      <Link
        to="/admin"
        className={`side-nav-btn ${
          location.pathname === "/admin" ? "active" : ""
        }`}
      >
        Dashboard
      </Link>

      <Link
        to="/admin/programs"
        className={`side-nav-btn ${
          location.pathname === "/admin/programs" ? "active" : ""
        }`}
      >
        Programs
      </Link>

      <Link
        to="/admin/account"
        className={`side-nav-btn align-bottom ${
          location.pathname === "/admin/account" ? "active" : ""
        }`}
      >
        Accountt
      </Link>
    </header>
  );
};

export default AdminNavigation;
