import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { registerUser, loginUser } from "../api/auth";
import useAuth from "../hooks/useAuth";

export default function Auth({ setToken }) {
  const { method } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]= useState("");
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          let result;
          if (method === "register") {
            result = await registerUser(username, password);
          } else {
            result = await loginUser(username, password);
          }
          if (result.success){
            const token = result.data.token;
          localStorage.setItem("token", token);
          setToken(token);
          setPassword("");
          setUsername("");
          navigate("/posts");
          } else {
            setError(result.error.message);
          }
          
        }}
      >
        {error && <h5>{error}</h5>}
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit">
          {method === "register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
}
