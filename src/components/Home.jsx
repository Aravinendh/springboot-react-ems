import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 text-white"
      style={{
        backgroundColor: "#121212", // 🔧 Changed to solid dark background
        flexDirection: "column",
      }}
    >
      <h1 className="display-4 mb-3 text-light"> {/* 🔧 Ensured light heading */}
        Employee Management System
      </h1>
      <p className="lead text-secondary"> {/* 🔧 Muted light gray for subtitle */}
        Welcome! Manage your employees efficiently.
      </p>
    </div>
  );
};

export default Home;
