import { useState, useEffect } from "react";
import { login } from "../api/auth";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const {setToken}=useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          console.log({ username, password });
          const result = await login(username, password);
          setToken(result.data.token);
          console.log(result);
        }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
