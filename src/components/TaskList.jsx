import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const { empId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userName");
        setUserName(user);

        const response = await axios.get(
          `http://localhost:8080/task/id/${empId}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks for the employee.");
      }
    };

    fetchTasks();
  }, [empId]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:8080/task/status",
        {
          taskId: taskId,
          status: newStatus,
          username: userName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskId === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("Error updating task status.");
    }
  };

  const statusOptions = ["Yet to Start", "In Progress", "Completed"];

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        backgroundColor: "#121212", // 🔧 dark background
        color: "#ffffff",           // 🔧 light text
        padding: "30px",
      }}
    >
      <h2 className="mb-4 text-info">📋 Tasks for Employee ID: {empId}</h2> {/* 🔧 updated text color */}

      {tasks.length === 0 ? (
        <p className="text-muted">No tasks assigned yet.</p>
      ) : (
        <ul
          className="list-group w-75"
          style={{
            backgroundColor: "#1e1e1e", // 🔧 dark list container
            borderRadius: "10px",
            padding: "20px",
            border: "1px solid #333"
          }}
        >
          {tasks.map((task, index) => (
            <li
              key={task.taskId || index}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                backgroundColor: "#2a2a2a", // 🔧 dark list item
                color: "#fff",
                border: "1px solid #444",
                padding: "20px",
                marginBottom: "10px",
                borderRadius: "8px"
              }}
            >
              <span style={{ fontWeight: "bold" }}>{task.title}</span>

              {task.assignedEmployee.userName === userName ? (
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task.taskId, e.target.value)
                  }
                  className="form-select w-25"
                  style={{
                    backgroundColor: "#333",    // 🔧 dark dropdown
                    color: "#fff",
                    border: "1px solid #666"
                  }}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              ) : (
                <span
                  className="badge"
                  style={{
                    background: "#4e54c8", // 🔧 accent badge
                    padding: "10px",
                    color: "#fff",
                    borderRadius: "5px",
                  }}
                >
                  {task.status}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
