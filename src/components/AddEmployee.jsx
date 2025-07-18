import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
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
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/employee", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Employee Added Successfully!");
      navigate("/get-employee");
    } catch (error) {
      console.error("Error Adding Employee", error);
      alert("Error while adding employee");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      // 🔧 Dark background gradient
      style={{ background: "linear-gradient(90deg, #1e1e2f, #2c2c3d)" }}
    >
      {/* 🔧 Dark card background with white text */}
      <div className="p-4 rounded shadow" style={{ width: "400px", backgroundColor: "#2e2e3e", color: "#f1f1f1" }}>
        <h2 className="text-center text-warning mb-4">Add Employee</h2> {/* 🔧 Changed heading color to warning (yellow) */}
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            className="form-control mb-3 bg-dark text-white border-secondary" // 🔧 Dark input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            className="form-control mb-3 bg-dark text-white border-secondary"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>User Name</label>
          <input
            className="form-control mb-3 bg-dark text-white border-secondary"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            className="form-control mb-3 bg-dark text-white border-secondary"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Roles</label>
          <div className="form-check mb-2">
            <input
              className="form-check-input bg-dark border-secondary" // optional dark styling
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
              className="form-check-input bg-dark border-secondary"
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

          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            // 🔧 Darker gradient button
            style={{ background: "linear-gradient(90deg, #5a5af0, #7f5af0)" }}
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
