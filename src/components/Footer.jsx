import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer
      // 🔧 Changed to dark background and light text
      className="bg-dark text-center text-light py-3 shadow-sm mt-auto"
      // 🔧 Use full width and stick to bottom if needed
      style={{ position: "relative", bottom: "0", width: "100%" }}
    >
      <p className="mb-0">© 2025 Employee Management System</p>
    </footer>
  );
};

export default Footer;
