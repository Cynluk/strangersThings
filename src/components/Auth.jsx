import { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { registerUser, loginUser } from "../api/auth";
import useAuth from "../hooks/useAuth";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Auth({ setToken }) {
  const { method } = useParams();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Form
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          let result;
          if (method === "register") {
            result = await registerUser(username, password);
          } else {
            result = await loginUser(username, password);
          }
          if (result.success) {
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
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <Button variant="primary" type="submit">
          {method === "register" ? "Register" : "Login"}
        </Button>
      </Form>
    </div>
  );
}
