import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const { empId } = useParams();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `http://localhost:8080/task/id/${empId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task added successfully!");
      setTitle(""); // Clear the input
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      // 🔧 Dark background
      style={{
        background: "linear-gradient(90deg, #1f1f2f, #2d2d3a)",
        padding: "30px",
        color: "#f1f1f1", // 🔧 Light text
      }}
    >
      <h2 className="mb-4 text-warning">
        {/* 🔧 Yellow heading text for contrast */}
        ➕ Add Task for Employee ID: {empId}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Task Title:
          </label>
          <input
            // 🔧 Dark styled input
            style={{
              backgroundColor: "#2e2e3e",
              color: "#ffffff",
              border: "1px solid #555",
              padding: "15px",
            }}
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <button
          type="submit"
          // 🔧 Custom dark button
          className="btn fw-bold text-white"
          style={{
            background: "linear-gradient(90deg, #5a5af0, #7f5af0)",
            border: "none",
            padding: "10px 25px",
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
