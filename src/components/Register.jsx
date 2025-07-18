import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Register = ({ onOpenLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    roleNames: [],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "roleNames") {
      if (value === "Both") {
        setForm({ ...form, [name]: ["USER", "ADMIN"] });
      } else {
        setForm({ ...form, [name]: [value.toUpperCase()] });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", form, {
        headers: {}
      });
      alert("Registered Successfully!");
      onOpenLogin();
    } catch (error) {
      console.error("Registration Error", error);
      alert("Error while registering");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#121212", // 🔧 dark background
        color: "#fff"               // 🔧 light text
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          width: "400px",
          backgroundColor: "#1e1e1e", // 🔧 dark card
          color: "#fff",              // 🔧 card text color
          border: "1px solid #333"
        }}
      >
        <h2 className="text-center text-info mb-4">Register</h2> {/* 🔧 Changed text color */}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary" // 🔧 dark input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-white border-secondary" // 🔧
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">User Name</label>
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary" // 🔧
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white border-secondary" // 🔧
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label>Roles</label>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="userRole"
                name="roleNames"
                value="USER"
                checked={form.roleNames.includes("USER")}
                onChange={(e) => {
                  const role = e.target.value;
                  const updatedRoles = e.target.checked
                    ? [...form.roleNames, role]
                    : form.roleNames.filter((r) => r !== role);
                  setForm({ ...form, roleNames: updatedRoles });
                }}
              />
              <label className="form-check-label" htmlFor="userRole">
                User
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="adminRole"
                name="roleNames"
                value="ADMIN"
                checked={form.roleNames.includes("ADMIN")}
                onChange={(e) => {
                  const role = e.target.value;
                  const updatedRoles = e.target.checked
                    ? [...form.roleNames, role]
                    : form.roleNames.filter((r) => r !== role);
                  setForm({ ...form, roleNames: updatedRoles });
                }}
              />
              <label className="form-check-label" htmlFor="adminRole">
                Admin
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{
              background: "linear-gradient(90deg, #4e54c8, #8f94fb)", // 🔧 gradient for contrast
              color: "#fff"
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
