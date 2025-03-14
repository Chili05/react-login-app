import { useState } from "react";
import "../styles.css";
import loginImage from "../assets/img-login.png"; // Asegúrate de que la imagen esté en assets
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Librería react-icons para el icono de ojo

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validCredentials = {
    email: "javier@gmail.com",
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
      if (rememberMe) {
        localStorage.setItem("user", email);
      }
      onLogin(email);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="form-container">
        <h2>Bienvenido, afiliado! 👋</h2>
        <p>Por favor escribe tus credenciales para ingresar</p>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="juan@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Contraseña <a href="#">Olvidé mi contraseña</a></label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="remember-container">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>
          {error && <p className="error">{error}</p>}
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        <p className="contact-link">¿No estás afiliado aún? <a href="#">Contáctanos</a></p>
      </div>
    </div>
  );
};

export default Login;
