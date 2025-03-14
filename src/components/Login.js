import { useState } from "react";
import "../styles.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validCredentials = {
    email: "admin@example.com",
    password: "123456",
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("Correo inválido");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (email !== validCredentials.email || password !== validCredentials.password) {
      setError("Credenciales incorrectas");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("user", email);
      onLogin(email);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="login-card">
        <span role="img" aria-label="login" className="login-icon">🔑</span>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? <span className="spinner"></span> : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
