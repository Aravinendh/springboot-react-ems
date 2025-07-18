import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, roles, setIsLoggedIn, onLoginClick }) => {
  const isAdmin =
    roles.includes("ADMIN") || roles.includes("admin") || roles.includes("both"); // 🔧 fixed redundant condition

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add-employee");
  };

  const handleEmployeeClick = () => {
    navigate("/get-employee");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-4 py-3" // 🔧 changed to navbar-dark
      style={{ backgroundColor: "#212529" }} // 🔧 dark background
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-light"> {/* 🔧 text-light for dark bg */}
          EMS
        </Link>

        <div className="d-flex gap-2">
          {isAdmin && (
            <button
              className="btn fw-bold"
              type="button"
              onClick={handleAddClick}
              style={{ backgroundColor: "#ffc107", color: "#000" }} // 🔧 warning yellow, readable text
            >
              Add
            </button>
          )}

          <button
            className="btn fw-bold"
            type="button"
            onClick={handleEmployeeClick}
            style={{ backgroundColor: "#17a2b8", color: "#fff" }} // 🔧 info blue
          >
            Employees
          </button>

          {isLoggedIn ? (
            <button
              className="btn fw-bold"
              onClick={handleLogout}
              style={{ backgroundColor: "#dc3545", color: "#fff" }} // 🔧 red logout button
            >
              Logout
            </button>
          ) : (
            <button
              className="btn fw-bold"
              onClick={onLoginClick}
              style={{ backgroundColor: "#17a2b8", color: "#fff" }} // 🔧 login button
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
