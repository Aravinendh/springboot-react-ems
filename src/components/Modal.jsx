import "bootstrap/dist/css/bootstrap.min.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} // 🔧 Darker backdrop
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div
          className="modal-content"
          style={{
            backgroundColor: "#1e1e1e", // 🔧 Dark modal background
            color: "#f1f1f1",            // 🔧 Light text
            border: "1px solid #333",   // 🔧 Subtle border
          }}
        >
          <div className="modal-header border-0"> {/* 🔧 Remove default border */}
            <button
              type="button"
              className="btn-close btn-close-white" // 🔧 White close button
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
