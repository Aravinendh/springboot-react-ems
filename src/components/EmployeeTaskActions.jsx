import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTaskActions = ({ selectedEmployee, onClose }) => {
  const navigate = useNavigate();

  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const isAdmin = roles.includes("admin") || roles.includes("ADMIN");

  const handleAddTask = () => {
    navigate(`/employee/${selectedEmployee.empId}/add-task`);
  };

  const handleListTasks = () => {
    navigate(`/employee/${selectedEmployee.empId}/tasks`);
  };

  return (
    <div
      className="modal-backdrop d-flex align-items-center justify-content-center"
      // 🔧 Changed background to dark gradient
      style={{
        background: "linear-gradient(90deg, #1f1f2f, #2d2d3a)",
      }}
    >
      <div
        // 🔧 Dark modal card
        className="border rounded p-4 shadow"
        style={{
          minWidth: "300px",
          backgroundColor: "#2e2e3e",
          color: "#ffffff",
        }}
      >
        <h5 className="mb-3 text-info">
          {/* 🔧 Highlight title in info color */}
          For {selectedEmployee.name}
        </h5>

        {isAdmin && (
          <button
            // 🔧 Primary dark button
            className="btn w-100 mb-2 text-white fw-bold"
            style={{
              background: "linear-gradient(90deg, #5a5af0, #7f5af0)",
              border: "none",
            }}
            onClick={handleAddTask}
          >
            ➕ Add Task
          </button>
        )}

        <button
          // 🔧 Secondary dark button
          className="btn w-100 fw-bold"
          style={{
            backgroundColor: "#444",
            color: "#fff",
            border: "1px solid #666",
          }}
          onClick={handleListTasks}
        >
          📋 List Tasks
        </button>

        <button
          // 🔧 Dark red close button
          className="btn w-100 mt-3 fw-bold"
          style={{
            backgroundColor: "#a83232",
            color: "#fff",
            border: "none",
          }}
          onClick={onClose}
        >
          ❌ Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeTaskActions;
