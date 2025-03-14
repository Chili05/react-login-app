import { useEffect, useState } from "react";
import "../styles.css";

const Welcome = ({ user, onLogout }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("☀️ Buenos días");
    } else if (hour < 18) {
      setGreeting("🌤️ Buenas tardes");
    } else {
      setGreeting("🌙 Buenas noches");
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
      localStorage.removeItem("user");
      onLogout();
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <h2 className="welcome-title">{greeting}, <span className="username">{user}</span>! 🎉</h2>
        <p className="welcome-text">Nos alegra verte de nuevo. ¡Disfruta tu día!</p>
        <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

export default Welcome;
