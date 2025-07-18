import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onLoginSuccess = () => {} }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { userName, password },
        { headers: {} }
      );

      const { token, userName: name, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("roles", JSON.stringify(roles));

      alert("Login Successful");

      onLoginSuccess();
      navigate("/");
    } catch (e) {
      console.log("Login Error", e);
      alert("Invalid Credentials");
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#121212", // 🔧 Changed to dark background
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          width: "350px",
          backgroundColor: "#1e1e1e", // 🔧 Dark card background
          color: "#f1f1f1", // 🔧 Light text
        }}
      >
        <h2 className="text-center text-info mb-4"> {/* 🔧 Changed text color */}
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label text-light"> {/* 🔧 */}
              User Name
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              className="form-control"
              style={{ backgroundColor: "#2a2a2a", color: "#fff" }} // 🔧 Input dark
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-light"> {/* 🔧 */}
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              style={{ backgroundColor: "#2a2a2a", color: "#fff" }} // 🔧 Input dark
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{
              background: "linear-gradient(90deg, #3b82f6, #9333ea)", // 🔧 Darker gradient
              border: "none",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
