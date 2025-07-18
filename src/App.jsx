import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import GetEmployee from "./components/GetEmployee";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

function App() {
  const [modalType, setModalType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [roles, setRoles] = useState([]);

  // Sync roles when login state changes
  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");
    setRoles(storedRoles);
  }, [isLoggedIn]);

  // Modal toggles
  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");
  const closeModal = () => setModalType(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");
    setRoles(storedRoles);
    closeModal();
  };

  return (
    <div
      style={{
        backgroundColor: "#121212", // 🎨 Dark background for full page
        color: "#f1f1f1",            // 🎨 Light text
        minHeight: "100vh",
      }}
    >
      <Navbar
        onLoginClick={openLogin}
        isLoggedIn={isLoggedIn}
        roles={roles}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/get-employee" element={<GetEmployee />} />
        <Route path="/employee/:empId/add-task" element={<AddTask />} />
        <Route path="/employee/:empId/tasks" element={<TaskList />} />
      </Routes>

      {/* 🔐 Login Modal */}
      <Modal isOpen={modalType === "login"} onClose={closeModal}>
        <Login onLoginSuccess={handleLoginSuccess} />
        <p className="toggle-text text-center mt-3">
          No account?{" "}
          <span
            className="toggle-link text-info" // 🎨 Updated text color
            onClick={openRegister}
            style={{ cursor: "pointer" }}
          >
            Create one
          </span>
        </p>
      </Modal>

      {/* 🆕 Register Modal */}
      <Modal isOpen={modalType === "register"} onClose={closeModal}>
        <Register onOpenLogin={openLogin} />
        <p className="toggle-text text-center mt-3">
          Already have an account?{" "}
          <span
            className="toggle-link text-info" // 🎨 Updated text color
            onClick={openLogin}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </Modal>

      <Footer />
    </div>
  );
}

export default App;
