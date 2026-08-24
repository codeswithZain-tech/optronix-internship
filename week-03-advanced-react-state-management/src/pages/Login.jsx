import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  function handleLogin() {
    login({ name: "Ali" });
    navigate(location.state?.from?.pathname || "/tasks");
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Login</h1>
      <button onClick={handleLogin} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Login
      </button>
    </div>
  );
}
